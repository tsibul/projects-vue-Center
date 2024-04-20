<template>
  <div class="order-content">
    <div class="row row__item active">
      <div>#</div>
      <div>артикул</div>
      <div>название</div>
      <div>нанесение</div>
      <div>цена</div>
      <div>кол-во</div>
      <div>сумма</div>
      <button class="btn btn-save">макет</button>
    </div>
    <div
        v-for="item in items"
        :key="item.id"
    >
      <div class="row row__item">
        <div>{{ item.print_no }}</div>
        <div>{{ item.code }}</div>
        <div>{{ item.name }}</div>
        <div>{{ item.print_name }}</div>
        <div>{{ item.item_price }}</div>
        <div>{{ item.quantity }}</div>
        <div>{{ Math.round(item.item_price * item.quantity)}}</div>
<!--        <button class="btn btn-save">btn</button>-->
      </div>
      <div class="row row__print active">
        <div></div>
        <div>тип нанесения</div>
        <div></div>
        <div></div>
        <div>цветов</div>
        <div>2 проход</div>
        <div></div>
      </div>

      <div class="row row__print"
           v-for="print in item.prints"
           :key="print.id"
      >
        <div></div>
        <div>{{ print.type }}</div>
        <div>{{ print.print_place__name }}</div>
        <div>{{ print.print_price }}</div>
        <div>{{ print.colors }}</div>
        <div>{{ print.second_pass ? 'да' : 'нет' }}</div>
        <div></div>
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
  gap: 6px;
  flex-wrap: nowrap;
  padding: 4px 8px;
  align-items: center;

  & .btn {
    font-size: 14px;
  }

  &:hover {
    background-color: $colorPrimary200;
  }

  &__item {
    grid-template-columns: 0.3fr 1fr 4.05fr 2.65fr repeat(3, 0.78fr) 0.8fr;
  }

  &__print {
    grid-template-columns: 2.3fr 3fr 2.6fr 0.8fr 0.8fr 0.8fr 0.7fr;
  }
}
</style>
