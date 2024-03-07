<script setup>

import {RouterLink} from "vue-router";
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
</script>

<template>
  <div class="menu__item mobile__show"><font-awesome-icon :icon="['fas', 'bars']" /></div>
  <div class="menu__left">
    <RouterLink to="/" class="menu__item">
      <font-awesome-icon :icon="['fas', 'arrows-to-circle']"/>
    </RouterLink>
    <div :class="{ 'menu__item': true, 'active': index === 0 }" v-for="(menuItem, index) in Object.keys(menuItems)"
         :key="index" @click="selectItem($event, menuItem)">{{ menuItem }}
    </div>
  </div>

</template>
<script>
export default {
  name: 'MenuLeftComponent',
  props: {
    menuItems: Object
  },
  data() {
    return {
      chosenItem: null
    };
  },
  methods: {
    selectItem(event, item) {
      const prevSelectedItem = document.querySelector('.menu__item.active');
      if (prevSelectedItem) {
        prevSelectedItem.classList.remove('active');
      }
      event.currentTarget.classList.add('active');
      this.selectedItem = item;
    }
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
