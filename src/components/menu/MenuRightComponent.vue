<script setup>

import AuthComponent from "@/components/auth/AuthComponent.vue";
</script>

<template>
  <nav class="menu__right">
    <AuthComponent  />
    <div class="menu__item">Макеты&nbsp;v5.0.0</div>
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
