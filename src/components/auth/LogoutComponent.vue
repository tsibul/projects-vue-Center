<script setup>

</script>

<template>
  <div class="login__content">
    <form method="post" id="logout-form" action="#" @submit.prevent="logout">
      <div class="login__header">
        <p class="active">Выход</p>
        <span class="login__close" @click="closeForm">&times;</span>
      </div>
      <p class="login__text">Вы уверены, что хотите выйти?</p>
      <div class="login__buttons">
        <button type="submit" class="btn btn-save">Выйти</button>
      </div>
    </form>
  </div>
</template>

<script>
import {authMixin} from "@/components/auth/authMixin.js";

export default {
  name: 'LogoutComponent',
  inject: ['currentUser'],
  mixins: [authMixin],
  methods: {
    closeForm() {
      this.$emit('closeForm');
    },
    logout() {
      localStorage.removeItem('maketUserToken');
      this.$store.commit('setUser', null);
      this.closeForm();
    },
  }
}
</script>
<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.login {
  //display: none;
  //position: fixed;
  //z-index: 1;
  //left: 0;
  //top: 0;
  //width: 100%;
  //height: 100%;
  //border-radius: 10px;
  //overflow: auto;

  &__header {
    padding: 4px;
    justify-content: space-between;
    width: 100%;
    border-radius: 10px;
    background-color: $colorPrimary400;
    display: flex;
    flex-direction: row;
    color: $colorPrimary800;
    align-items: center;
  }

  &__content {
    margin: 15% auto;
    padding: 16px;
    border: 1px solid $colorPrimary800;
    width: 300px;
    border-radius: 10px;
    background-color: $colorSecondary200;
    box-shadow: 6px 6px 12px $colorPrimary800;
    position: absolute;
    left: 40vw;
  }

  &__text {
    margin: 6px;
    tab-size: 16px;
  }

  //&__input {
  //  font: inherit;
  //  padding: 4px;
  //  border-radius: 10px;
  //  border-style: solid;
  //  margin: 4px 0;
  //  width: 100%;
  //}

  &__buttons {
    width: 100%;
    text-align: right;
  }

  &__close {
    color: $colorSecondary100;
    float: right;
    font-size: 16px;
    padding: 8px;

    &:hover, &:focus {
      color: $colorPrimary800;
      text-decoration: none;
      cursor: pointer;
    }
  }
}
</style>
