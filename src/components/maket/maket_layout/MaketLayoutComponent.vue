<template>
  <div class="maket-layout">
    <TechDataComponent
        :maket-id="maketId"
        @show-pictures="this.showPictures=!this.showPictures"
        @show-frame='frameShow'
        @show-sort="showSort=!showSort"
    />
  </div>
  <ItemGroupingComponent
      v-if="maketData"
      :item-group="maketData['itemGroups']"
      :show-sort="showSort"
      @item-drag="handleItemDrag"
      @item-drop="handleItemDrop"
  />
  <div class="maket-layout__print">
    <A4MarkingComponent v-if="showFrame"/>
    <MaketHeaderComponent
        v-if="maketData"
        :header-info="maketData['headerInfo']"

    />
    <MaketContentTableComponent
        v-if="maketData"
        :table-content="maketData['tableContent']"
    />
    <MaketFooterComponent
        v-if="maketData"
        :footer-info="maketData['footerInfo']"/>
  </div>
</template>

<script>
import {fetchData} from "@/components/services/fetchData.js";
import TechDataComponent from "@/components/maket/maket_layout/TechDataComponent.vue";
import MaketHeaderComponent from "@/components/maket/maket_layout/MaketHeaderComponent.vue";
import A4MarkingComponent from "@/components/maket/maket_layout/A4MarkingComponent.vue";
import MaketFooterComponent from "@/components/maket/maket_layout/MaketFooterComponent.vue";
import MaketContentTableComponent from "@/components/maket/maket_layout/MaketContentTableComponent.vue";
import ItemGroupingComponent from "@/components/maket/maket_layout/ItemGroupingComponent.vue";

export default {
  name: "MaketLayoutComponent",
  components: {
    ItemGroupingComponent,
    MaketContentTableComponent,
    MaketFooterComponent, A4MarkingComponent, MaketHeaderComponent, TechDataComponent},
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
      sourceGroupName: null
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
    handleItemDrag(element){
      this.sourceGroupName = element.groupKey;

    },
    handleItemDrop(element){
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
    }
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

<style scoped lang="scss">

.maket-layout {
  width: calc(100vw - 19px);
  &__print{
    height: 100vh;
    position: relative;
  }
}

</style>
