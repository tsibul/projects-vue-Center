<script setup>
</script>

<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'MaketMainApp',
  provide() {
    return {
      appUrl: 'http://127.0.0.1:5200/maket5_0/',
      tokenName: 'maketUserToken'
    }
  }
}
</script>


<style lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

#app, menu {
  padding-inline-start: 0;
  padding: 0;
  margin: 0;
  color: $colorPrimary900;
  box-sizing: border-box;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
}

.container {
  max-width: 1600px;
  margin: 0 auto;
}

.full-content {
  background-color: $colorSecondary100;
  min-height: calc(100vh);
  //padding-top: 2px;
}

.btn {
  border: 1px solid;
  padding: 8px;
  border-radius: 10px;
  font-size: 16px;
  background-color: transparent;
  cursor: pointer;
  color: $colorSecondary100;
  transition: all 0.3s ease-out;

  & i {
    color: inherit;
  }

  &-save {
    background-color: $colorPrimary500;
    border-color: $colorPrimary500;

    &:hover {
      color: $colorPrimary500;
      background-color: transparent;
    }
  }

  &-save-inverted {
    color: $colorPrimary500;
    background-color: $colorPrimary100;
    border-color: $colorPrimary500;

    &:hover {
      color: $colorPrimary100;
      background-color: $colorPrimary500;
    }
  }

  &-close {
    background-color: $colorSecondary600;
    border-color: $colorSecondary600;

    &:hover {
      color: $colorSecondary600;
      background-color: transparent;
    }
  }

  &-close-inverted {
    color: $colorSecondary600;
    background-color: $colorSecondary100;
    border-color: $colorSecondary600;

    &:hover {
      color: $colorSecondary100;
      background-color: $colorSecondary600;
    }
  }

  &-neutral {
    background-color: $colorNeutral700;
    border-color: $colorNeutral700;

    &:hover {
      color: $colorNeutral700;
      background-color: transparent;
    }
  }

  &-neutral-inverted {
    color: $colorNeutral700;
    background-color: $colorNeutral100;
    border-color: $colorNeutral700;

    &:hover {
      color: $colorNeutral100;
      background-color: $colorNeutral700;
    }
  }
}

.header {
  position: fixed;
  width: 100%;
  background-color: $colorPrimary400;
  z-index: 20;
  cursor: pointer;
}

.menu {
  display: flex;
  justify-content: space-between;

  &__left {
    display: flex;
    transition: all 0.4s ease-in;
  }

  &__right {
    display: flex;
  }

  &__mobile {
    display: none;
  }

  &__item {
    color: $colorPrimary800;
    padding: 20px 10px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 10px;
    margin: 4px;
    transition: all 0.2s ease-out;

    &:hover {
      color: $colorPrimary800;
      background-color: $colorPrimary200;
      box-shadow: 4px 4px 8px $colorPrimary800;
    }
  }
}

.visible {
  display: block;
}

.id-hidden {
  display: none;
}

.active {
  font-weight: 600;
}

.inactive {
  opacity: 0.5;
}

.fa {
  padding: 0 4px;
  height: 12px;

  &-arrows-to-circle {
    color: $colorPrimary800;
  }
}

.checkbox-out {
  display: none;
}

.form {
  &-row {
    display: grid;
    grid-column: 1/ -1;
    align-items: center;
    gap: 10px;
    width: 100%;

    &__double {
      grid-column: span 2;
    }
  }

  &-select {
    margin-bottom: 6px;
    @include brd-standard;
    font-size: 16px;
    padding: 8px 6px;
    background-color: $colorSecondary100;
  }

  &-input {
    @include brd-standard;
    padding: 8px 4px;
    background-color: $colorSecondary100;

    &_stop {
      width: 100%;
    }

    &__inactive {
      opacity: 0.5;
    }
  }
}

.font {
  &__normal {
    font-size: 16px;
  }

  &__15 {
    font-size: 15px;
  }

  &__14 {
    font-size: 14px;
  }
}

.search-block {
  @include d-flex-center('flex-end');
  gap: 10px;

  &__form-input {
    min-width: 390px;
  }
}

.hide-deleted {
  font-size: 15px;
  font-weight: normal;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
  accent-color: $colorPrimary800;
}

.check {
  accent-color: $colorPrimary500;
  cursor: pointer;
  max-height: 0.8rem;
}

.tooltip {
  position: relative;

  &:hover .tooltip-text {
    visibility: visible;
    //opacity: 0;
    //transition-delay: 0s, 0.5s;
  }
}


.tooltip-text {
  font-size: 16px;
  position: absolute;
  visibility: hidden;
  color: white;
  background-color: $colorSecondary400;
  @include brd-standard;
  border-color: $colorSecondary400;
  //opacity: 1;
  transition: visibility 0.1s ease-out;
  //opacity 0.5s ease-out;
  padding: 4px 8px;
  top: -2.5rem;
  z-index: 10;
  max-width: 300px;
}

@media (max-width: 767px) {
  .menu {
    padding: 0 10px;
    position: relative;

    &__item {
      padding: 10px 10px 10px 10px;
    }

    &__left {
      display: none;

      &:hover {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 43px;
        border: 1px transparent solid;
        border-radius: 10px;
        background-color: $colorSecondary200;
      }
    }

    &__mobile {
      display: block;
      padding-right: 108px;

      &:hover + .menu__left {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 44px;
        border: 1px transparent solid;
        border-radius: 10px;
        background-color: $colorSecondary400;
      }
    }
  }
}

@media print {
  .no-print, .no-print * {
    display: none !important;
  }
}

</style>

