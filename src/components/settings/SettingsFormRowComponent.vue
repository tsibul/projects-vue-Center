<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<template>
  <form class="form-row" :class="rowClass" ref="formRef">
    <input type="number" :value="rowId" hidden name="id">
    <template v-for="(field, index) in dictionaryFields" :key="index">
      <component :is="fieldTypeComponent[field['type']].component"
                 :rowId="rowId"
                 :fieldValue="fieldValues[field['field']]"
                 :fieldId="fieldValues[field['field'] + '_id']"
                 :field=field
                 :choices="choicesNo"
                 @field-valid="validateField"
                 @choices-no="receiveChoicesNo"
      ></component>
    </template>
    <div class="button-block">
      <button class="btn btn-close i" type="button"
              @click="closeRow">
        <font-awesome-icon :icon="['fas', 'xmark']"/>
      </button>
      <button class="btn btn-save i" type="submit">
        <font-awesome-icon :icon="['fas', 'check']"/>
      </button>
    </div>
  </form>
</template>
<script>

import {fieldTypeComponent} from "@/components/form_fields/fieldTypeComponents.js"
import {fetchData} from "@/components/services/fetchData.js";

export default {
  name: 'SettingsFormRowComponent',
  data() {
    return {
      fieldTypeComponent: fieldTypeComponent,
      fieldValidation: {},
      choicesNo: null,
      formValid: null,
      fieldValues: {}
    }
  },
  inject: ['appUrl'],
  props: {
    rowId: Number,
    rowClass: Object,
    dictionaryFields: Object,
    dictionaryName: String,
  },
  emits: ['close-row'],
  methods: {
    closeRow() {
      document.removeEventListener('click', this.handleClickOutside);
      this.$emit('close-row')
    },
    handleClickOutside(event) {
      const formElement = this.$refs.formRef;
      if (formElement && !formElement.contains(event.target)) {
        this.closeRow();
      }
    },
    receiveChoicesNo(data) {
      this.choicesNo = data;
    },
    validateField(data) {
      this.fieldValidation[data.fieldName] = data.result;
      this.fieldInput();
    },
    fieldInput() {
      let formValid = true;
      let fieldKey;
      this.dictionaryFields.forEach(field => {
        fieldKey = field['field'];
        if (!this.fieldValidation[fieldKey]) {
          formValid = false;
        }
      });
      this.formValid = formValid;
    },
    async getFieldValues() {
      const tokenName = 'maketUserToken';
      const rowUrl =  `${this.appUrl}dictionary_record/${this.dictionaryName}/${this.rowId}`;
      const data = await fetchData(rowUrl, tokenName);
      this.fieldValues = data;
    },
    emptyFieldValues() {
      this.dictionaryFields.forEach(field => {
        this.fieldValues[field['name']] = '';
      });
    }

  },
  created() {
    if (this.rowId === 0) {
      this.dictionaryFields.forEach(field => {
        this.fieldValidation[field['field']] = false;
      });
    }
    this.fieldInput();
    if (this.rowId) {
      (async () => {
        await this.getFieldValues();
      })();
    } else {
      this.emptyFieldValues();
    }
  },
  // computed: {
  //   fieldsData() {
  //     return this.$store.getters.getFieldData;
  //   },
  // },
  // watch: {
  //   validateField: {
  //     handler: 'fieldInput'
  //   },
  // },
  mounted() {
    setTimeout(() => {
      document.addEventListener('click', this.handleClickOutside);
    }, 0);
  },
}
</script>

<style scoped lang="scss">
.form {
  &-row {
    display: grid;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 8px 8px;
    border-radius: 10px;
    cursor: pointer;
    flex-wrap: nowrap;
    grid-column: 1/ -1;
    width: 100%;
  }
}

.button-block {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.i {
  width: 36px;
}
</style>
