<script>
import {fetchData} from "@/components/services/fetchData.js";
import SingleNoteSmallComponent
  from "@/components/maket/maket_layout/layout_content/note_component/SingleNoteSmallComponent.vue";

export default {
  name: "NoteFrameComponent",
  components: {SingleNoteSmallComponent},
  inject: ['tokenName', 'appUrl'],
  data() {
    return {
      currentGroupData: this.groupData,
      bigImages: {},
      orientationResult: null,
    }
  },
  props: {
    groupData: Array,
    groupImages: Array,
    showMiniature: Boolean,
    selectAll: Boolean,
    totalOrientation: Boolean,
  },
  methods: {
    printItemChecked(itemData) {
      this.bigImages[itemData[0]] = itemData[1]
    },
    async changeColor(event, place, index) {
      const pantone = event.target.value;
      const square = event.target.closest('.note-frame__big_footer').querySelector('.note-frame__big_square');
      const hexUrl = `${this.appUrl}hex_from_pantone/${pantone}`;
      const data = await fetchData(hexUrl, this.tokenName)
      const hexColor = data.hex;
      if (hexColor) {
        square.style.backgroundColor = hexColor;
      }
      for (let itemIndex in this.currentGroupData) {
        let item = this.currentGroupData[itemIndex];
        for (let printItemIndex in item.print_item) {
          let printItem = item.print_item[printItemIndex];
          if (printItem.place === place) {
            printItem.color[index]['pantone'] = pantone;
          }
        }
      }
    },
    handleTotalOrientation() {
      const firstItem = this.currentGroupData[0].print_item;
      const orientationList = []
      for (let index in firstItem) {
        orientationList[index] = {
          'position': firstItem[index]['position'],
          'position_id': firstItem[index]['position_id'],
          'image_id': firstItem[index]['image_id']
        }
      }
      for (let i = 1; i < this.currentGroupData.length; i++) {
        for (let j = 0; j < orientationList.length; j++) {
          this.currentGroupData[i].print_item[j]['position_id'] = orientationList[j]['position_id'];
          this.currentGroupData[i].print_item[j]['position'] = orientationList[j]['position'];
          this.currentGroupData[i].print_item[j]['image_id'] = orientationList[j]['image_id'];
        }
      }
      this.orientationResult = orientationList;
    },
  },
  watch: {
    totalOrientation: {
      handler: 'handleTotalOrientation',
    }
  }
}
</script>

<template>
  <div class="note-frame">
    <div class="note-frame__small"
         :class="!showMiniature ? 'hidden-block' : ''"
    >
      <SingleNoteSmallComponent
          v-for="(note, index) in currentGroupData"
          :key="index"
          :note-data="note"
          :note-images="groupImages"
          @print-item-checked="printItemChecked"
          :select-all="selectAll"
          :total-orientation="orientationResult"
      />
    </div>
    <div class="note-frame__big">
      <div v-for="item in Object.keys(bigImages)"
           :key="item.id"
      >
        <div v-if="bigImages[item]" class="note-frame__big_center">
          <div
              v-html="bigImages[item][0].replace('itemWidth', bigImages[item][3])"
          ></div>
          <div>расположение:&nbsp;{{ bigImages[item][2] }}</div>
        </div>
      </div>
    </div>
    <div class="note-frame__big_footer">
      <div class="note-frame__big_footer"
           v-for="(printItem, index) in currentGroupData[0].print_item"
           :key="index">
        <div><b>{{ printItem.position }}</b>&nbsp;<small>({{ printItem.place }})</small></div>
        <div class="note-frame__big_footer"
             v-for="(color, index) in printItem.color"
             :key="index"
        >
          <div>цвет</div>
          <div>{{ index + 1 }}</div>
          <input
              type="text"
              class="note-frame__big_input"
              @keydown="changeColor($event, printItem.place, index)"
              :value="color.pantone"
          >
          <div class="note-frame__big_square"></div>
        </div>
      </div>
    </div>

  </div>

</template>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.note-frame {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;

  &__big {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    padding: 12px 0;
    width: 100%;

    &_center {
      text-align: center;
    }

    &_footer {
      @include d-flex-center(center);
      font-size: 14px;
      padding: 8px 0;
      gap: 8px;
    }

    &_input {
      @include brd-standard;
      padding: 6px;
      max-width: 60px;
    }

    &_square {
      @include brd-standard;
      height: 30px;
      width: 30px;
    }
  }

  &__small {
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px
  }
}

.hidden-block{
  display: none;
}
</style>
