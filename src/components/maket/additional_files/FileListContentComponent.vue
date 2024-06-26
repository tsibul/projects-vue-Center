<script>
import { fetchData } from '@/components/services/fetchData.js'

export default {
  name: 'FileListContentComponent',
  inject: ['appUrl', 'tokenName'],
  emits: ['delete-file', 'reconnect-file'],
  props: {
    content: Array,
    contentType: String,
    orderId: Number
  },
  data() {
    return {
      titleList: null,
      buttonList: null
    }
  },
  methods: {
    deleteFile(fileId) {
      const fileUrl = `${this.appUrl}delete_additional_file/${fileId}`
      fetchData(fileUrl, this.tokenName)
        .then(response => {
          if (response) {
            this.$emit('delete-file', fileId)
          }
        })
    },
    reconnectFile(fileId) {
      this.$emit('reconnect-file', fileId)
    },
    async fileShow(fileId, fileType, additionalFileName, contentType) {
      if (!contentType.includes('макет')) {
        const fileUrl = `${this.appUrl}additional_file_show/${fileId}/${additionalFileName}`
        const response = await fetchData(fileUrl, this.tokenName)
        if (response) {
          if (fileType === '.pdf') {
            window.open(fileUrl, '_blank', 'noopener')
          } else {
            window.location.href = fileUrl
          }
        } else {
          alert('ошибка загрузки')
        }
      } else {
        const fileUrl = `${this.appUrl}maket_show/${fileId}`
        const response = await fetchData(fileUrl, this.tokenName)
        if (response) {
          window.open(fileUrl, '_blank', 'noopener')
        } else {
          alert('ошибка загрузки')

        }
      }
    },
    toMaket(id) {
      window.open(`http://localhost:5173/maket/layout?maketId=${id}&orderId=${this.orderId}`, '_blank')

    }
  },
  created() {
    this.titleList = {
      'maket': 'макеты',
      'main': 'текущие',
      'deleted': 'удаленные',
      'maket_deleted': 'удаленные макеты'
    }
    this.buttonList = {
      'maket': {
        'title': 'в шаблон',
        'class': 'btn-neutral',
        'function': this.toMaket
      },
      'maket_deleted': {
        'title': 'в шаблон',
        'class': 'btn-neutral',
        'function': this.toMaket
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
      }
    }
  }
}
</script>

<template>
  <div class="content" v-if="content.length > 0">
    <div class="content__header">{{ titleList[contentType] }}</div>
    <div class="content__item"
         v-for="file in content"
         :key="file.id">
      <div>{{ file.name }}</div>
      <div
        class="file-name"
        @click="fileShow(file.id, file.file_type, file.additional_file_name, titleList[contentType])"
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
    background-color: $colorSecondary100;
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
