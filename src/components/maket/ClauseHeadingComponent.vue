<template>
  <div class="dict-block__header active" :class="fontClass">
    <div>
      <font-awesome-icon :icon="['far', icon]"/>&nbsp;
      {{ title }}
    </div>
    <div class="dict-block__search">
      <div class="hide-deleted" v-if="checkBoxDeleted">
        <input type="checkbox" id="hideDeleted"
               :checked="checkBoxStatus"
               @change="hideDeletedChecked">
        <label for="hideDeleted">{{ checkBoxDeletedText }}</label>
      </div>
      <font-awesome-icon :icon="['fas', 'magnifying-glass']"/>
      <input v-model="searchInput" type="text" class="form-input dict-block__form-input"
             placeholder="искать...">
      <button class="btn btn-save" type="button" @click="search">поиск</button>
      <button class="btn btn-close" type="button" @click="clearInput">очистить</button>
    </div>
  </div>

</template>

<script>
export default {
  name: "ClauseHeadingComponent",
  emits: ['search-string', 'hide-deleted-change'],
  props: {
    title: String,
    icon: String,
    fontClass: Object,
    checkBoxDeleted: Boolean,
    checkBoxDeletedText: String,
    checkBoxStatus: Boolean,
  },
  data() {
    return {
      searchInput: '',
      checked: this.checkBoxStatus,
    }
  },
  methods: {
    clearInput() {
      this.searchInput = '';
    },
    search(){
      this.$emit('search-string', this.searchInput);
    },
    hideDeletedChecked() {
      this.checked = !this.checked;
      this.$emit('hide-deleted-change', this.checked);
    }
  },

}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.dict-block {

  &__header {
    background-color: $colorPrimary300;
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
}

</style>
