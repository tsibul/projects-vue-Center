<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>
<script>
export default {
  data() {
    return {
      headerTitle: null,
      icons: {
        'Центр управления': '/center.svg',
        'Макеты': '/maket.ico',
        'Шаблон макета': '/maket_layout.svg'
      }
    }
  },
  methods: {
    receiveTitle(name) {
      this.headerTitle = name
      document.querySelector('head').querySelector('title').textContent = this.headerTitle
      document.querySelector('head').querySelector('link[rel="icon"]').href = this.icons[this.headerTitle]
    }
  },
  created() {
    document.querySelector('head').querySelector('title').textContent = this.headerTitle
    document.querySelector('head').querySelector('link[rel="icon"]').href = this.icons[this.headerTitle]
  }
}
</script>

<template>
  <title>{{headerTitle}}</title>


  <RouterView
    @header-title="receiveTitle"
  />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

#app, * {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}


</style>


