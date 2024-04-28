<script setup>

</script>
<template>
  <div class="dict-block__row" v-if="rowData">
    <div class="dict-block__text">{{ rowData.fields[0] }}</div>
    <div class="dict-block__text">{{ rowData.fields[1] }}</div>
    <div class="dict-block__text file"
         @click="fileShow(rowData.id)"
    >{{ rowData.fields[2] }}
    </div>
    <button class="btn btn-save"
            type="button"
            @click="this.$emit('edit-record')"
    >
      редактировать
    </button>
    <button class="btn btn-close btn_delete"
            type="button"
            @click="deleteRecord"
    >
      удалить
    </button>
  </div>
</template>
<script>
import {fetchData} from "@/components/services/fetchData.js";
import axios from "axios";

export default {
  name: 'PatternSingleComponent',
  inject: ['appUrl', 'tokenName'],
  emits: ['row-deleted', 'edit-record'],
  props: {
    rowData: Object,
  },
  methods: {
    deleteRecord() {
      this.$emit('row-deleted');
    },
    async fileShow(patternId) {
      const fileUrl = `${this.appUrl}pattern_show/${patternId}`;
      const token = localStorage.getItem(this.tokenName);
      if (token) {
        const response = await axios.get(fileUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response) {
          const fileType = response.headers.get('content-type');
          if (fileType === 'application/pdf') {
            window.open(fileUrl, '_blank');
          } else {
            window.location.href = fileUrl;
          }
        } else {
          alert('ошибка загрузки')
        }
      }
    },
  }
}

</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/dictionary_sizes";

.dict-block {
  &__row {
    display: grid;
    align-items: center;
    gap: 10px;
    padding: 8px 8px;
    border-radius: 10px;
    grid-template-columns: 4fr 5fr 7fr 2fr 2fr;

  }

  .file {
    cursor: pointer;
    color: blue;
    text-decoration: underline;

    &:hover {
      color: $colorPrimary400;
      text-decoration: underline;
    }
  }

  &__text {
    width: 100%;
    font-weight: inherit;
  }
}
</style>
