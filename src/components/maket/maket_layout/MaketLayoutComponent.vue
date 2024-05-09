<template>
  <TechDataComponent
      :maket-id="maketId"
      @show-pictures="this.showPictures=!this.showPictures"
      @show-table="tableShow"
      @show-frame='frameShow'
      @show-sort="sortShow"
      @window-print="windowPrint"
      @window-close="windowClose"
      @show-content="contentShow"
  />
  <ItemGroupingComponent
      v-if="showSort"
      :item-group="maketData['itemGroups']"
      @item-drag="handleItemDrag"
      @item-drop="handleItemDrop"
      @close-sort="showSort=false"
  />
  <ShowGroupComponent
      v-if="showContent"
      :show-group="maketData['showGroups']"
      :item-group="maketData['itemGroups']"
      @close-content="showContent=false"
      @toggle-check="toggleCheckGroup"
  />
  <A4MarkingComponent v-if="showFrame"/>
  <div class="maket-layout__print"
  >
    <div class="maket-layout__top">
      <MaketHeaderComponent
          v-if="maketData"
          :header-info="maketData['headerInfo']"

      />
      <MaketContentTableComponent
          v-if="maketData && showTable"
          :table-content="maketData['tableContent']"
          :show-group="maketData['showGroups']"
      />
    </div>
    <div
        class=""
        v-if="maketData && showPictures"
    >
      <ContentFrameComponent
          v-for="group in Object.keys(maketData['itemGroups'])"
          v-show="maketData['showGroups'][group]"
          :key="group.id"
          :ref="'group_' + group"
          class="maket-layout__content"
          :group-data="maketData['itemGroups'][group]"
          :group-name="group"
          :group-pattern-name="maketData['groupPatterns'][group]"
          :group-images="maketData['groupImages'][group]"
      />
    </div>
    <MaketFooterComponent
        v-if="maketData"
        :footer-info="maketData['footerInfo']"/>
  </div>
</template>

<script>
import {fetchData} from "@/components/services/fetchData.js";
import TechDataComponent from "@/components/maket/maket_layout/layout_settings/TechDataComponent.vue";
import MaketHeaderComponent from "@/components/maket/maket_layout/layout_header_footer/MaketHeaderComponent.vue";
import A4MarkingComponent from "@/components/maket/maket_layout/layout_settings/A4MarkingComponent.vue";
import MaketFooterComponent from "@/components/maket/maket_layout/layout_header_footer/MaketFooterComponent.vue";
import MaketContentTableComponent
  from "@/components/maket/maket_layout/layout_header_footer/MaketContentTableComponent.vue";
import ItemGroupingComponent from "@/components/maket/maket_layout/layout_settings/ItemGroupingComponent.vue";
import ShowGroupComponent from "@/components/maket/maket_layout/layout_settings/ShowGroupComponent.vue";
import ContentFrameComponent from "@/components/maket/maket_layout/layout_content/ContentFrameComponent.vue";

export default {
  name: "MaketLayoutComponent",
  components: {
    ContentFrameComponent,
    ShowGroupComponent,
    ItemGroupingComponent,
    MaketContentTableComponent,
    MaketFooterComponent, A4MarkingComponent, MaketHeaderComponent, TechDataComponent
  },
  inject: ["appUrl", "tokenName"],
  data() {
    return {
      orderId: null,
      maketId: null,
      maketData: null,
      showPictures: false,
      showFrame: true,
      showSort: false,
      draggingItem: null,
      sourceGroupName: null,
      showContent: false,
      showTable: true
    }
  },
  methods: {
    async getMaketData() {
      const maketUrl = `${this.appUrl}maket_info/${this.maketId}/${this.orderId}`;
      this.maketData = await fetchData(maketUrl, this.tokenName);
    },
    frameShow(data) {
      this.showFrame = data;
    },
    tableShow() {
      this.showTable = !this.showTable;
    },
    contentShow() {
      this.showContent = !this.showContent;
    },
    sortShow() {
      this.showSort = !this.showSort;
    },
    handleItemDrag(element) {
      this.sourceGroupName = element.groupKey;

    },
    handleItemDrop(element) {
      this.draggingItem = element.item;
      const targetGroupName = element.groupKey;
      const targetGroup = this.maketData['itemGroups'][targetGroupName];
      targetGroup.unshift(this.draggingItem.item);
      targetGroup.sort((a, b) => a.article.localeCompare(b.article))
      const sourceGroup = this.maketData['itemGroups'][this.sourceGroupName];
      const itemIndex = sourceGroup.findIndex(el => el.id === element.item.item.id)
      sourceGroup.splice(itemIndex, 1);
      sourceGroup.sort((a, b) => a.article.localeCompare(b.article))
      this.sourceGroupName = null;
      this.draggingItem = null;
    },
    toggleCheckGroup(group) {
      this.maketData['showGroups'][group] = !this.maketData['showGroups'][group];
    },
    windowClose() {
      window.close()
    },
    windowPrint() {
      window.print()
    },
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    this.maketId = urlParams.get('maketId');
    this.orderId = urlParams.get('orderId');
    (async () => {
      await this.getMaketData();
    })();
  },
}
</script>

<style lang="scss">
* {
  font-family: 'Arial', sans-serif;
}

</style>

<style scoped lang="scss">

.maket-layout {

  &__top {
    margin: 5mm 0 2px 5mm;
    width: 205mm;
  }

  &__print {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: 297mm;
    max-width: fit-content;
  }
}

</style>
