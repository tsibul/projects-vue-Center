<template>
  <details>
    <summary class="order-summary">

    </summary>
    <div class="order-content">

    </div>
  </details>
</template>

<script>
export default {
  name: "OrderSingleComponent"
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.order-summary{
  display: grid;
  align-items: center;
  gap: 10px;
  padding: 8px 8px;
  border-radius: 10px;
  flex-wrap: nowrap;
  grid-template-columns: repeat(2, 1fr) 2fr repeat(2, 1fr) repeat(4, 2fr);
}
</style>
