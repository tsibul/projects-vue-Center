<script setup>

</script>
<template>
  <div class="input-frame">
    <input type="file"
           :name="fieldName"
           placeholder="имя файла"
           id="fileName"
           ref="fileInput"
           class="file-input"
    >
  </div>
<!--  <button type="button" class="btn btn-save"-->
<!--          @click="downloadFile">загрузить-->
<!--  </button>-->
</template>
<script>
import axios from "axios";

export default {
  name: 'FormFileComponent',
  emits: ['field-valid'],
  data() {
    return {
      currentValue: this.fieldValue,
      fieldName: this.field['field']
    }
  },
  props: {
    field: Object,
    fieldValue: String,
  },
  created() {
    this.$emit('field-valid', {
      'fieldName': this.fieldName,
      'result': true
    });
  },
  methods:{
    async downloadFile() {
      try {
        const inputElement = this.$refs.fileInput;
        const fileType = this.$refs.fileType.value;
        const formData = new FormData();
        formData.append('file', inputElement.files[0]);
        formData.append('file_name', inputElement.files[0].name);
        formData.append('file_type', fileType);
        const token = localStorage.getItem(this.tokenName);
        const response = await axios.post(
            `${this.appUrl}import_additional_file/${this.orderId}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
              },
            }
        );
        const importResult = response.data;
        if (importResult) {
          this.fileList['main'].push({
            'id': importResult.id,
            'name': importResult.name,
            'additional_file_name': importResult.additional_file_name,
            'file_type': importResult.file_type,
            'order__id': importResult.order__id,
          });
          this.$emit('one-file-imported')
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>
<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.input-frame {
  font: inherit;
  border-radius: 10px;
  border: solid 1px;
  width: 300px;
  height: 34px;
  overflow: hidden;
  position: relative;
  transition: all 0.2s ease-out;
  text-align: start;

  &:hover {
    background-color: $colorPrimary200;
    border-width: 2px;
  }
}
.file-input {
  font: inherit;
  position: absolute;
  top: 4px;
  left: -45%;
  width: 340px;
  cursor: pointer;
}

</style>
