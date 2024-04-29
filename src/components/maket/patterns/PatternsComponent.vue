<template>
  <div class="dict-block">
    <ClauseHeadingComponent
        :title="'Шаблоны'"
        :icon="'compass'"
        :font-class="{'font__normal': true}"
        :check-box-deleted="false"
        @search-string="search"
    />
    <TitlePatternComponent
        @show-form="showForm"
    />
    <PatternSetComponent :dictionaryName="dictionaryName"
                         :searchString="searchString"
                         :dictionaryOrder="order"
                         :show="show"
    />
  </div>
</template>

<script>
import TitlePatternComponent from "@/components/maket/patterns/TitlePatternomponent.vue";
import PatternSetComponent from "@/components/maket/patterns/PatternSetComponent.vue";
import ClauseHeadingComponent from "@/components/maket/ClauseHeadingComponent.vue";

export default {
  name: "PatternsComponent",
  components: {ClauseHeadingComponent, PatternSetComponent, TitlePatternComponent},
  data() {
    return {
      dictionaryName: 'Pattern',
      searchString: 'default',
      order: 'default',
      show: false,
      padding: false
    }
  },
  methods: {
    search(searchInput) {
      if (searchInput !== '') {
        this.searchString = searchInput //.replace(' ', '_');
      } else {
        this.searchString = 'default';
      }
    },
    showForm(data) {
      this.show = data;
    },
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.dict-block {
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
