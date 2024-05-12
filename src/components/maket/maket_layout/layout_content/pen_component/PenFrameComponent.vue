<script>
import SinglePenSmallSingleComponent
  from "@/components/maket/maket_layout/layout_content/pen_component/SinglePenSmallComponent.vue";
import {fetchData} from "@/components/services/fetchData.js";

export default {
  name: "PenFrameComponent",
  components: {SinglePenSmallSingleComponent},
  inject: ['tokenName', 'appUrl'],
  emits: ['position-selected'],
  data() {
    return {
      currentGroupData: this.groupData,
      bigImages: {},
      colorQuantity: [...Array(this.groupData[0].print_item[0].color_quantity).keys()]
    }
  },
  props: {
    groupData: Array,
    groupImages: Array
  },
  methods: {
    positionSelected(penData) {
      this.currentGroupData[penData[0]] = penData[1];
      this.$emit('position-selected', this.currentGroupData);
    },
    printItemChecked(itemData) {
      this.bigImages[itemData[0]] = itemData[1]
    },
    async changeColor(event){
      const pantone = event.target.value;
      const square = event.target.closest('.pen-frame__big_footer').querySelector('.pen-frame__big_square');
      const hexUrl = `${this.appUrl}hex_from_pantone/${pantone}`;
      const data = await fetchData(hexUrl, this.tokenName)
      const hexColor = data.hex;
      if (hexColor) {
        square.style.backgroundColor = hexColor;
      }
    },
  },
}
</script>

<template>
  <div class="pen-frame">
    <div class="pen-frame__big">
      <div v-for="item in Object.keys(bigImages)"
           :key="item.id"
      >
        <div v-if="bigImages[item]">
          <div
              v-html="bigImages[item][0].replace('itemWidth', bigImages[item][3])"
          ></div>
          <div class="pen-frame__big_center">расположение:&nbsp;{{ bigImages[item][2] }}</div>
        </div>
      </div>
      <div class="pen-frame__big_footer">
        <div class="pen-frame__big_footer" v-for="color in colorQuantity"
             :key="color"
        >
          <div>цвет</div>
          <div>{{ color + 1 }}</div>
          <input
              type="text"
              class="pen-frame__big_input"
              @change="changeColor($event)"
          >
          <div class="pen-frame__big_square"></div>
        </div>
      </div>

    </div>
    <div class="pen-frame__small">
      <SinglePenSmallSingleComponent
          v-for="(pen, index) in currentGroupData"
          :key="index"
          :pen-data="pen"
          :pen-images="groupImages"
          @position-selected="positionSelected"
          @print-item-checked="printItemChecked"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.pen-frame {
  @include d-flex-center(space-between);
  width: 100%;

  &__big {
    padding: 12px 0;

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
    //width: 100%
  }

}

</style>
