<template>
  <FilesTitleComponent
      :field-list="fieldList"
      :file-url="fileUrl"
      :row-class="rowClass"
      :delete-all-url="deleteAllUrl"
      @all-deleted="handleDeleteAll"
  />
  <FileSingleComponent v-for="file in dataList" :key="file.id"
                       :file="file"
                       :rowClass="rowClass"
                       :filePosition="filePosition"
                       :fileShow="fileShow"
                       @delete-file="deleteFile($event, file['id'])"/>
  <DeleteAlertComponent
      v-if="showDeleteAlert"
      @closeForm="showDeleteAlert=false"
      @deleted="handleDeleted($event)"
      :deleteUrl="deleteUrl"
  />
</template>

<script>
import DeleteAlertComponent from "@/components/delete_alert/DeleteAlertComponent.vue";
import FilesTitleComponent from "@/components/maket/files/FilesTitleComponent.vue";
import {fetchData} from "@/components/services/fetchData.js";
import FileSingleComponent from "@/components/maket/files/FileSingleComponent.vue";

export default {
  name: "FileSetComponent",
  components: {FileSingleComponent, FilesTitleComponent, DeleteAlertComponent},
  emits: ['check-to-null'],
  inject: ['tokenName', 'appUrl'],
  props: {
    searchString: String,
    showUnDeleted: Boolean,
    order: String,
    fieldList: Object,
    fileUrl: String,
    forDeleteUrl: String,
    deleteAllUrl: String,
    rowClass: Object,
    filePosition: String,
    fileShow: String
  },
  data() {
    return {
      showDeleteAlert: false,
      deleteUrl: null,
      dataList: [],
      lastRecord: 0,
      numberForUndeleted: 0
    }
  },
  methods: {
    handleDeleted(deletedId) {
      const indexDeleted = this.dataList.indexOf((elem) => elem.id === deletedId.id);
      this.dataList.splice(indexDeleted, 1);
      this.showDeleteAlert = false;
    },
    handleDeleteAll(){
      this.numberForUndeleted = 0;
      this.$emit('check-to-null');
      this.dataList = null;
    },
    async createDataList() {
      const dataUrl = `${this.fileUrl}/${this.lastRecord}/${this.searchString}/${this.numberForUndeleted}`;
      if (this.dataList) {
        const newData = await fetchData(dataUrl, this.tokenName);
        this.dataList = [...this.dataList, ...newData];
      } else {
        this.dataList = await fetchData(dataUrl, this.tokenName);
      }
      if (this.dataList.length) {
        this.lastRecord = this.dataList.length;
      }
    },
    deleteFile(event, fileId) {
      this.deleteUrl =`${this.forDeleteUrl}/${fileId}`;
      this.showDeleteAlert = true;
    },
    async filterChange() {
      this.lastRecord = 0;
      this.dataList = null;
      this.numberForUndeleted = this.showUnDeleted ? 1 : 0;
      await this.createDataList();
    },
  },
  created() {
    (async () => {
      await this.createDataList();
    })();
  },
  watch: {
    searchString: {
      handler: 'filterChange'
    },
    showUnDeleted: {
      handler: 'filterChange'
    },
    numberForUndeleted: {
      handler: 'filterChange'
    }
  },
}
</script>

<style scoped lang="scss">

</style>
