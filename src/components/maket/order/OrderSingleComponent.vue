<template>
  <details>
    <summary class="order-summary"
             :class="order.maket_status"
             :data-id="order.pk">
      <div class="to-check">{{ order.to_check ? '?' : '' }}</div>
      <div class="active">{{ order.maket_status }}</div>
      <div>{{ order.order_number }}</div>
      <div>{{ orderDateLocal }}</div>
      <div>{{ order.our_company__code }}</div>
      <div>{{ order.customer__name }}</div>
      <div>{{ order.manager__name }}</div>
      <div>{{ order.manager__mail }}</div>
      <button class="btn btn-save">
        <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" class="fa"/>&nbsp;0&nbsp;/&nbsp;0</button>
      <button class="btn btn-close">удалить</button>
    </summary>
    <OrderItemComponent
        :orderId="order.pk"
    />
  </details>
</template>

<script>
import OrderItemComponent from "@/components/maket/order/OrderItemComponent.vue";
// import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "OrderSingleComponent",
  components: {OrderItemComponent},
  data() {
    return {
      orderDateLocal: null
    }
  },
  created() {
    this.orderDateLocal = this.reformatDate();
  },
  props: {
    order: Object
  },
  methods: {
    reformatDate() {
      const date = this.order.order_date.split('-')
      return `${date[2]}.${date[1]}.${date[0].slice(-2)}`
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.order-summary {
  display: grid;
  align-items: center;
  gap: 10px;
  padding: 8px 8px;
  border-radius: 10px;
  flex-wrap: nowrap;
  grid-template-columns: repeat(2, 0.3fr) 2fr repeat(2, 1fr) repeat(2, 3fr) 2fr repeat(2, 1fr);

  &:hover {
    background-color: $colorPrimary200;
  }

  & .btn {
    font-size: 15px;
  }


  .to-check {
    color: red;
    font-weight: bold;
    font-size: 18px;
    padding-left: 8px;
  }
}

.N {
  color: red;
}

.R {
  color: $colorNeutral600;
}

</style>
