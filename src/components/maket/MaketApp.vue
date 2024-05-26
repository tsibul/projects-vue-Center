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
  emits: ['header-title'],
  provide() {
    return {
      appUrl: 'http://127.0.0.1:5200/maket5_0/',
      tokenName: 'maketUserToken'
    };
  },
  data() {
    return {
      menuItems: {'Вход не выполнен': ['']},
      headerTitle: 'Макеты',
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
      this.$emit('header-title', this.headerTitle)
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

* {
  font-family: 'Montserrat', sans-serif;
}
</style>

