<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<template>
  <div class="dropdown report_dropdown dropdown_dict">
    <input type="text" class="dropdown__hidden" :name="field['field']" :value="currentBooleanValue">
    <div class="dropdown__input-block" @click.stop="toggleDropdown">
      <input type="text" class="dropdown__input dropdown__input_dict" :value="currentValue" readonly>
      <font-awesome-icon :icon="['fas', 'angle-down']" />&nbsp;
    </div>
    <ul class="dropdown__content" v-show="showDropdown">
      <li  @click="selectOption('да')">да</li>
      <li  @click="selectOption('нет')">нет</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'FormBooleanComponent',
  emits: ['field-valid'],
  props: {
    field: Object,
    fieldValue: Boolean,
  },
  data(){
    return{
      currentValue: this.fieldValue ? 'да' : 'нет',
      showDropdown: false,
      currentBooleanValue: this.fieldValue,
      fieldName: this.field['field']
    }
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    selectOption(option) {
      this.currentValue = option;
      this.showDropdown = false;
    },
    booleanFromOption(option){
      if(option === 'да'){
        this.currentBooleanValue = 1;
      } else {
        this.currentBooleanValue = 0;
      }
    },
    booleanValidation(newValue){
      this.booleanFromOption(newValue);
      this.$emit('field-valid', {
        'fieldName': this.fieldName,
        'result': true
      });

    }
  },
  watch: {
    currentValue(newValue){
      this.booleanFromOption(newValue);
    },
    fieldValue(newValue){
      this.currentValue =  newValue ? 'да' : 'нет';
      this.booleanValidation(newValue);
    }
  },
  created() {
    if(this.fieldValue === undefined){
      this.currentValue = 'да';
    }
    this.booleanValidation(this.currentValue);
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.dropdown {
  position: relative;
  //height: 40px;

  &__content {
    width: 100%;
    list-style: none;
    overflow: auto;
    @include brd-standard;
    position: absolute;
    background-color: $colorSecondary100;
    //display: none;
    z-index: 7;

    & li {
      padding: 6px 10px;
      border: 1px solid transparent;
      border-radius: 10px;

      &:hover {
        color: $colorSecondary100;
        background-color: $colorPrimary800;
      }
    }
  }

  &__input-block {
    display: flex;
    align-items: center;
    border: 1px solid $colorPrimary800;
    border-radius: 10px;
    background-color: $colorSecondary100;

    &_start {
      margin-top: 20px;
    }
  }

  &__input {
    background-color: transparent;
    width: 100%;
    font-size: 16px;
    padding: 7px 10px;
    border: 1px solid transparent;
    height: 36px;


    &:focus {
      outline: none;
      font-weight: 600;
    }
  }

  &__hidden {
    display: none;
  }

}
</style>
