<script setup>

import SettingsLeftComponent from "@/components/settings/SettingsLeftComponent.vue";
import SettingsRightComponent from "@/components/settings/SettingsRightComponent.vue";
</script>

<template>
  <div class="dict-main">
    <SettingsLeftComponent @dictChecked="receivedCheck"/>
    <SettingsRightComponent :checkedData="chosenDictionary"/>
  </div>

</template>

<script>
export default {
  name: 'SettingsComponent',
  data (){
    return {
      user: this.$store.getters.getUser,
      chosenDictionary: null,
    }
  },
  methods: {
    receivedCheck (data){
      this.chosenDictionary = data;
    },
  }
}
</script>

<style scoped lang="scss">
.dict-main {
  display: flex;
}
</style>
