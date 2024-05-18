<script>
export default {
  name: "A3HorizontalMarkingComponent"
}
</script>

<template>
  <div class="frame-set">
    <div class="a3h-marking no-print"></div>
    <div class="a3h-marking no-print"></div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/maket/scss/vars';

.frame-set {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 61px;
  z-index: -2;
}

.a3h-marking {
  height: 297mm;
  width: 420mm;
  margin: 1px 0 0 1px;
  border: 1px solid $colorSecondary400;
  top: 5mm;
}
</style>
