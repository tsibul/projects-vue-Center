<script>
export default {
  name: "A3VerticalMarkingComponent"
}
</script>

<template>
  <div class="frame-set">
    <div class="a3v-marking no-print"></div>
    <div class="a3v-marking no-print"></div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/maket/scss/vars';

.frame-set {
  position: absolute;
  display: flex;
  top: 61px;
  z-index: -2;
}

.a3v-marking {
  height: 420mm;
  width: 297mm;
  margin: 1px 0 0 1px;
  border: 1px solid $colorSecondary400;
  top: 5mm;
}
</style>
