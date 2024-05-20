<script>
import {goodsLayout} from "@/components/maket/maket_layout/layout_content/goodsLayouts.js";
import BlankRowComponent from "@/components/maket/maket_layout/layout_header_footer/BlankRowComponent.vue";

export default {
  name: "ContentFrameComponent",
  components: {BlankRowComponent},
  // emits: ['position-selected'],
  props: {
    groupData: Array,
    groupImages: Array,
    groupName: String,
    groupPatternName: String,
    groupLayoutData: Object,
  },
  data() {
    return {
      selectedComponent: goodsLayout[this.groupPatternName] ? goodsLayout[this.groupPatternName] : null,
      currentGroupData: this.groupData,
      totalOrientation: false,
      currentGroupLayoutData: this.groupLayoutData,
    }
  },
  methods: {
    toggleMiniature() {
      this.currentGroupLayoutData['showMiniature'] = !this.currentGroupLayoutData['showMiniature'];
    },
    selectAll() {
      this.currentGroupLayoutData['selectAll'] = !this.currentGroupLayoutData['selectAll']
    },
    totalChangeOrientation() {
      this.totalOrientation = !this.totalOrientation;
    },
    blankRowPressed(number){
      this.currentGroupLayoutData['spacesBefore'] = this.currentGroupLayoutData['spacesBefore'] + Number(number);
    },
  },
}
</script>

<template>
  <div class="content-frame"
       v-if="selectedComponent"
  >
    <BlankRowComponent
        @pressed="blankRowPressed"
    />
    <div class="empty-row"
         v-for="(n, index) in currentGroupLayoutData['spacesBefore']"
         :key="index"
    >
    </div>
    <div class="content-frame__frame">
      <div class="content-frame__header active">{{ groupName.replace('()', ' ') }}</div>
      <div class="content-frame__header_end no-print">
        <button
            v-if="currentGroupData.length > 1"
            type="button"
            class="btn-sm"
            @click="totalChangeOrientation"
        >
          установить позицию по первой
          <span class="tooltip-text">повернуть все детали в соответствии с ориентацией первой детали</span>
        </button>
        &emsp;&emsp;
        <input type="checkbox"
               class="check"
               :checked="currentGroupLayoutData['showMiniature']"
               :id="groupName +'Miniature'"
               @change="toggleMiniature"
        >
        &nbsp;
        <label :for="groupName +'Miniature'">показывать миниатюры</label>
        &emsp;&emsp;
        <input type="checkbox"
               class="check"
               :id="groupName +'selectAll'"
               :checked="currentGroupLayoutData['selectAll']"
               @change="selectAll"
        >
        &nbsp;
        <label :for="groupName +'selectAll'">выбрать все</label>
      </div>
    </div>
    <component
        v-if="selectedComponent"
        :is="selectedComponent"
        :group-data="currentGroupData"
        :group-images="groupImages"
        :show-miniature="currentGroupLayoutData['showMiniature']"
        :select-all="currentGroupLayoutData['selectAll']"
        :total-orientation="totalOrientation"
    />
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.content-frame {
  border-top: 1px solid $colorPrimary200;
  position: relative;
  padding-top: 8px;

  &__frame {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    position: absolute;
    top: -9px;
    width: 97%;
    padding-left: 80px;
    max-width: 297mm;
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
</style>
