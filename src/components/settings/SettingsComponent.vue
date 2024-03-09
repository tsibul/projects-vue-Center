<script setup>

import SettingsLeftComponent from "@/components/settings/SettingsLeftComponent.vue";
import SettingsRightComponent from "@/components/settings/SettingsRightComponent.vue";
</script>

<template>
  <div class="dict-main">
    <SettingsLeftComponent />
    <SettingsRightComponent />
  </div>

</template>

<script>
export default {
  name: 'SettingsComponent',
  data (){
    return {
      user: this.$store.getters.getUser
    }
  }
}
</script>

<style scoped lang="scss">
.dict-main {
  display: flex;
}
</style>
