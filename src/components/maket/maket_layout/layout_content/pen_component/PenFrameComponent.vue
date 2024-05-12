<script>
import SinglePenSmallSingleComponent
  from "@/components/maket/maket_layout/layout_content/pen_component/SinglePenSmallComponent.vue";

export default {
  name: "PenFrameComponent",
  components: {SinglePenSmallSingleComponent},
  emits: ['position-selected'],
  data() {
    return {
      currentGroupData: this.groupData,
      bigImages: {},
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
    }
  },
}
</script>

<template>
  <div class="pen-frame">
    <div class="pen-frame__big">
      <div v-for="item in Object.keys(bigImages)"
           :key="item.id"
      >
        <div v-if="bigImages[item]"
             v-html="bigImages[item][0].replace('itemWidth', bigImages[item][3])">
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
    //width: 150mm;
  }

  &__small {
    //width: 100%
  }

}

</style>
