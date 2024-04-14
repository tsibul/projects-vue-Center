<template>
  <div class="import__content">
    <form method="post" id="import-form" action="#" @submit.prevent="importFile">
      <div class="import__header">
        <p class="active">Выбрать файл</p>
        <span class="import__close" @click="closeForm">&times;</span>
      </div>
      <div class="import__input-frame">
        <input type="file" name="file_name" placeholder="имя файла" required
               ref="fileInput"
               class="import__input"
               :accept="fileType">
      </div>
      <div class="import__buttons">
        <button type="submit" class="btn btn-save">Загрузить</button>
      </div>
    </form>
  </div>

</template>
<script>
import axios from "axios";
import {authMixin} from "@/components/auth/authMixin.js";

export default {
  name: "FileImportComponent",
  mixins: [authMixin],
  inject: ['appUrl', 'tokenName'],
  emits: ['closeForm', 'file-loaded'],
  props: {
    fileType: String,
  },
  methods: {
    async importFile() {
      try {
        const inputElement = this.$refs.fileInput;
        const formData = new FormData();
        formData.append('tmp_file', inputElement.files[0]);
        const token = localStorage.getItem(this.tokenName);
        const response = await axios.post(
            `${this.appUrl}import_file`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
              },
            }
        );
        const importResult = response.data.result;
        if (importResult) {
          console.log(importResult, 'file imported');
          this.$emit('file-loaded', true)
        } else {
          this.$emit('file-loaded', false)
        }
      } catch (error) {
        this.$emit('file-loaded', false)
      } finally {
        this.closeForm();
      }
    },
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.import {

  &__header {
    padding: 4px;
    justify-content: space-between;
    width: 100%;
    border-radius: 10px;
    background-color: $colorPrimary400;
    display: flex;
    color: $colorPrimary800;
    align-items: center;
  }

  &__content {
    padding: 16px;
    border: 1px solid $colorPrimary800;
    border-radius: 10px;
    background-color: $colorSecondary200;
    box-shadow: 6px 6px 12px $colorPrimary800;
    position: absolute;
    left: 70vw;
    top: 25vh;
  }

  &__input-frame {
    font: inherit;
    border-radius: 10px;
    border: solid 1px;
    margin: 12px 0;
    width: 400px;
    height: 42px;
    overflow: hidden;
    position: relative;
    transition: all 0.2s ease-out;

    &:hover {
      background-color: $colorPrimary200;
      border-width: 2px;
    }
  }

  &__input {
    font: inherit;
    position: absolute;
    top: 8px;
    left: -34%;
    width: 536px;
    cursor: pointer;
  }

  &__buttons {
    width: 100%;
    text-align: right;
  }

  &__close {
    color: $colorSecondary100;
    float: right;
    font-size: 16px;
    padding: 8px;
    cursor: pointer;
  }
}

</style>
