<script setup>

import DataRowSingleComponent from "@/components/settings/DataRowSingleComponent.vue";
</script>

<template>
  <div class="dict-block__content">
    <DataRowSingleComponent
        v-for="(rowData, index) in dictionaryData"
        :key="rowData.id"
        :rowData="rowData"
        :rowClass="rowClass"
        :dataset-id="rowData.id"
        v-on:mouseover="index + 1 === lastRecord ? handleMouseOver() : null"
    />
  </div>
</template>

<script>
import {fetchData} from "@/components/services/fetchData.js";

export default {
  name: 'DataRowSetComponent',
  inject: ['appUrl'],
  props: {
    rowClass: Object,
    fieldsData: Object,
    dictionaryName: String,
    searchString: String,
    dictionaryOrder: String,
  },
  data() {
    return {
      dictionaryData: null,
      lastRecord: 0,
      showDeleted: 0
    }
  },
  created() {
    (async () => {
      await this.fetchDictionaryData();
    })();
  },
  methods: {
    async handleMouseOver() {
      // Обработчик события mouseover
      await this.fetchDictionaryData();
    },
    async fetchDictionaryData() {
      const tokenName = 'maketUserToken';
      const statusUrl = this.appUrl +
          `dictionary_data/${this.dictionaryName}/${this.lastRecord}/${this.dictionaryOrder}/${this.searchString}/${this.showDeleted}`;
      if (this.dictionaryData) {
        const newData = await fetchData(statusUrl, tokenName);
        this.dictionaryData = [...this.dictionaryData, ...newData];
      } else {
        this.dictionaryData = await fetchData(statusUrl, tokenName);
      }
      if (this.dictionaryData.length) {
        this.lastRecord = this.dictionaryData.length;
      }
    },
    async filterChange() {
      this.lastRecord = 0;
      this.dictionaryData = null;
      await this.fetchDictionaryData();
    },
  },
  watch: {
    searchString: {
      handler: 'filterChange'
    },
    dictionaryOrder: {
      handler: 'filterChange'
    },
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/dictionary_sizes";

.dict-block__content {
  overflow-y: scroll;
  height: calc(100% - 130px);
  min-height: 160px;

  &_adm {
    overflow-y: scroll;
    min-height: 220px;
  }
}


</style>
