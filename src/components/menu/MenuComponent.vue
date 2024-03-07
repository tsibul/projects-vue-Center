<script setup>

import MenuLeftComponent from "@/components/menu/MenuLeftComponent.vue";
import MenuRightComponent from "@/components/menu/MenuRightComponent.vue";
</script>

<template>
  <header class="header">
    <div class="container">
      <menu class="menu">
        <MenuLeftComponent :menuItems="menuItems"/>
<!--        <MenuRightComponent :currentUser="currentUser" />-->
        <MenuRightComponent />
      </menu>
    </div>
  </header>
</template>
<script>
export default {
  name: 'MenuComponent',
  props: {
    menuItems: Object,
    // currentUser: Object
  }
}
</script>

<style scoped lang="scss">

</style>
