<template>
  <ClauseHeadingComponent
      :title="'Файлы'"
      :icon="'file'"
      :font-class="{'font__normal': true}"
      :check-box-deleted="true"
      :check-box-deleted-text="'скрыть не удаленные'"
      @search-string="search"
  />
</template>

<script >
import ClauseHeadingComponent from "@/components/maket/ClauseHeadingComponent.vue";

export default {
  name: "FilesComponent",
  components: {ClauseHeadingComponent},
  inject: ['appUrl', 'tokenName'],
  data() {
    return {
      dictionaryName: 'Pattern',
      searchInput: '',
      searchString: 'default',
      order: 'default',
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
    clearInput() {
      this.searchInput = '';
    },
  },
}
</script>

<style scoped lang="scss">

</style>
