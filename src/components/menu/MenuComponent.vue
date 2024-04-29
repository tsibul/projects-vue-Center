<script setup>

import MenuLeftComponent from "@/components/menu/MenuLeftComponent.vue";
import MenuRightComponent from "@/components/menu/MenuRightComponent.vue";
</script>

<template>
  <header class="header">
    <div class="container">
      <menu class="menu">
        <MenuLeftComponent
            :menuItems="menuItems"
            @item-selected="handleItemSelected"/>
        <!--        <MenuRightComponent :currentUser="currentUser" />-->
        <MenuRightComponent/>
      </menu>
    </div>
  </header>
</template>
<script>
export default {
  name: 'MenuComponent',
  data() {
    return {
      selectedItem: 'Вход не выполнен'
    }
  },
  props: {
    menuItems: Object,
  },
  methods: {
    handleItemSelected(selectedItem) {
      this.selectedItem = selectedItem;
      this.$emit('item-selected', this.selectedItem);
    }
  }
}
</script>

<style scoped lang="scss">

</style>
