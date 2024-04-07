<script setup>

import SettingsSingleComponent from "@/components/settings/SettingsSingleComponent.vue";
</script>

<template>
  <div class="dict-right">
    <SettingsSingleComponent v-for="item in dictionariesReady"
                             :key="item['name']"
                             :style="showState[item]['checked'] ? 'display:flex' : 'display:none'"
                             :dictionaryName="item" :icon="showState[item]['icon']"
                             :label="showState[item]['label']"
    />
  </div>
</template>

<script>

export default {
  name: 'SettingsRightComponent',
  data() {
    return {
      showState: {},
      dictionariesReady: []
    }
  },
  props: {
    checkedData: Object,
  },
  computed: {
    fieldsData() {
      return this.$store.getters.getFieldData;
    },
  },
  created() {
    this.showDictState();
  },
  watch: {
    checkedData: {
      handler: 'handleCheckedDataChange',
      deep: true,
    },
  },
  methods: {
    showDictState() {
      Object.keys(this.fieldsData).forEach((key) => {
        this.showState[key] = {'checked': false, 'ready': false};
      });
    },
    handleCheckedDataChange(newCheckedData) {
      const {dictionaryName, dictionaryLabel, icon, checked} = newCheckedData;
      const state = this.showState[dictionaryName]['ready'];

      if (checked && !state) {
        this.showState[dictionaryName] = {'checked': true, 'ready': true, 'label': dictionaryLabel, 'icon': icon};
        this.dictionariesReady.push(dictionaryName);
        // this.dictionariesReady.sort()
      } else this.showState[dictionaryName]['checked'] = !(!checked && state);
    },
  },
}
</script>

<style scoped lang="scss">

.dict-right {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-auto-flow: dense;
  gap: 20px;
  width: 100%;
}

.hidden{
  display: none;
}

</style>
