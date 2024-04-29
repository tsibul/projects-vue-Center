<script setup>

import {RouterLink} from "vue-router";
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import SubMenuComponent from "@/components/menu/SubMenuComponent.vue";
</script>

<template>
  <div class="menu__item mobile__show">
    <font-awesome-icon :icon="['fas', 'bars']"/>
  </div>
  <div class="menu__left">
    <RouterLink to="/" class="menu__item">
      <font-awesome-icon :icon="['fas', 'arrows-to-circle']"/>
    </RouterLink>
    <div
        v-for="(menuItem, index) in Object.keys(menuItems)"
        :key="index">
      <div v-if="menuItems[menuItem].length === 1"
          :class="{ 'menu__item': true, 'active': index === 0 }"
          @click="selectItem($event, menuItem)">{{ menuItem }}
      </div>
      <SubMenuComponent
          v-else
          @select-subitem="selectSubItem($event, menuItem)"
          :menuItem="menuItem"
          :menuItems="menuItems"
      />
    </div>
  </div>

</template>
<script>
export default {
  name: 'MenuLeftComponent',
  props: {
    menuItems: Object
  },
  emits: ['item-selected'],
  data() {
    return {
      selectedItem: null,
      submenuSelectedItem: null,
    };
  },
  methods: {
    selectItem(event, item) {
      const prevSelectedItem = document.querySelector('.menu__left').querySelector('.menu__item.active');
      if (prevSelectedItem) {
        prevSelectedItem.classList.remove('active');
      }
      event.currentTarget.classList.add('active');
      this.selectedItem = item;
      this.$emit('item-selected', [this.selectedItem]);
    },
    selectSubItem(subItem, menuItem) {
      const prevSelectedItem = document.querySelector('.menu__left').querySelector('.menu__item.active');
      if (prevSelectedItem) {
        prevSelectedItem.classList.remove('active');
      }
      this.selectedItem = menuItem;
      this.submenuSelectedItem = subItem;
      this.$emit('item-selected', [this.selectedItem, this.submenuSelectedItem]);
    },
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";


.mobile {
  &__show {
    display: none;
  }

  &__hide {
    display: inline;
  }
}


@media (max-width: 767px) {
  .mobile {
    &__show {
      display: block;
    }

    &__hide {
      display: none;
    }
  }
}


</style>
