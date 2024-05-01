<template>
  <div class="maket-layout">
    <TechDataComponent
        :maket-id="maketId"
        @show-pictures="this.showPictures=!this.showPictures"
        @show-frame='frameShow'
    />
  </div>
  <div class="maket-layout__print">
    <A4MarkingComponent v-if="showFrame"/>
    <MaketHeaderComponent
        v-if="maketData"
        :header-info="maketData['headerInfo']"

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

export default {
  name: "MaketLayoutComponent",
  components: {MaketFooterComponent, A4MarkingComponent, MaketHeaderComponent, TechDataComponent},
  inject: ["appUrl", "tokenName"],
  data() {
    return {
      orderId: null,
      maketId: null,
      maketData: null,
      showPictures: false,
      showFrame: true
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

<style lang="scss">

.header, .full-content {
  display: none;
}

</style>
