<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<template>
  <div class="dict-menu__item">
    <input type="checkbox" class="checkbox-out" :id="dictionary.class"
           @change="chooseDictionary(dictionary, $event.target, icon)">
    <label :for="dictionary.class">
      <font-awesome-icon :icon="['fas', icon]" :class="{ 'fa': true, 'fa-flip': flip }"/>&nbsp;{{
        dictionary.name
      }}</label>
  </div>
</template>

<script>

export default {
  name: 'SettingsLeftSingleComponent',
  props: {
    dictionary: Object,
    icon: String,
  },
  data() {
    return {
      flip: false,
    }
  },
  methods: {
    chooseDictionary(dictionary, target, icon) {
      this.$emit('dictChecked', {
        'dictionaryName': dictionary.class,
        'dictionaryLabel': dictionary.name,
        'icon': icon,
        'checked': target.checked
      });
      const labelElement = target.nextElementSibling;
      labelElement.classList.toggle('active');
      this.flip = target.checked;
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.dict-menu {
  &__item {
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 10px;
    //background-color: $colorSecondary100;
    font-size: 16px;
    text-align: start;

    & label {
      padding: 16px 10px 16px 20px;
      display: flex;
      align-items: center;
    }

    &:hover {
      font-weight: bold;
      background-color: $colorPrimary200;
    }
  }

}

</style>
