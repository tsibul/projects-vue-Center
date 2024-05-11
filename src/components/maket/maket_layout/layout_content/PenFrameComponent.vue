<template>
  <div class="pen-frame">
    <div class="pen-frame__big">

    </div>
    <div class="pen-frame__small">
      <SinglePenSmallSingleComponent
          v-for="pen in groupData"
          :key="pen.id"
          :pen-data="pen"
          :pen-images="groupImages"
      />
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
