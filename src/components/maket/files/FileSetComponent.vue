<template>
  <FilesTitleComponent
      :field-list="fieldList"
      :file-url="fileUrl"
      :row-class="rowClass"
  />
  <DeleteAlertComponent
      v-if="showDeleteAlert"
      @closeForm="showDeleteAlert=false"
      @deleted="handleDeleted"
      :deleteUrl="deleteUrl"
  />
</template>

<script>
import DeleteAlertComponent from "@/components/delete_alert/DeleteAlertComponent.vue";
import FilesTitleComponent from "@/components/maket/files/FilesTitleComponent.vue";

export default {
  name: "FileSetComponent",
  components: {FilesTitleComponent, DeleteAlertComponent},
  inject: ['tokenName', 'appUrl'],
  props: {
    searchString: String,
    order: String,
    showUnDeleted: Boolean,
    fieldList: Object,
    fileUrl: String,
    forDeleteUrl: String,
    rowClass: Object
  },
  data() {
    return {
      showDeleteAlert: false,
      deleteUrl: null,
    }
  },
  methods: {
    handleDeleted() {
    },
  }
}
</script>

<style scoped lang="scss">

</style>
