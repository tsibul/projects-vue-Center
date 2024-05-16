<script>
import {goodsLayout} from "@/components/maket/maket_layout/layout_content/goodsLayouts.js";

export default {
  name: "ContentFrameComponent",
  // emits: ['position-selected'],
  props: {
    groupData: Array,
    groupImages: Array,
    groupName: String,
    groupPatternName: String,
  },
  data() {
    return {
      selectedComponent: goodsLayout[this.groupPatternName] ? goodsLayout[this.groupPatternName] : null,
      currentGroupData: this.groupData,
      showMiniature: true,
      selectAllCheck: false,
      totalOrientation: false,
    }
  },
  methods: {
    // positionSelected(groupData) {
    //   this.currentGroupData = groupData;
    //   this.$emit("position-selected", [this.groupName, this.currentGroupData]);
    // },
    toggleMiniature() {
      this.showMiniature = !this.showMiniature;
    },
    selectAll() {
      this.selectAllCheck = !this.selectAllCheck;
    },
    totalChangeOrientation(){
      this.totalOrientation = !this.totalOrientation;
    }
  },
}
</script>

<template>
  <div class="content-frame"
       v-if="selectedComponent"
  >
    <div class="content-frame__frame">
      <div class="content-frame__header">{{ groupName.replace('()', ' ') }}</div>
      <div class="content-frame__header_end no-print">
        <button
            v-if="currentGroupData.length > 1"
            type="button"
            class="btn-sm"
            @click="totalChangeOrientation"
        >
          установить позицию по первой</button>
        &emsp;&emsp;
        <input type="checkbox"
               class="check"
               checked
               :id="groupName"
               @change="toggleMiniature"
        >
        &nbsp;
        <label :for="groupName">показывать миниатюры</label>
        &emsp;&emsp;
        <input type="checkbox"
               class="check"
               :id="groupName"
               @change="selectAll"
        >
        &nbsp;
        <label :for="groupName">выбрать все</label>
      </div>
    </div>
    <component
        v-if="selectedComponent"
        :is="selectedComponent"
        :group-data="currentGroupData"
        :group-images="groupImages"
        :show-miniature="showMiniature"
        :select-all="selectAllCheck"
        :total-orientation="totalOrientation"
    />
    <!--        @position-selected="positionSelected"-->
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.content-frame {
  border-top: 1px solid $colorPrimary200;
  width: 200mm;
  margin: 5mm 5mm 6px 5mm;
  position: relative;

  &__frame {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    position: absolute;
    //left: 20mm;
    top: -9px;
    width: 100%;
    padding-left: 12px;
  }

  &__header {
    background-color: #fff;
    padding: 0 12px;
  }

  &__header_end {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 0 12px;
  }
}

.btn-sm {
  color: white;
  padding: 1px 8px;
  @include brd-standard;
  background-color: $colorPrimary500;
  transition: background-color 0.3s ease-out;
  cursor: pointer;
  z-index: 5;

  &:hover{
    color: $colorPrimary500;
    background-color: white;
  }
}
</style>
