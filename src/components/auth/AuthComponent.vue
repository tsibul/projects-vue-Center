<script setup>
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import LoginComponent from "@/components/auth/LoginComponent.vue";
import {markRaw, ref} from 'vue';
import LogoutComponent from "@/components/auth/LogoutComponent.vue";

const currentComponent = ref(markRaw(null));

const showLoginForm = () => {
  currentComponent.value = markRaw(LoginComponent);
};

const showLogoutForm = () => {
  currentComponent.value = markRaw(LogoutComponent);
};

const hideLoginForm = () => {
  currentComponent.value = markRaw(null);
};
</script>

<template>
  <div>
    <div class="menu__item active" id="logout-button" v-if="user" @click="showLogoutForm">
      {{ userLabel }}&nbsp;<font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']"/>
    </div>
    <div class="menu__item active" id="login-button" v-else @click="showLoginForm">
      <font-awesome-icon :icon="['fas', 'arrow-right-to-bracket']"/>&nbsp;вход
    </div>
  </div>

  <component :is="currentComponent" @closeForm="hideLoginForm" />

</template>

<script>
export default {
  name: 'AuthComponent',
  // inject: ['currentUser'],
  // props: {
  //   currentUser: Object
  // },

  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    userLabel() {
      if (this.user) {
        return this.user.firstName !== null
            ? this.user.firstName + ' ' + this.user.lastName
            : this.user.username;
      }
      return null;
    },
  },

};
</script>


<style scoped lang="scss">

</style>


