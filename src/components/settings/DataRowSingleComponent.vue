<script setup>

</script>
<template>
  <div class="dict-block__row" :class="rowClass" v-if="rowData">
    <div class="dict-block__text" v-for="(field, index) in rowData.fields" :key="index" >{{ field }}</div>
    <button class="btn btn-close btn_delete" type="button">удалить</button>
  </div>
</template>
<script>
export default {
  name: 'DataRowSingleComponent',
  props:{
    rowData: Object,
    rowClass: Object
  }
}

</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/dictionary_sizes";

.dict-block {
  &__row {
    display: grid;
    align-items: center;
    gap: 10px;
    padding: 8px 8px;
    border-radius: 10px;
    cursor: pointer;
    flex-wrap: nowrap;

    &:not(.active):hover {
      background-color: $colorPrimary200;
    }
  }

  &__text {
    width: 100%;
    font-weight: inherit;
  }
}
</style>
