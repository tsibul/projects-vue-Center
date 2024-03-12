<script setup>

import SettingsLeftSingleComponent from "@/components/settings/SettingsLeftSingleComponent.vue";
</script>

<template>
  <div class="dict-menu">
    <details class="dict-menu__details" v-for="clause in menuStructure" :key="clause.id">
      <summary class="dict-menu__header">{{ clause.name }}</summary>
      <SettingsLeftSingleComponent v-for="dictionary in clause.contents" :key="dictionary.id"
      :dictionary="dictionary" :icon="clause.iconUrl" @dictChecked="receivedCheck"/>
    </details>

  </div>
</template>

<script>
import {fetchData} from "@/components/services/fetchData.js";

export default {
  name: 'SettingsLeftComponent',
  inject: ['appUrl'],
  data() {
    return {
      menuStructure: null,
      flip: false,
      dictChecked: null
    }
  },
  created() {
    (async () => {
      await this.getStructure();

    })();
  },

  methods: {
    receivedCheck (data){
      this.dictChecked = data;
      this.$emit('dictChecked', data);
    },
    async getStructure() {
      const tokenName = 'maketUserToken';
      const statusUrl = this.appUrl + 'settings/structure/';
      this.menuStructure = await fetchData(statusUrl, tokenName)
    },
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
}

</style>
