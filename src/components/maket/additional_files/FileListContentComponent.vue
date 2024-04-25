<template>
  <div class="content" v-if="content.length > 0">
    <div class="content__header">{{ titleList[contentType] }}</div>
    <div class="content__item"
         v-for="file in content"
         :key="file.id">
      <div>{{ file.name }}</div>
      <div
          class="file-name"
          @click="fileShow(file.id, file.file_type, file.additional_file_name)"
      >
        {{ file.additional_file_name }}
      </div>
      <button class="btn"
              :class="buttonList[contentType]['class']"
              @click="buttonList[contentType]['function'](file.id)"
      >
        {{ buttonList[contentType]['title'] }}
      </button>
    </div>
  </div>

</template>

<script>
import {fetchData} from "@/components/services/fetchData.js";

export default {
  name: "FileListContentComponent",
  inject: ['appUrl', 'tokenName'],
  emits: ['delete-file'],
  props: {
    content: Array,
    contentType: String
  },
  data() {
    return {
      titleList: null,
      buttonList: null
    }
  },
  methods: {
    deleteFile(fileId) {
      const fileUrl = `${this.appUrl}delete_additional_file/${fileId}`;
      fetchData(fileUrl, this.tokenName)
          .then(response => {
            if (response) {
              this.$emit('delete-file', fileId);
            }
          })
    },
    reconnectFile() {

    },
    async fileShow(fileId, fileType, additionalFileName) {
      const fileUrl = `${this.appUrl}additional_file_show/${fileId}/${additionalFileName}`;
      const response = await fetchData(fileUrl, this.tokenName);
      if (response) {
        if (fileType === '.pdf') {
          window.open(fileUrl, '_blank', 'noopener');
        } else {
          window.location.href = fileUrl;
        }
      } else {
        alert('ошибка загрузки')
      }
    },
  },
  created() {
    this.titleList = {
      'maket': 'макеты',
      'main': 'текущие',
      'deleted': 'удаленные'
    }
    this.buttonList = {
      'maket': {
        'title': 'удалить',
        'class': 'btn-close',
        'function': this.deleteFile
      },
      'main': {
        'title': 'удалить',
        'class': 'btn-close',
        'function': this.deleteFile
      },
      'deleted': {
        'title': 'привязать',
        'class': 'btn-save',
        'function': this.reconnectFile
      },
    }
  },
}
</script>


<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.content {
  margin: 16px 0;
  padding: 16px;
  border: 1px solid $colorPrimary800;
  border-radius: 10px;
  position: relative;

  &__header {
    position: absolute;
    padding: 0 4px;
    top: -10px;
    left: 24px;
    background-color: $colorSecondary200;
    z-index: 2;
  }

  &__item {
    padding: 4px 0;
    display: grid;
    grid-template-columns: 1fr 1fr 103px;
    width: 100%;
    align-items: center;
    gap: 14px;
  }
}

.file-name {
  cursor: pointer;
  font-weight: 600;
  transition: color 0.1s ease-in-out;

  &:hover {
    color: $colorPrimary600;
    text-decoration: underline;
  }
}

</style>
