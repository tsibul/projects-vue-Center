<template>
  <div class="files">
    <ClauseHeadingComponent
        :title="'Дополнительные файлы'"
        :icon="'file'"
        :font-class="{'font__normal': true}"
        :check-box-deleted="true"
        :check-box-deleted-text="'скрыть не удаленные'"
        @search-string="search"
        @hide-deleted-change="hideDeletedChange"
    />
    <FileSetComponent
        :searchString="searchString"
        :order="order"
        :showUndeleted="showUndeleted"
        :fieldList="fieldList"
        :fileUrl="fileUrl"
        :for-delete-url="deleteUrl"
        :rowClass="rowClass"
    />
  </div>
</template>

<script>
import ClauseHeadingComponent from "@/components/maket/ClauseHeadingComponent.vue";
import FileSetComponent from "@/components/maket/files/FileSetComponent.vue";

export default {
  name: "FilesAdditionalComponent",
  components: {FileSetComponent, ClauseHeadingComponent},
  inject: ['appUrl', 'tokenName'],
  data() {
    return {
      searchInput: '',
      searchString: 'default',
      order: 'default',
      showUndeleted: false,
      fieldList: {
        'id': '',
        'name': 'название',
        'additional_file_name': 'имя файла',
        'order__order_number': 'номер заказа',
        'order__customer_name': 'клиент',
      },
      fileUrl: `${this.appUrl}files_additional_file`,
      deleteUrl: `${this.appUrl}files_additional_file_delete`,
      rowClass: {'additional-files': true}
    }
  },
  methods: {
    search() {
      if (this.searchInput !== '') {
        this.searchString = this.searchInput.replace(' ', '_');
      } else {
        this.searchString = 'default';
      }
    },
    hideDeletedChange(checked) {
      this.showUnDeleted = checked;
    },
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.files {
  @include brd-standard;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 6px 6px 12px $colorPrimary800;
  max-height: calc(100vh - 120px);
  grid-row: span 4;
  max-width: 1600px;
  grid-column: 1 / 5;
}
</style>
