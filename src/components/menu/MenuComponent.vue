<script setup>

import MenuLeftComponent from '@/components/menu/MenuLeftComponent.vue'
import MenuRightComponent from '@/components/menu/MenuRightComponent.vue'
</script>

<template>
  <div class="menu-show">
<!--    <font-awesome-icon :icon="['fas', 'bars']" />-->
    Меню
    <header class="header header__hidden">
      <div class="container">
        <menu class="menu">
          <MenuLeftComponent
            :menuItems="menuItems"
            @item-selected="handleItemSelected" />
          <MenuRightComponent />
        </menu>
      </div>
    </header>
  </div>
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
    menuItems: Object
  },
  methods: {
    handleItemSelected(selectedItem) {
      this.selectedItem = selectedItem
      this.$emit('item-selected', this.selectedItem)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/maket/scss/vars';
@import '@/assets/maket/scss/mixins';

.menu-show {
  @include brd-standard;
  border-color: transparent;
  color: $colorPrimary50;
  position: fixed;
  top: 2px;
  z-index: 15;
  //font-weight: 600;
  padding: 19px 8px;
  left: calc((100vw - 1600px) / 2 - 72px);
  background-color: $colorSecondary400;
  //font-size: 38px;
  //padding: 6px 12px;
  //left: calc((100vw - 1600px) / 2 - 64px);

  &:hover .header__hidden {
    display: block;
  }
}

.header__hidden {
  display: none;
  top: 0;
  left: 0;
}

@media (max-width: 1600px) {
  .menu-show {
    left: 8px;
  }
}

</style>
