<script setup>

</script>
<template>
  <div class="dict-block__row"
       :class="rowClass" v-if="rowData">
    <div class="dict-block__text"
         v-for="(field, index) in rowData.fields"
         :key="index">
      {{ field }}
      <div class="hex"
           v-if="field !== '' && field !== null && field[0] === '#'"
           :style="{ 'background-color': field }"></div>
    </div>
    <button class="btn btn-close btn_delete" type="button"
            @click="deleteRecord"
    >удалить
    </button>
  </div>
</template>
<script>
export default {
  name: 'DataRowSingleComponent',
  emits: ['row-deleted'],
  props: {
    rowData: Object,
    rowClass: Object
  },
  methods: {
    deleteRecord() {
      this.$emit('row-deleted');
    }
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-weight: inherit;
  }
}

.hex {
  font-size: 1.8rem;
  border: 0.2px solid $colorPrimary800;
  border-radius: 6px;
  height: 28px;
  width: 28px;
}

</style>
