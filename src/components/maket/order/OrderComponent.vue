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
      <div class="double">статус</div>
      <div>номер</div>
      <div>дата</div>
      <div>#</div>
      <div>клиент</div>
      <div>менеджер</div>
      <div>E-mail</div>
      <button class="btn btn-save" @click="showImportForm">загрузить заказ</button>
    </div>
    <div class="order__content">
      <OrderSingleComponent
          v-for="order in orderList"
          :key="order.id"
          :order="order"
      />
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
import {fetchData} from "@/components/services/fetchData.js";

export default {
  name: 'OrderComponent',
  inject: ['appUrl', 'tokenName'],
  data() {
    return {
      orderOrder: 'default',
      searchInput: '',
      searchString: 'default',
      show: false,
      orders: null,
      orderData: null,
      idLast: 0,
      showDeleted: 0,
      orderList: [],
    }
  },
  created() {
    (async () => {
      await this.allOrders();
    })();
  },
  methods: {
    async search() {
      if (this.searchInput !== '') {
        this.searchString = this.searchInput;//.replace(' ', '_');
      } else {
        this.searchString = 'default';
      }
      await this.allOrders()
    },
    clearInput() {
      this.searchInput = '';
    },
    async orderImported(success) {
      if (success) {
        const orderUrl = `${this.appUrl}import_order`;
        this.orderData = await fetchData(orderUrl, this.tokenName);
        const index = this.orderList.findIndex((el) => el.order_number === this.orderData.order_number)
        if(index !== -1){
          this.orderList[index] = this.orderData;
        } else {
        this.orderList.unshift(this.orderData);
        }
      }
    },
    async allOrders() {
      const ordersUrl = `${this.appUrl}order/${this.idLast}/${this.orderOrder}/${this.searchString}/${this.showDeleted}`;
      this.orderList = await fetchData(ordersUrl, this.tokenName);
    },
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
    gap: 4px;
    padding: 8px 8px;
    border-radius: 10px;
    flex-wrap: nowrap;
    grid-template-columns: repeat(2, 0.3fr) 2fr 0.8fr 0.4fr 3fr 1.5fr 2fr 2.1fr;
    margin-right: 19px;
  }

  &__content {
    max-height: calc(100vh - 210px);
    overflow-y: scroll;
    font-size: 15px;
  }
}

.double {
  grid-column: 1/3;
}

</style>
