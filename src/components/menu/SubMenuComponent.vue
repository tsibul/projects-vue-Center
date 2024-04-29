<template>
  <div :class="{ 'menu__item': true, 'submenu': true, 'active': isActive }">
    {{ menuItem }}
    <div class="submenu__list">
      <div class="submenu__item"
           v-for="item in subMenuItems"
           :key="item.id"
           @click="subMenuItemSelect(item)"
      >
        {{ Object.keys(item)[0] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubMenuComponent",
  emits: ['select-subitem'],
  props: {
    menuItem: String,
    menuItems: Object
  },
  data() {
    return {
      subMenuItems: [],
      isActive: false
    }
  },
  created() {
    this.subMenuItems = this.menuItems[this.menuItem];
  },
  methods: {
    subMenuItemSelect(item) {
      this.$emit("select-subitem", Object.keys(item)[0]);
      this.isActive = true
    }
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.submenu {
  position: relative;

  &:hover &__list {
    display: block;
  }

  &__list {
    @include brd-standard;
    position: absolute;
    display: none;
    left: -6px;
    top: 56px;
    background-color: $colorPrimary100;
  }

  &__item {
    border: 0.5px solid transparent;
    border-radius: 10px;
    padding: 16px 8px;
    text-wrap: nowrap;

    &:hover {
      background-color: $colorPrimary200;
    }

  }
}

</style>
