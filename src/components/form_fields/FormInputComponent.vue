<script setup>

</script>

<template>
  <input class="form-input" type="text"
         :name="field['field']"
         v-model="currentValue"
         :class="field['readonly'] ? 'inactive' : null"
         :readonly="field['readonly']"
  >
</template>
<script>
export default {
  name: 'FormInputComponent',
  data(){
    return {
      currentValue: this.fieldValue,
      fieldName: this.field['field']
    }
  },
  props: {
    field: Object,
    fieldValue: String
  },
  emits: ['field-valid'],
  methods:{
    validateField() {
      let inputResult = false;
      if(this.field['null'] !== undefined && !this.field['null'] && this.currentValue){
        inputResult = true;
      } else if (this.field['null'] === undefined || this.field['null']){
        inputResult = true;
      }
      if(this.field['number'] && !isNaN(this.currentValue)){
        inputResult = true;
      } else if (this.field['number'] && isNaN(this.currentValue)){
        inputResult = false;
      }
      this.$emit('field-valid', {
        'fieldName': this.fieldName,
        'result': inputResult
      });
    }
  },
  watch:{
    currentValue(){
      this.validateField();
    },
    fieldValue(newValue){
      this.currentValue = newValue;
    },
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.form-input {
  @include brd-standard;
  padding: 7px 10px;
  background-color: $colorSecondary100;
  width: 100%;
  height: 36px;
  font-weight: inherit;

  &_stop {
    width: 100%;
  }

  &__inactive {
    opacity: 0.5;
  }
}



</style>
