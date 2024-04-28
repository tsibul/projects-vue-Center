<template>
  <div class="dict-block">
    <div class="dict-block__header active">
      <div>
        <font-awesome-icon :icon="['fas', 'compass-drafting']"/>&nbsp;
        Шаблоны
      </div>
      <div class="dict-block__search">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']"/>
        <input v-model="searchInput" type="text" class="form-input dict-block__form-input"
               placeholder="искать...">
        <button class="btn btn-save" type="button" @click="search">поиск</button>
        <button class="btn btn-close" type="button" @click="clearInput">очистить</button>
      </div>
    </div>
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
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import TitlePatternComponent from "@/components/maket/patterns/TitlePatternomponent.vue";
import PatternSetComponent from "@/components/maket/patterns/PatternSetComponent.vue";

export default {
  name: "PatternsComponent",
  components: {PatternSetComponent, TitlePatternComponent, FontAwesomeIcon},
  data() {
    return {
      dictionaryName: 'Pattern',
      searchInput: '',
      searchString: 'default',
      order: 'default',
      show: false,
      padding: false
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
    showForm(data) {
      this.show = data;
    },
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";
@import "@/assets/maket/scss/dictionary_sizes";

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

  &__header {
    background-color: $colorPrimary600;
    border-radius: 10px;
    @include d-flex-center(center);
    padding: 20px;
    justify-content: space-between;
  }

  &__search {
    align-items: center;
    @include d-flex-center('flex-end');
    gap: 10px;
  }

  &__form-input {
    min-width: 360px;
  }

  &__row {
    display: grid;
    align-items: center;
    gap: 10px;
    padding: 8px 8px;
    border-radius: 10px;
    cursor: pointer;
    flex-wrap: nowrap;

    &:not(.active):hover {
      background-color: $colorPrimary200;
    }
  }
}
</style>
