<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<template>
  <form class="form-row" :class="rowClass" ref="formRef">
    <template v-for="(field, index) in dictionaryFields" :key="index">
      <component :is="fieldTypeComponent[field['type']].component"
                 :rowId="rowId"
                 :fieldValue="fieldValues[field['field']]"
                 :field=field
                 :choices="choicesNo"
                 @field-valid="validateField"
                 @choices-no="receiveChoicesNo"
      ></component>
    </template>
    <div class="button-block">
      <button class="btn btn-close i" type="button" @click="closeRow">
        <font-awesome-icon :icon="['fas', 'xmark']" class=""/>
      </button>
      <button class="btn btn-save i" type="submit">
        <font-awesome-icon :icon="['fas', 'check']" class=""/>
      </button>
    </div>
  </form>
</template>
<script>

import {fieldTypeComponent} from "@/components/form_fields/fieldTypeComponents.js"

export default {
  name: 'SettingsFormRowComponent',
  data() {
    return {
      fieldTypeComponent: fieldTypeComponent,
      fieldValidation: {},
      choicesNo: null
    }
  },
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
    receiveChoicesNo(data){
      this.choicesNo = data;
    },
    validateField(data) {
      this.fieldValidation[data.fieldName] = data.result;
    },
  },
  created() {
    if(this.rowId === 0){
      this.dictionaryFields.forEach(field => {
        this.fieldValidation[field['field']] = false;
      });
    }
  },
  computed: {
    fieldsData() {
      return this.$store.getters.getFieldData;
    },

    fieldValues() {
      let res = {};
      this.dictionaryFields.forEach(field => {
        res[field['name']] = '';
      });
      return res
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
