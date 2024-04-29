<template>
  <div class="files">
    <ClauseHeadingComponent
        :title="'Файлы шаблонов'"
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
        :showUnDeleted="showUnDeleted"
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
  name: "FilesPatternsComponent",
  components: {FileSetComponent, ClauseHeadingComponent},
  inject: ['appUrl', 'tokenName'],
  data() {
    return {
      searchInput: '',
      searchString: 'default',
      order: 'default',
      showUnDeleted: false,
      fieldList: {
        'id': '',
        'name': 'название',
        'file__name': 'имя файла',
        'good__article': 'артикул',
        'good__name': 'продукция',
      },
      fileUrl: `${this.appUrl}files_pattern`,
      deleteUrl: `${this.appUrl}files_pattern_delete`,
      rowClass: {'pattern-files': true}
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
