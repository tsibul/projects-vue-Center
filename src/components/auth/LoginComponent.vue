<script setup>

</script>

<template>
  <div class="login__content">
    <form method="post" id="login-form" action="#" @submit.prevent="login">
      <div class="login__header">
        <p class="active">Вход</p>
        <span class="login__close" @click="closeForm">&times;</span>
      </div>

      <input type="text" v-model="username" name="username" placeholder="Имя пользователя" required
             class="login__input">
      <input type="password" v-model="password" name="password" placeholder="Пароль" required class="login__input">
      <div class="login__buttons">
        <button type="submit" class="btn btn-save">Войти</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import {authMixin} from "@/components/auth/authMixin.js";

export default {
  name: 'LoginComponent',
  inject: ['appUrl'],
  data() {
    return {
      username: '',
      password: '',
    };
  },
  mixins: [authMixin],
  methods: {
    // closeForm() {
    //   this.$emit('closeForm');
    // },
    async login() {
      try {
        const response = await axios.post(this.appUrl + 'api/token/', {
          'username': this.username,
          'password': this.password,
        });
        const token = response.data.access;
        if (token) {
          localStorage.setItem('maketUserToken', token);
          const statusUrl = this.appUrl + 'accounts/log_status/';
          const userResponse = await axios.get(statusUrl, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const responseData = userResponse.data
          this.$store.commit('setUser', responseData);
        }

      } catch (error) {
        // Обработка ошибок, если необходимо
        console.error('Ошибка при входе пользователя:', error);
        throw error;
      } finally {
        this.closeForm();
      }
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
    background-color: $colorSecondary100;
    box-shadow: 6px 6px 12px $colorPrimary800;
    position: absolute;
    left: 40vw;
  }

  &__text {
    margin: 6px;
    tab-size: 16px;
  }

  &__input {
    font: inherit;
    padding: 4px;
    border-radius: 10px;
    border-style: solid;
    margin: 4px 0;
    width: 100%;
  }

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

<!--// try {-->
<!--//   const response = await fetch(this.appUrl + 'accounts/login/', {-->
<!--//     method: 'POST',-->
<!--//     headers: {-->
<!--//       'Content-Type': 'application/x-www-form-urlencoded',-->
<!--//     },-->
<!--//     body: new URLSearchParams({-->
<!--//       'username': this.username,-->
<!--//       'password': this.password,-->
<!--//     }),-->
<!--//   });-->
<!--if (response.ok) {-->
<!--const responseData = await response.json(); // Преобразование ответа в JSON-->
<!--this.$store.commit('setUser', responseData.user_info);-->
<!--} else {-->
<!--// Обработайте ошибку входа, например, отобразите сообщение об ошибке-->
<!--console.error('Ошибка входа:', response.status);-->
<!--}-->
<!--} catch (error) {-->
<!--console.error('Ошибка при выполнении запроса:', error);-->
<!--}-->
