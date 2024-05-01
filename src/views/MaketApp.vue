<script setup>
import MenuComponent from "@/components/menu/MenuComponent.vue";
</script>

<template>
  <router-view></router-view>
  <MenuComponent :menuItems="menuItems"
                 @item-selected="handleItemSelected"
  />
  <div class="full-content">
    <div class="container">
      <component
          v-if="selectedComponent"
          :is="selectedComponent"/>
      <div v-else></div>
    </div>
  </div>
</template>

<script>
import OrderComponent from "@/components/maket/order/OrderComponent.vue";
import MaketComponent from "@/components/maket/maket/MaketComponent.vue";
import FilmComponent from "@/components/maket/film/FilmComponent.vue";
import PatternsComponent from "@/components/maket/patterns/PatternsComponent.vue";
import SettingsComponent from "@/components/settings/SettingsComponent.vue";
import FilesPatternsComponent from "@/components/maket/files/FilesPatternsComponent.vue";
import ErrorsComponent from "@/components/maket/error/ErrorsComponent.vue";
import {mapState, mapMutations} from 'vuex';
import axios from "axios";
import {markRaw} from "vue";
import FilesAdditionalComponent from "@/components/maket/files/FilesAdditionalComponent.vue";

export default {
  name: 'MaketApp',
  provide() {
    return {
      appUrl: 'http://127.0.0.1:5200/maket5_0/',
      tokenName: 'maketUserToken'
    };
  },
  data() {
    return {
      menuItems: {'Вход не выполнен': ['']},
      defaultItems: {
        'Заказы': [markRaw(OrderComponent)],
        'Макеты': [markRaw(MaketComponent)],
        'Пленки': [markRaw(FilmComponent)],
        'Шаблоны': [markRaw(PatternsComponent)],
        'Настройки': [markRaw(SettingsComponent)],
        'Очистка': [
          {'Файлы шаблонов': markRaw(FilesPatternsComponent)},
          {'Дополнительные файлы': markRaw(FilesAdditionalComponent)}
        ],
        'Ошибки': [markRaw(ErrorsComponent)]
      },
      selectedItem: 'Вход не выполнен',
      subItem: null,
      selectedComponent: null,
    }
  },
  created() {
    (async () => {
      await this.setUser();
      if (this.$store.getters.getUser) {
        this.menuItems = this.defaultItems;
      }
    })();
    (async () => {
      await this.setFieldsStructure();
    })();
  },
  methods: {
    ...mapMutations(['setUser']),

    handleItemSelected(selectedItem) {
      this.selectedComponent = null;
      if (!selectedItem[1]) {
        this.selectedItem = selectedItem[0];
        this.selectedComponent = this.menuItems[this.selectedItem][0]
      } else {
        const componentArr = this.menuItems[selectedItem[0]];
        this.selectedComponent = componentArr.find((item) => Object.keys(item)[0] === selectedItem[1])[selectedItem[1]];
      }
      console.log()
    },

    async setUser() {
      const token = localStorage.getItem('maketUserToken');
      if (token) {
        const statusUrl = 'http://127.0.0.1:5200/maket5_0/accounts/log_status/';
        const userResponse = await axios.get(statusUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        this.$store.commit('setUser', userResponse.data);
      } else {
        return null
      }
    },
    async setFieldsStructure() {
      const token = localStorage.getItem('maketUserToken');
      if (token) {
        const fieldsUrl = 'http://127.0.0.1:5200/maket5_0/settings/fields/';
        const userResponse = await axios.get(fieldsUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        this.$store.commit('setFieldData', userResponse.data);
      } else {
        return null
      }
    },

    handleUserChange() {
      this.currentUser = this.$store.getters.getUser;
      if (this.currentUser) {
        this.menuItems = this.defaultItems;
        this.selectedItem = 'Заказы';
      } else {
        this.menuItems = {'Вход не выполнен': ['']};
      }
    },
  },
  computed: {
    ...mapState(['user']),
  },
  watch: {
    user: 'handleUserChange',
  },
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
  font-family: "Montserrat", sans-serif;
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
  background-color: $colorSecondary200;
  min-height: calc(100vh);
  padding-top: 80px;
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
      //box-shadow: 6px 6px 12px $colorPrimary800;
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

  &-neutral {
    background-color: $colorNeutral700;
    border-color: $colorNeutral700;

    &:hover {
      color: $colorNeutral700;
      background-color: transparent;
    }

  }
}

////
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

@media print
{
  .no-print, .no-print *
  {
    display: none !important;
  }
}

</style>

