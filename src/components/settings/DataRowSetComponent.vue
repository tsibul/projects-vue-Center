<script setup>

import DataRowSingleComponent from "@/components/settings/DataRowSingleComponent.vue";
import SettingsFormRowComponent from "@/components/settings/SettingsFormRowComponent.vue";
</script>

<template>
  <div class="dict-block__content">
    <SettingsFormRowComponent v-if="showRecord"
                              :dictionaryName="dictionaryName"
                              :dictionaryFields="fieldsData[dictionaryName]"
                              :rowClass="rowClass"
                              :rowId="0"
                              @close-row="hideRecord"
    />
    <div v-for="(rowData, index) in dictionaryData"
         :key="rowData.id">
      <div v-if="rowEdit !== rowData.id">
        <DataRowSingleComponent
            :rowData="rowData"
            :rowClass="rowClass"
            @click="editRecord(rowData.id)"
            v-on:mouseover="index + 1 === lastRecord ? handleMouseOver() : null"
        />
      </div>
      <div v-else>
        <SettingsFormRowComponent
            :rowData="rowData"
            :rowClass="rowClass"
            :rowId="rowData.id"
            :dictionaryName="dictionaryName"
            :dictionaryFields="fieldsData[dictionaryName]"
            @close-row="hideRecord"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {fetchData} from "@/components/services/fetchData.js";

export default {
  name: 'DataRowSetComponent',
  inject: ['appUrl', 'tokenName'],
  props: {
    rowClass: Object,
    dictionaryName: String,
    searchString: String,
    dictionaryOrder: String,
    show: Boolean,
  },
  data() {
    return {
      dictionaryData: null,
      lastRecord: 0,
      showDeleted: 0,
      showRecord: false,
      rowEdit: null
    }
  },
  created() {
    (async () => {
      await this.fetchDictionaryData();
    })();
    // this.rowEdit = !this.show ? 0 : null;
  },
  methods: {
    async handleMouseOver() {
      await this.fetchDictionaryData();
    },
    hideRecord() {
      this.showRecord = false;
      document.removeEventListener('click', this.handleClickOutside);
      this.rowEdit = null
    },
    handleShowForm() {
      this.showRecord = true;
      document.addEventListener('click', this.handleClickOutside)
    },
    async fetchDictionaryData() {
      const statusUrl = this.appUrl +
          `dictionary_data/${this.dictionaryName}/${this.lastRecord}/${this.dictionaryOrder}/${this.searchString}/${this.showDeleted}`;
      if (this.dictionaryData) {
        const newData = await fetchData(statusUrl, this.tokenName);
        this.dictionaryData = [...this.dictionaryData, ...newData];
      } else {
        this.dictionaryData = await fetchData(statusUrl, this.tokenName);
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
    editRecord(rowId) {
      this.rowEdit = rowId;
    }
  },
  watch: {
    searchString: {
      handler: 'filterChange'
    },
    dictionaryOrder: {
      handler: 'filterChange'
    },
    show: {
      handler: 'handleShowForm'
    }
  },
  computed: {
    fieldsData() {
      return this.$store.getters.getFieldData;
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
