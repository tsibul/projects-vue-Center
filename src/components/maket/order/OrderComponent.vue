<script setup>
import {markRaw, ref} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import OrderSingleComponent from "@/components/maket/order/OrderSingleComponent.vue";
import FileImportComponent from "@/components/file_import/FileImportComponent.vue";

const currentComponent = ref(markRaw(null));
const showImportForm = () => {
  currentComponent.value = markRaw(FileImportComponent);
};
const hideImportForm = () => {
  currentComponent.value = markRaw(null);
};

</script>

<template>
  <div class="order">
    <div class="order__header active">
      <div>
        <font-awesome-icon :icon="['fas', 'handshake']" class="fa"/>
        Заказы
      </div>
      <div class="order__search">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']"/>
        <input v-model="searchInput" type="text" class="form-input order__search-input"
               placeholder="искать...">
        <button class="btn btn-save" type="button" @click="search">поиск</button>
        <button class="btn btn-close" type="button" @click="clearInput">очистить</button>
      </div>
    </div>
    <div class="order__row active ">
      <div>статус</div>
      <div></div>
      <div>номер</div>
      <div>дата</div>
      <div>продавец</div>
      <div>клиент</div>
      <div>менеджер</div>
      <div>E-mail</div>
      <button class="btn btn-save" @click="showImportForm">загрузить заказ</button>
    </div>
    <div class="order__content">
      <OrderSingleComponent/>
    </div>
  </div>
  <component
      :is="currentComponent"
      :fileType="'.html'"
      @closeForm="hideImportForm"
      @file-loaded="orderImported"
  />
</template>

<script>
export default {
  name: 'OrderComponent',
  inject: ['appUrl', 'tokenName'],
  data() {
    return {
      searchInput: '',
      searchString: 'default',
      show: false,
      orders: null
    }
  },
  methods: {
    search() {
      if (this.searchInput !== '') {
        this.searchString = this.searchInput.replace(' ', '_');
      } else {
        this.searchString = 'default';
      }
    },
    clearInput() {
      this.searchInput = '';
    },
    orderImported(success){
      if (success) {
        console.log()
      }
    }
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.order {
  @include brd-standard;

  &__header {
    background-color: $colorPrimary600;
    border-radius: 10px;
    @include d-flex-center(center);
    padding: 12px 20px;
    justify-content: space-between;
  }

  &__search {
    align-items: center;
    @include d-flex-center('flex-end');
    gap: 10px;
  }

  &__search-input {
    width: 400px;
  }

  &__row {
    display: grid;
    align-items: center;
    gap: 10px;
    padding: 8px 8px;
    border-radius: 10px;
    flex-wrap: nowrap;
    margin-right: 19px;
    grid-template-columns: repeat(2, 1fr) 2fr repeat(2, 1fr) repeat(3, 2fr) 1.5fr;
  }

  &__content{
    overflow: auto;
    height: 100%;
  }
}

</style>
