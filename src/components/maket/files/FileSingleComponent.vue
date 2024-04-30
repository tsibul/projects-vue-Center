<template>
  <div class="file-row"
       :class="rowClass">
    <div
        v-for="field in Object.keys(file)"
        :key="field"
        v-show="field !== 'id'"
        @click="field === filePosition ? showFile(file['id'], file[field]) : null"
        :class="field === filePosition ? 'file-row__file': ''"
    >
      {{ file[field] }}
    </div>
    <button class="btn btn-close"
            @click="deleteFile(file['id'])">удалить
    </button>
  </div>

</template>

<script>
import {showDownloadFile} from "@/components/services/showDownloadFile.js";

export default {
  name: "FileSingleComponent",
  inject: ['appUrl', 'tokenName'],
  emits: ['delete-file'],
  props: {
    file: Object,
    rowClass: Object,
    filePosition: String,
    fileShow: String,
  },
  methods: {
    deleteFile(fileId) {
      this.$emit('delete-file', fileId);
    },
    async showFile(fileId, fileName) {
      const showUrl = `${this.appUrl}${this.fileShow}/${fileId}/${fileName}`;
      const token = localStorage.getItem(this.tokenName);
      await showDownloadFile(showUrl, token)
    },
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/dictionary_sizes";
@import "@/assets/maket/scss/vars";

.file-row {
  display: grid;
  margin-right: 19px;
  align-items: center;
  gap: 10px;
  padding: 8px 8px;
  border-radius: 10px;
  flex-wrap: nowrap;

  &__file {
    cursor: pointer;
    color: blue;
    text-decoration: underline;

    &:hover {
      color: $colorPrimary400;
      text-decoration: underline;
    }
  }
}
</style>
