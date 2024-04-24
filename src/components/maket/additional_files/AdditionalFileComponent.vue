<template>
  <div class="file-list" ref="modalDraggable"
       @mousedown="startDrag"
       @mouseup="stopDrag"
       @mousemove="drag"
  >
    <div class="file-list__header">
      <p class="active">Связанные файлы</p>
      <span class="file-list__close"
            @click="closeFiles"
      >&times;</span>
    </div>
    <div v-if="fileList">
      <FileListContentComponent
          v-for="fileType in Object.keys(fileList)"
          :key="fileType"
          :content="fileList[fileType]"
          :contentType="fileType"
      />
    </div>
    <div class="file-list__item">
      <div>
        <label for="fileDesc">описание&nbsp;</label>
        <input type="text" name="name" class="form-input name-input" id="fileDesc">
      </div>
      <div class="file-list__input-frame">
        <input type="file" name="additional_file_name" placeholder="имя файла" required id="fileName"
               ref="fileInput"
               class="file-list__input"
        >
      </div>
      <button type="button" class="btn btn-save">загрузить</button>
    </div>
  </div>
</template>

<script>
import {authMixin} from "@/components/auth/authMixin.js";
import {fetchData} from "@/components/services/fetchData.js";
import {modalDragAndDrop} from "@/components/modal_drag_drop/modalDragAndDrop.js";
import FileListContentComponent from "@/components/file_import/FileListContentComponent.vue";

export default {
  name: "AdditionalFileComponent",
  components: {FileListContentComponent},
  mixins: [authMixin, modalDragAndDrop],
  inject: ['appUrl', 'tokenName'],
  emits: ['close-files', 'file-loaded'],
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
  left: 20vw;
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
    float: right;
    font-size: 16px;
    cursor: pointer;
  }

  &__item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 14px;
  }
}

.name-input {
  width: 300px;
}

</style>