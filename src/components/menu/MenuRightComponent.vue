<script setup>

import AuthComponent from "@/components/auth/AuthComponent.vue";
import AppVersionComponent from "@/components/maket/AppVersionComponent.vue";
</script>

<template>
  <nav class="menu__right">
    <AuthComponent/>
    <AppVersionComponent/>
  </nav>
</template>

<script>
export default {
  name: 'MenuComponent',
  // props: {
  //   currentUser: Object,
  // }
}
</script>

<style scoped lang="scss">

</style>
