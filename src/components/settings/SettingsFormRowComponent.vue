<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<template>
  <form class="form-row"
        :class="rowClass"
        ref="formRef"
        enctype="multipart/form-data"
  >
    <input type="number" :value="rowId" hidden name="id">
    <template v-for="(field, index) in dictionaryFields" :key="index">
      <component :is="fieldTypeComponent[field['type']].component"
                 :rowId="rowId"
                 :fieldValue="fieldValues[field['field']]"
                 :fieldId="fieldValues[field['field'] + '_id']"
                 :field=field
                 :choices="choices"
                 @field-valid="validateField"
                 @choices-out="receiveChoices"
      ></component>
    </template>
    <div class="button-block">
      <button class="btn btn-close i" type="button"
              @click="closeRow">
        <font-awesome-icon :icon="['fas', 'xmark']"/>
      </button>
      <button class="btn btn-save i" type="button"
              @click="saveDictionary">
        <font-awesome-icon :icon="['fas', 'check']"/>
      </button>
    </div>
  </form>
</template>
<script>

import {fieldTypeComponent} from "@/components/form_fields/fieldTypeComponents.js"
import {fetchData} from "@/components/services/fetchData.js";
import {submitForm} from "@/components/services/submitForm.js";

export default {
  name: 'SettingsFormRowComponent',
  data() {
    return {
      fieldTypeComponent: fieldTypeComponent,
      fieldValidation: {},
      choices: {},
      formValid: null,
      fieldValues: {}
    }
  },
  inject: ['appUrl', 'tokenName'],
  props: {
    rowId: Number,
    rowClass: Object,
    dictionaryFields: Object,
    dictionaryName: String,
  },
  emits: ['close-row', 'row-edited'],
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
    receiveChoices(data) {
      const key = Object.keys(data)[0];
      this.choices[key] = data[key];
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
      const rowUrl = `${this.appUrl}dictionary_record/${this.dictionaryName}/${this.rowId}`;
      this.fieldValues = await fetchData(rowUrl, this.tokenName);
    },
    emptyFieldValues() {
      this.dictionaryFields.forEach(field => {
        this.fieldValues[field['name']] = '';
      });
    },
    async saveDictionary() {
      if (this.formValid) {
        const formData = new FormData();
        const formElements = this.$refs.formRef.elements;

        for (let i = 0; i < formElements.length; i++) {
          const element = formElements[i];
          if (!element.files) {
            formData.append(element.name, element.value); // Для элементов без файла
          } else {
            formData.append('file', element.files[0]); // Для элементов с файлом
          }
        }
        const postUrl = `${this.appUrl}dictionary_update/${this.dictionaryName}`;
        const postResult = await submitForm(postUrl, this.tokenName, formData);
        if (postResult) {
          this.$emit('row-edited', postResult)
        }
      }
    },

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
