<template>
  <div class="file-row active"
       :class="rowClass">
    <div
        v-for="field in Object.keys(fieldList)"
        :key="field"
        v-show="field !== 'id'">
      {{ fieldList[field] }}
    </div>
    <button class="btn btn-close"
            @click="deleteAll">удалить все
    </button>
  </div>
  <DeleteAlertComponent
      v-if="showDeleteAlert"
      @closeForm="showDeleteAlert=false"
      @deleted="handleDeleted"
      :deleteUrl="deleteUrl"
  />
</template>

<script>
import DeleteAlertComponent from "@/components/delete_alert/DeleteAlertComponent.vue";

export default {
  name: "FilesTitleComponent",
  components: {DeleteAlertComponent},
  inject: ['tokenName', 'appUrl'],
  emits:['all-deleted'],
  props: {
    fieldList: Object,
    fileUrl: String,
    rowClass: Object,
    deleteAllUrl: String
  },
  data() {
    return {
      showDeleteAlert: false,
      deleteUrl: null,
    }
  },
  methods: {
    handleDeleted(allDeleted) {
      if (allDeleted.deleted) {
        this.$emit('all-deleted')
      }
      this.showDeleteAlert = false;
      this.deleteUrl = null;
    },
    deleteAll() {
      this.deleteUrl = `${this.deleteAllUrl}`;
      this.showDeleteAlert = true;
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/dictionary_sizes";

.file-row {
  display: grid;
  margin-right: 19px;
  align-items: center;
  gap: 10px;
  padding: 8px 8px;
  border-radius: 10px;
  flex-wrap: nowrap;
}
</style>
