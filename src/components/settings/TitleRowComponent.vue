<script setup>

</script>

<template>
  <div class="block__row active block__row_right-margin" :class="rowClass">
    <div v-for="fieldName in fieldsData[dictionaryName]" :key="fieldName.id">{{ fieldName.label }}</div>
    <button class="btn btn-save" @click="newRecord">добавить</button>
  </div>

</template>

<script>
export default {
  name: 'TitleRowComponent',
  props:{
    rowClass: Object,
    fieldsData: Object,
    dictionaryName: String
  },
  methods:{
    newRecord(){
      this.$emit('showNewRecord', true);
    },

  },
}

</script>


<style scoped lang="scss">
@import "@/assets/maket/scss/dictionary_sizes";

.block__row {
  display: grid;
  align-items: center;
  gap: 10px;
  padding: 8px 8px;
  border-radius: 10px;
  flex-wrap: nowrap;

  &_right-margin {
    margin-right: 19px;
  }
}
</style>
