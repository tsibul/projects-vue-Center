<script setup>

</script>
<template>
  <input class="form-input" type="file" :name="fieldName" :value="fieldValue">
</template>
<script>
export default {
  name: 'FormFileComponent',
  props: {
    fieldName: String,
    field: Object
  }
}
</script>
<style scoped lang="scss">

</style>
