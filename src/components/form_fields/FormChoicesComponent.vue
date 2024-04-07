<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<template>
  <div class="dropdown report_dropdown dropdown_dict">
    <input type="text" class="dropdown__hidden"
           :name="field['field']"
           :value="currentValue">
    <div class="dropdown__input-block"
         @click.stop="toggleDropdown">
      <input type="text" class="dropdown__input dropdown__input_dict"
             :value="currentValue" readonly>
      <font-awesome-icon :icon="['fas', 'angle-down']"/>&nbsp;
    </div>
    <ul class="dropdown__content" v-show="showDropdown">
      <li v-for="number in numberList"
          :key="number"
          @click="selectOption(number)"
      >{{ number }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'FormChoicesComponent',
  data() {
    return {
      showDropdown: false,
      currentValue: this.fieldValue,
      fieldName: this.field['field'],
      numberList: null
    }
  },
  emits: ['field-valid'],
  props: {
    field: Object,
    fieldValue: Number,
    choices: Object,
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    selectOption(option) {
      this.currentValue = option;
      this.showDropdown = false;
    },
    numbers() {
      if (this.choices) {
        return Array.from({length: this.choices[this.field['choices']]}, (_, index) => index + 1);
      } else {
        return [null]
      }
    }
  },
  // created: {
  //   numbers() {
  //     if (this.choices) {
  //       return Array.from({length: this.choices[this.field['choices']]}, (_, index) => index + 1);
  //     } else {
  //       return [null]
  //     }
  //   }
  // },
  watch: {
    choices: {
      handler() {
        this.numberList = this.numbers();
        if (this.fieldValue === undefined) {
          this.currentValue = this.numberList[0]
        }
        this.$emit('field-valid', {
          'fieldName': this.fieldName,
          'result': true
        });
      },
      deep: true
    }
  }
}

</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.dropdown {
  position: relative;

  &__content {
    width: 100%;
    list-style: none;
    overflow: auto;
    @include brd-standard;
    position: absolute;
    background-color: $colorSecondary100;
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
