<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<template>
  <div class="dict-menu">
    <details class="dict-menu__details" v-for="clause in menuStructure" :key="clause.id">
      <summary class="dict-menu__header">{{ clause.name }}</summary>
      <div class="dict-menu__item" v-for="dictionary in clause.contents" :key="dictionary.id">
        <input type="checkbox" class="checkbox-out" :id="dictionary.class"
               @change="chooseDictionary(dictionary, $event.target, clause.iconUrl)">
        <label :for="dictionary.class" >
          <font-awesome-icon :icon="['fas', clause.iconUrl]" class="fa-flip"/>&nbsp;{{ dictionary.name }}</label>
      </div>
    </details>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'SettingsLeftComponent',
  inject: ['appUrl'],
  data() {
    return {
      menuStructure: null
    }
  },
  created() {
    (async () => {
      await this.getStructure();

    })();
  },

  methods: {
    async getStructure() {
      const token = localStorage.getItem('maketUserToken');
      if (token) {
        const statusUrl = this.appUrl + 'settings/structure/';
        const userResponse = await axios.get(statusUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        this.menuStructure = userResponse.data;
      } else {
        return null
      }
    },
    chooseDictionary(dictionary, target, icon) {
      this.$emit('dictChecked', {
        'dictionaryName': dictionary.class,
        'dictionaryLabel': dictionary.name,
        'icon': icon,
        'checked': target.checked
      });
      const labelElement = target.nextElementSibling;
      labelElement.classList.toggle('active');
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.dict-menu {
  border: 1px solid $colorPrimary800;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 240px;
  margin-right: 20px;
  height: fit-content;

  &__details {
    max-height: 64px;
    transition: max-height 0.3s ease-in-out;

    &[open] {
      max-height: 360px;
    }
  }

  &__header {
    padding: 16px 10px;
    border: 1px solid transparent;
    border-radius: 10px;
    text-align: start;
    transition: scaleY 0.2s ease, font-weight 0.2s ease;
    width: 100%;
    cursor: pointer;

    &:hover {
      transform: scaleY(1.03);
      font-weight: bold;
      background-color: $colorPrimary200;
    }
  }

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

    & i {
      font-size: 10px;
    }

    &:hover {
      font-weight: bold;
      background-color: $colorPrimary200;
    }
  }

}

</style>
