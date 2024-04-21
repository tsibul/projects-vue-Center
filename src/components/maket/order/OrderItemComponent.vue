<template>
  <div class="order-content">
    <div class="row row__title active">
      <div>#</div>
      <div>артикул</div>
      <div>название</div>
      <div>нанесение</div>
      <div>цена</div>
      <div>кол-во</div>
      <div>сумма</div>
      <div>тип печати</div>
      <div>место</div>
      <div>за нанес.</div>
      <div>цветов</div>
      <div>2-й проход</div>
    </div>
    <div
        v-for="item in items"
        :key="item.id"
    >
      <div class="row">
        <div>{{ item.print_no }}</div>
        <div>{{ item.code }}</div>
        <div>{{ item.name }}</div>
        <div>{{ item.print_name }}</div>
        <div>{{ item.item_price }}</div>
        <div>{{ item.quantity }}</div>
        <div>{{ Math.round(item.item_price * item.quantity) }}</div>
        <div class="row__item">
          <div class="row row__print"
               v-for="print in item.prints"
               :key="print.id"
          >
            <div>{{ print.type }}</div>
            <div>{{ print.print_place__name }}</div>
            <div>{{ print.print_price }}</div>
            <div>{{ print.colors }}</div>
            <div>{{ print.second_pass ? 'да' : 'нет' }}</div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {fetchData} from "@/components/services/fetchData.js";

export default {
  name: "OrderItemComponent",
  inject: ['appUrl', 'tokenName'],
  data() {
    return {
      items: [],
    }
  },
  props: {
    orderId: Number
  },
  methods: {
    async itemsList() {
      const itemsUrl = `${this.appUrl}item_list/${this.orderId}`;
      this.items = await fetchData(itemsUrl, this.tokenName);
    }
  },
  created() {
    (async () => {
      await this.itemsList();
    })();
  },
  watch: {
    async orderId() {
      await this.itemsList();
    }
  }
}
</script>


<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.order-content {
  border: 1px solid $colorPrimary800;
  border-radius: 10px;
  background-color: $colorSecondary100;
  font-size: 14px;
}

.row {
  display: grid;
  gap: 4px;
  flex-wrap: nowrap;
  padding: 2px 8px;
  align-items: center;
  grid-template-columns: 0.2fr 1.5fr 3fr 2.5fr repeat(3, 0.6fr) 2fr 2fr repeat(3, 0.67fr);

  & .btn {
    font-size: 14px;
  }

  &:hover {
    background-color: $colorPrimary200;
  }

  &__item {
    grid-column: 8/13;
  }

  &__print {
    align-items: baseline;
    padding: 0;
    grid-template-columns: 3fr 3.1fr 1fr 1fr 0.9fr;
  }
}
</style>
