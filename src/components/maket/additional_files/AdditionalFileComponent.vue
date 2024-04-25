<template>
  <div class="file-list" ref="modalDraggable"
       @mousedown="startDrag"
       @mouseup="stopDrag"
       @mousemove="drag"
  >
    <div class="file-list__header">
      <div class="active">Связанные файлы</div>
      <div class="file-list__close"
            @click="closeFiles"
      >&times;</div>
    </div>
    <div v-if="fileList">
      <FileListContentComponent
          v-for="fileType in Object.keys(fileList)"
          :key="fileType"
          :content="fileList[fileType]"
          :contentType="fileType"
          @delete-file="fileDeleted(fileType)"
      />
    </div>
    <div class="file-list__item">
      <div class="file-type">
        <label for="fileDesc">описание&nbsp;</label>
        <input type="text"
               name="name"
               class="form-input name-input"
               id="fileDesc"
               ref="fileType">
      </div>
      <div class="file-list__input-frame">
        <input type="file"
               name="additional_file_name"
               placeholder="имя файла"
               required
               id="fileName"
               ref="fileInput"
               class="file-list__input"
        >
      </div>
      <button type="button" class="btn btn-save"
              @click="downloadFile">загрузить
      </button>
    </div>
  </div>
</template>

<script>
import {authMixin} from "@/components/auth/authMixin.js";
import {fetchData} from "@/components/services/fetchData.js";
import {modalDragAndDrop} from "@/components/modal_drag_drop/modalDragAndDrop.js";
import FileListContentComponent from "@/components/maket/additional_files/FileListContentComponent.vue";
import axios from "axios";

export default {
  name: "AdditionalFileComponent",
  components: {FileListContentComponent},
  mixins: [authMixin, modalDragAndDrop],
  inject: ['appUrl', 'tokenName'],
  emits: ['close-files', 'one-file-deleted', 'one-file-imported'],
  data() {
    return {
      fileList: null,
    }
  },
  props: {
    orderId: Number,
  },
  created() {
    (async () => {
      await this.importFiles();
    })();
  },
  methods: {
    async importFiles() {
      const fileUrl = `${this.appUrl}additional_file/${this.orderId}`;
      this.fileList = await fetchData(fileUrl, this.tokenName);
    },
    closeFiles() {
      this.$emit('close-files')
    },
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
          });
          this.$emit('one-file-imported')
        }
      } catch (error) {
        console.log(error);
      }
    },
    fileDeleted(fileType, id) {
      const index = this.fileList[fileType].findIndex(file => file.id === id);
      this.fileList[fileType].splice(index, 1)
      this.$emit('one-file-deleted')
    }
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.file-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 14px;
  border: 1px solid $colorPrimary800;
  border-radius: 10px;
  position: absolute;
  top: 25vh;
  left: 16vw;
  //max-width: 740px;
  box-shadow: 6px 6px 12px $colorPrimary800;
  background-color: $colorSecondary200;

  &__header {
    padding: 16px;
    justify-content: space-between;
    width: 100%;
    border-radius: 10px;
    background-color: $colorPrimary400;
    display: flex;
    color: $colorPrimary800;
    align-items: center;
  }

  &__input-frame {
    font: inherit;
    border-radius: 10px;
    border: solid 1px;
    width: 400px;
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

  &__input {
    font: inherit;
    position: absolute;
    top: 4px;
    left: -34%;
    width: 536px;
    cursor: pointer;
  }

  &__buttons {
    width: 100%;
    text-align: right;
  }

  &__close {
    padding-left: 12px;
    z-index: 10;
    float: right;
    font-size: 18px;
    cursor: pointer;
  }

  &__item {
    display: grid;
    grid-template-columns: 1fr 1fr 103px;
    padding: 0 14px;
    width: 100%;
    align-items: center;
    gap: 14px;
  }
}

.name-input {
  width: 100%;
}

.file-type {
  display: flex;
  align-items: center;
}
</style>
