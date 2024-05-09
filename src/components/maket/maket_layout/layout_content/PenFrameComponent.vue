<template>
  <div class="pen-frame">
    <div class="pen-frame_small">
      <SinglePenSmallSingleComponent
          v-for="pen in groupData"
          :key="pen.id"
          :pen-data="pen"
          :pen-images="groupImages"
      />
      <div class="pen-frame__big">

      </div>
    </div>
  </div>
</template>

<script>
import SinglePenSmallSingleComponent
  from "@/components/maket/maket_layout/layout_content/SinglePenSmallComponent.vue";

export default {
  name: "PenFrameComponent",
  components: {SinglePenSmallSingleComponent},
  data() {
    return {}
  },
  props: {
    groupData: Array,
    groupImages: Array
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";

.pen-frame {
  display: flex;
  width: 100%;

  &__big {
    //width: 150mm;
  }

  &_small {
    width: 100%
  }

}

</style>
