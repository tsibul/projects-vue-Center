<script>
export default {
  name: "A4MarkingComponent"
}
</script>

<template>
  <div class="frame-set">
    <div class="a4-marking no-print"></div>
    <div class="a4-marking no-print"></div>
    <div class="a4-marking no-print"></div>
    <div class="a4-marking no-print"></div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/maket/scss/vars';

.frame-set {
  position: absolute;
  display: flex;
  max-width: 430mm;
  flex-wrap: wrap;
  top: 61px;
  z-index: -2;
}

.a4-marking {
  height: 297mm;
  width: 210mm;
  margin: 1px 0 0 1px;
  border: 1px solid $colorSecondary400;
  top: 5mm;
}
</style>
