<script setup>

</script>

<template>
  <form class="form-row" :class="rowClass">
    <template v-for="(component, index) in components" :key="index">
      <component :is="component.type" :props="component.props"></component>
    </template>
  </form>
</template>
<script>
export default {
  name: 'SettingsFormRowComponent',
  data (){
    return{
      components: [
        { type: 'ComponentType1', props: { prop1: 'value1' } },
        { type: 'ComponentType2', props: { prop2: 'value2' } },
        // Добавьте другие компоненты по мере необходимости
      ]
    }
  },
  props: {
    rowClass: String,
    fieldsData: Object,
    dictionaryName: String
  }
}
</script>

<style scoped lang="scss">
.form {
  &-row {
    display: grid;
    grid-column: 1/ -1;
    align-items: center;
    gap: 10px;
    width: 100%;
  }
}
</style>
