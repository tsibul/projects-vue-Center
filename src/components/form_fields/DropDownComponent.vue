<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<template>
  <div class="dropdown report_dropdown dropdown_dict">
    <input type="text" class="dropdown__hidden"
           :name="fieldName"
           :value="currentId">
    <div class="dropdown__input-block"
         @click.stop="toggleDropdown">
      <input type="text" class="dropdown__input dropdown__input_dict" placeholder="Поиск.."
             v-model="searchString"
             @input="validateField"
             :class="field['readonly'] ? 'inactive' : null"
             :readonly="field['readonly']"
      >
      <font-awesome-icon :icon="['fas', 'angle-down']"/>&nbsp;
    </div>
    <ul class="dropdown__content" v-show="showDropdown">
      <li v-for="option in optionList"
          v-show="!searchString || option[Object.keys(option)[0]].toUpperCase().indexOf(searchString.toUpperCase()) > -1"
          :key="option"
          @click="selectOption(option)">
        {{ option[Object.keys(option)[0]] }}
      </li>
    </ul>
  </div>
</template>
<script>
import {fetchData} from "@/components/services/fetchData.js";

export default {
  name: 'DropDownComponent',
  inject: ['appUrl', 'tokenName'],
  emits: [
    'field-valid',
    'choices-out'
  ],
  data() {
    return {
      showDropdown: false,
      optionList: [],
      currentValue: this.fieldValue,
      currentId: this.fieldId,
      searchString: this.currentValue,
      selectLine: false,
      fieldName: this.field['field'],
    }
  },

  props: {
    fieldValue: String,
    fieldId: Number,
    field: Object
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    selectOption(option) {
      this.currentId = Object.keys(option)[0]
      this.searchString = '';
      this.searchString = option[this.currentId];
      this.showDropdown = false;
      this.selectLine = true;
      this.emitChoices(option);
      this.$emit('field-valid', {
        'fieldName': this.fieldName,
        'result': true
      });
    },
    async createOptionList() {
      const optionUrl = this.appUrl + `dictionary_filter/${this.foreignClass}/default/0`;
      this.optionList = await fetchData(optionUrl, this.tokenName);
      const option = this.optionList.find(el => Object.values(el).includes(this.fieldValue));
      this.emitChoices(option);
    },
    validateField() {
      let inputResult = false;
      const expectedValue = this.optionList.find(obj => Object.prototype.hasOwnProperty.call(obj, this.currentId));
      if (expectedValue === this.currentValue) {
        inputResult = true;
      }
      this.$emit('field-valid', {
        'fieldName': this.fieldName,
        'result': inputResult
      });
    },
    emitChoices(option) {
      setTimeout(() => {
        try {
          const choicesNo = option['choices'];
          const choicesOut = {};
          choicesOut[this.fieldName] = choicesNo;
          this.$emit('choices-out', choicesOut);
        } catch { /* empty */
        }
      }, 0)
    }
  },
  created() {
    (async () => {
      await this.createOptionList();
    })();
    this.currentValue = this.fieldValue;
  },
  watch: {
    searchString(newValue) {
      if (newValue && newValue !== this.fieldValue) {
        if (!this.selectLine) {
          this.showDropdown = true;
          this.selectLine = false;
        }
      }
    },
    fieldValue() {
      this.searchString = this.fieldValue;
      this.currentId = this.fieldId;
      this.validateField();
    },
    // optionList: {
    //   handler() {
    //     const option = this.optionList.find(el => Object.values(el).includes(this.fieldValue));
    //     if (option['choices']) {
    //       const choicesOut = {};
    //       choicesOut[this.fieldName] = option['choices'];
    //       this.$emit('choices-out', choicesOut);
    //     }
    //   },
    //   deep: true
    // },
  },
  computed: {
    foreignClass() {
      return this.field['foreignClass']
    },
  }
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
        background-color: $colorPrimary500;
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
