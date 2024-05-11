<script>
import SinglePenSmallSingleComponent
  from "@/components/maket/maket_layout/layout_content/SinglePenSmallComponent.vue";

export default {
  name: "PenFrameComponent",
  components: {SinglePenSmallSingleComponent},
  emits: ['position-selected'],
  data() {
    return {
      currentGroupData: this.groupData,
    }
  },
  props: {
    groupData: Array,
    groupImages: Array
  },
  methods: {
    positionSelected(penData){
      this.currentGroupData[penData[0]] = penData[1];
      this.$emit('position-selected', this.currentGroupData);
    }
  },
}
</script>

<template>
  <div class="pen-frame">
    <div class="pen-frame__big">

    </div>
    <div class="pen-frame__small">
      <SinglePenSmallSingleComponent
          v-for="(pen, index) in currentGroupData"
          :key="index"
          :pen-data="pen"
          :pen-images="groupImages"
          @position-selected="positionSelected"
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
