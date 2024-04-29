<template>
  <div class="file-row"
       :class="rowClass">
    <div
        v-for="field in Object.keys(file)"
        :key="field"
        v-show="field !== 'id'">
      {{ file[field] }}
    </div>
    <button class="btn btn-close"
            @click="deleteFile(file['id'])">удалить
    </button>
  </div>

</template>

<script>
export default {
  name: "FileSingleComponent",
  emits: ['delete-file'],
  props:{
    file: Object,
    rowClass: Object,
  },
  methods:{
    deleteFile(fileId){
      this.$emit('delete-file', fileId);
    },
  },
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
