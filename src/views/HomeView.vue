<script setup>
import { RouterLink } from 'vue-router'
</script>
<script>
export default {
  name: 'HomeView',
  emits: ['header-title'],
  data() {
    return {
      currentTitle: null
    }
  }, methods: {
    selectLink(name) {
      this.currentTitle = name
      this.$emit('header-title', this.currentTitle)
    }
  },
  mounted() {
    if (!this.currentTitle) {
      this.selectLink('Центр управления')
    }
  }
}
</script>


<template>
  <body>
  <div class="content">
    <nav class="link-box">
      <a href="http://10.0.1.17/rzv" class="link-box__element link-box__element_razvozka">
        <div>Развозка</div>
      </a>
      <RouterLink
        to="/maket"
        class="link-box__element link-box__element_maket"
        @click="selectLink('Макеты')"
      >Макет
      </RouterLink>
      <a href="http://10.0.1.17/production" class="link-box__element link-box__element_plan">
        <div>Производство</div>
      </a>
      <a href="https://gkxp.kaiten.ru/space/142678" class="link-box__element link-box__element_kanban">
        <div>1C Канбан</div>
      </a>
      <a href="https://tsigel.amocrm.ru/" class="link-box__element link-box__element_amo">
        <div class="color-light">AMO CRM</div>
      </a>
      <a href="http://10.0.1.17/marketing" class="link-box__element link-box__element_marketing">
        <div class="color-light">Маркетинг</div>
      </a>
      <a href="https://vikivostok.kaiten.ru/space/141787" class="link-box__element link-box__element_tech-dir">
        <div class="color-light">Операционный директор</div>
      </a>
    </nav>
  </div>
  <!--  <nav>-->
  <!--    <RouterLink to="/">Home</RouterLink>-->
  <!--    <RouterLink to="/maket">Maket</RouterLink>-->
  <!--  </nav>-->
  <!--  <RouterView hidden/>-->
  </body>
</template>

<style lang="scss" scoped>
@import "@/assets/main/scss/vars";
@import "@/assets/main/scss/mixins";

@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  color: $colorPrimary900;
  font-family: 'Montserrat', sans-serif;
}

.content {
  height: 100vh;
  width: 100vw;
  background-image: url('@/assets/main/image/bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
}

.link-box {
  width: 100vw;
  padding: 60px;
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  height: 90%;

  &__element {
    @include d-flex-center(center);
    font-size: 28px;
    text-decoration: none;
    text-align: center;
    min-height: 160px;
    @include brd-standard;
    padding: 0 60px;
    box-shadow: 8px 8px 16px $colorPrimary800;
    transition: transform 0.3s ease;

    &_razvozka {
      background-color: $colorPrimary400;
    }

    &_maket {
      background-color: $colorNeutral400;
    }

    &_plan {
      background-color: $colorSecondary400;
    }

    &_marketing {
      background-color: $colorNeutral500;
    }

    &_amo {
      background-color: $colorSecondary800;
    }

    &_tech-dir {
      background-color: $colorPrimary800;
    }

    &_kanban {
      background-color: $colorPrimary600;
    }

    &:hover {
      transform: scale(1.03);
    }
  }
}

.color-light {
  color: $colorSecondary200;
}

@media (max-width: 767px) {
  .content {
    // width: calc(100% + 30px);
    // height: 100%;
  }
  .link-box {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    padding: 30px;
    min-height: 180px;

    &__element {
      font-size: 22px;
      padding: 40px 30px;
    }
  }
}

</style>

<!--.montserrat- -->
<!--<uniquifier> {-->
<!--font-family: "Montserrat", sans-serif;-->
<!--font-optical-sizing: auto;-->
<!--font-weight: <weight>;-->
<!--font-style: normal;-->
}
