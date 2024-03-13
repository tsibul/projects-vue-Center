<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import TitleRowComponent from "@/components/settings/TitleRowComponent.vue";
import DataRowSetComponent from "@/components/settings/DataRowSetComponent.vue";
import SettingsFormRowComponent from "@/components/settings/SettingsFormRowComponent.vue";
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
                       :fieldsData="fieldsData"
                       :rowClass="rowClass"
                       @showNewRecord="handleShowNewRecord"/>
    <SettingsFormRowComponent v-if="showNewRecord"
                              :dictionaryName="dictionaryName"
                              :dictionaryFields="fieldsData[dictionaryName]"
                              :rowClass="rowClass"/>
    <DataRowSetComponent :dictionaryName="dictionaryName"
                         :fieldsData="fieldsData"
                         :rowClass="rowClass"
                         :searchString="searchString"
                         :dictionaryOrder="order"/>
  </div><!-- цвета -->

</template>

<script>
export default {
  name: 'SettingsSingleComponent',
  props: {
    dictionaryName: String,
    label: String,
    icon: String,
  },
  data() {
    return {
      showNewRecord: false,
      searchInput: '',
      searchString: 'default',
      order: 'default'
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
    handleShowNewRecord() {
      this.showNewRecord = true;
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
    // eslint-disable-next-line vue/return-in-computed-property
  }
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
  //height: 770px;
  max-height: calc(100vh - 120px);
  grid-row: span 4;

  &_adm {
    max-width: 100%;
  }

  &__header {
    background-color: $colorPrimary600;
    border-radius: 10px;
    @include d-flex-center(center);
    //cursor: pointer;
    padding: 20px;
    justify-content: space-between;
  }

  &__search {
    align-items: center;
    @include d-flex-center('flex-end');
    gap: 10px;
  }

  &__form-input {
    min-width: 260px;
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

    //&_hidden {
    //  display: none;
    //}
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


    //&[open] {
    //  max-height: calc(100vh - 120px);
    //}
  }
}

</style>
