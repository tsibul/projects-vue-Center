<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import TitleRowComponent from "@/components/settings/TitleRowComponent.vue";
import DataRowSetComponent from "@/components/settings/DataRowSetComponent.vue";
</script>
<script>
export default {
  name: 'SettingsSingleComponent',
  props: {
    dictionaryName: String,
    label: String,
    icon: String,
    showNewRecord: Event,
  },
  data() {
    return {
      searchInput: '',
      searchString: 'default',
      order: 'default',
      show: false
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
    }
  },
  computed: {
    fieldsData() {
      return this.$store.getters.getFieldData;
    },
    dictBlockClass() {
      return {
        [this.dictionaryName.toLowerCase() + '-block']: true
      }
    },
    rowClass() {
      return {
        [this.dictionaryName.toLowerCase() + '-row']: true
      }
    },
  }
}
</script>


<template>
  <div class="dict-block" :class="dictBlockClass">
    <div class="dict-block__header active">
      <div>
        <font-awesome-icon :icon="['fas', icon]" class="fa fa-flip"/>
        {{ label }}
      </div>
      <div class="dict-block__search">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']"/>
        <input v-model="searchInput" type="text" class="form-input dict-block__form-input"
               placeholder="искать...">
        <button class="btn btn-save" type="button" @click="search">поиск</button>
        <button class="btn btn-close" type="button" @click="clearInput">очистить</button>
      </div>
    </div>
    <TitleRowComponent :dictionaryName="dictionaryName"
                       :rowClass="rowClass"
                       @show-form="showForm"
    />
    <DataRowSetComponent :dictionaryName="dictionaryName"
                         :rowClass="rowClass"
                         :searchString="searchString"
                         :dictionaryOrder="order"
                         :show="show"
    />
  </div>

</template>

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
  resize: both;

  &_adm {
    max-width: 100%;
  }

  &__header {
    background-color: $colorPrimary600;
    border-radius: 10px;
    @include d-flex-center(space-between);
    padding: 20px;
    width: 100%;
  }

  &__search {
    //align-items: center;
    @include d-flex-center(flex-end);
    gap: 10px;
    width: 80%;
  }

  &__form-input {
    width: 100%;
    max-width: 400px;
  }

  &__section {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    height: auto;
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

  &__text {
    width: 100%;
    font-weight: inherit;
  }

  &__adm {
    max-width: 100%;

    &_full {
      grid-column: span 4;
    }

    &_half {
      grid-column: span 2;
    }
  }
}

</style>
