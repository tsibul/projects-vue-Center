<script setup>

</script>

<template>
  <input class="form-input" type="text"
         :name="field['field']"
         :value="currentValue"
         :class="field['readonly'] ? 'inactive' : null"
         :readonly="field['readonly']"
         @change="validateField"
  >
</template>
<script>
export default {
  name: 'FormInputComponent',
  data(){
    return {
      currentValue: this.fieldValue
    }
  },
  props: {
    field: Object,
    fieldValue: String
  },
  methods:{
    validateField() {
      let inputResult = false;
      if(this.field['null'] !== undefined && !this.field['null'] && this.currentValue){
        inputResult = true;
      } else if (this.field['null'] === undefined || this.field['null']){
        inputResult = true;
      }
      if(this.field['number'] && typeof this.currentValue === 'number'){
        inputResult = true;
      } else if (this.field['number'] && typeof this.currentValue !== 'number'){
        inputResult = false;
      }
      this.$emit('field-valid', {
        'fieldName': this.fieldName,
        'result': inputResult
      });
    }
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
