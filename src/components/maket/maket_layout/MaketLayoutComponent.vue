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
import {formatList} from "@/components/maket/maket_layout/layout_content/formatListData.js";

export default {
  name: "MaketLayoutComponent",
  computed: {
    formatList() {
      return formatList
    }
  },
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
      showTable: true,
      itemGroupsKeys: null,
      formatSelected: 1,
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
    // positionSelected(groupData){
    //   this.maketData['itemGroups'][groupData[0]]= groupData[1];
    // },
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
    chooseFormat(item) {
      this.formatSelected = item;
      // const layoutPrint = document.querySelector('.maket-layout__print');
      // layoutPrint.removeAttribute('class');
      // layoutPrint.classList.add(formatList[item][2], 'maket-layout__print');
      // const layoutTop = document.querySelector('.maket-layout__top');
      // layoutTop.removeAttribute('class');
      // layoutTop.classList.add(formatList[item][2], 'maket-layout__top');
    }
  },
  created() {
    (async () => {
      const urlParams = new URLSearchParams(window.location.search);
      this.maketId = urlParams.get('maketId');
      this.orderId = urlParams.get('orderId');
      await this.getMaketData();
      this.itemGroupsKeys = Object.keys(this.maketData['itemGroups']);
    })();
  },
}
</script>

<template>
  <TechDataComponent
      :maket-id="maketId"
      :format-list="formatList"
      :format-selected="Number(formatSelected)"
      @show-pictures="this.showPictures=!this.showPictures"
      @show-table="tableShow"
      @show-frame='frameShow'
      @show-sort="sortShow"
      @window-print="windowPrint"
      @window-close="windowClose"
      @show-content="contentShow"
      @chosen-format="chooseFormat"
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
  <component
      :is="formatList[formatSelected][1]"
      v-if="showFrame"/>
  <div class="maket-layout__print"
       :class="formatList[formatSelected][3] + ' ' + formatList[formatSelected][2]"
  >
    <div class="maket-layout__top"
    >
      <MaketHeaderComponent
          v-if="maketData"
          :header-info="maketData['headerInfo']"
          class="maket-layout__content"
      />
      <MaketContentTableComponent
          v-if="maketData && showTable"
          :table-content="maketData['itemGroups']"
          :show-group="maketData['showGroups']"
          class="maket-layout__content"
      />
    </div>
    <ContentFrameComponent
        v-for="group in itemGroupsKeys"
        v-show="maketData['showGroups'][group] && showPictures"
        :key="group.id"
        :ref="'group_' + group"
        class="maket-layout__content"
        :group-data="maketData['itemGroups'][group]"
        :group-name="group"
        :group-pattern-name="maketData['groupPatterns'][group]"
        :group-images="maketData['groupImages'][group]"
    />
    <!--        @position-selected="positionSelected"-->
    <MaketFooterComponent
        v-if="maketData"
        :footer-info="maketData['footerInfo']"
        class="maket-layout__content"
    />
  </div>
</template>

<style lang="scss">
* {
  font-family: 'Arial', sans-serif;
}

</style>

<style scoped lang="scss">

.maket-layout {

  &__top {
    //width: 100%;
  }

  &__print {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    //max-height: 297mm;
    //max-width: fit-content;
    //gap: 16px;
  }

  &__content {
    margin: 16px 16px 8px 16px;
  }
}

.width {
  &__a4 {
    width: 210mm;
  }

  &__a3-v {
    width: 297mm;
  }

  &__a3-h {
    width: 210mm;
  }
}

.height {
  &__a4 {
    max-height: 594mm;
  }

  &__a3-v {
    max-height: 420mm;
  }

  &__a3-h {
    max-height: 594mm;
  }
}


</style>
