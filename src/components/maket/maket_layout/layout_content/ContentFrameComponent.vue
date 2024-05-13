<script>
import {goodsLayout} from "@/components/maket/maket_layout/layout_content/goodsLayouts.js";

export default {
  name: "ContentFrameComponent",
  emits: ['position-selected'],
  props: {
    groupData: Array,
    groupImages: Array,
    groupName: String,
    groupPatternName: String,
  },
  data(){
    return{
      selectedComponent: goodsLayout[this.groupPatternName] ? goodsLayout[this.groupPatternName] : null,
      currentGroupData: this.groupData,
    }
  },
  methods:{
    positionSelected(groupData){
      this.currentGroupData = groupData;
      this.$emit("position-selected", [this.groupName, this.currentGroupData]);
    }
  },
}
</script>

<template>
  <div class="content-frame"
       v-if="selectedComponent"
  >
    <div class="content-frame__header">{{ groupName.replace('()', ' ') }}</div>
    <component
        v-if="selectedComponent"
        :is="selectedComponent"
        :group-data="currentGroupData"
        :group-images="groupImages"
        @position-selected="positionSelected"    />
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";

.content-frame {
  border-top: 1px solid $colorPrimary200;
  width: 200mm;
  margin: 5mm 5mm 6px 5mm;
  position: relative;
  &__header{
    font-size: 12px;
    position: absolute;
    background-color: #fff;
    left: 32px;
    top: -9px;
    padding: 0 12px;
  }
}
</style>
