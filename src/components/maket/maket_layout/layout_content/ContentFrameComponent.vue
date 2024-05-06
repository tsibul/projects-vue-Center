<template>
  <div class="content-frame"  >
    <div class="content-frame__header">{{ groupMame.replace('()', ' ') }}</div>
  </div>

</template>

<script>
export default {
  name: "ContentFrameComponent",
  props: {
    groupData: Array,
    groupMame: String,
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";

.content-frame {
  border-top: 1px solid $colorPrimary800;
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
