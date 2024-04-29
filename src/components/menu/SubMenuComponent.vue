<template>
  <div class="menu__item submenu"
       @mouseenter="subMenuOpen"
       @mouseleave="subMenuClose"
  >
    {{ menuItem }}
    <div class="submenu__list" v-show="isOpen">
      <div class="submenu__item"
           v-for="item in subMenuItems"
           :key="item.id"
           @click="subMenuItemSelect($event, item)"
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
    menuItems: Object,
  },
  data() {
    return {
      subMenuItems: [],
      isOpen: false,
    }
  },
  created() {
    this.subMenuItems = this.menuItems[this.menuItem];
  },
  methods: {
    subMenuItemSelect(event, item) {
      this.$emit("select-subitem", Object.keys(item)[0]);
      event.target.closest(".submenu").classList.add('active');
      this.subMenuClose();
    },
    subMenuOpen() {
      this.isOpen = true;
    },
    subMenuClose() {
      this.isOpen = false;
    }
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.submenu {
  position: relative;

  &__list {
    @include brd-standard;
    position: absolute;
    left: -6px;
    top: 56px;
    background-color: $colorPrimary100;
    box-shadow: 4px 4px 8px $colorPrimary800;
  }

  &__item {
    border: 0.5px solid transparent;
    border-radius: 10px;
    padding: 16px 8px;
    text-wrap: nowrap;
    font-weight: normal;

    &:hover {
      background-color: $colorPrimary200;
    }
  }
}

</style>
