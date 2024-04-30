<template>
  <div class="login__content">
      <div class="login__header">
        <p class="active">Выход</p>
        <span class="login__close" @click="closeForm">&times;</span>
      </div>
      <p class="login__text">Вы уверены, что хотите удалить?</p>
      <div class="login__buttons">
        <button type="button" class="btn btn-save" @click="deleteRecord">удалить</button>
        <button type="button" class="btn btn-close" @click="closeForm">закрыть</button>
      </div>
  </div>
</template>

<script>
import {fetchData} from "@/components/services/fetchData.js";

export default {
  name: "DeleteAlertComponent",
  inject: ['appUrl', 'tokenName'],
  emits: ['closeForm', 'deleted'],
  props:{
    deleteUrl: String,
  },
  methods: {
    closeForm() {
      this.$emit('closeForm');
    },
    async deleteRecord() {
      const deletedId = await fetchData(`${this.appUrl}${this.deleteUrl}`, this.tokenName);
      this.$emit('deleted', deletedId);
    },
  }


}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.login {

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

  &__text {
    margin: 6px;
    tab-size: 16px;
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
    gap: 6px;
    width: 100%;
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
    top: 10vh;
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
