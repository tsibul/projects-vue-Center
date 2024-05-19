<template>
  <details>
    <summary class="order-summary"
             :class="order.deleted ? 'deleted': order.maket_status"
             :data-id="order.pk">
      <div class="to-check">{{ order.to_check ? '?' : '' }}</div>
      <div class="active">{{ order.maket_status }}</div>
      <div class="mail">{{ order.order_number }}</div>
      <div>{{ orderDateLocal }}</div>
      <div>{{ order.our_company__code }}</div>
      <div class="customer_name">{{ order.customer__name }}</div>
      <div>{{ order.manager__name }}</div>
      <div class="mail">{{ order.manager__phone }}&nbsp;{{ order.manager__mail }}</div>
        <button class="btn btn-neutral"
                v-if="!order.deleted"
                @click="toMaket(order.pk)"
        >макет
        </button>
      <button class="btn btn-save"
              @click="handleOpenFiles">
        <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" class="fa"/>&nbsp;0&nbsp;/&nbsp;{{order.files}}
      </button>
      <button class="btn btn-close"
              @click="deleteAlert"
              v-if="!order.deleted"
      >удалить
      </button>
    </summary>
    <OrderItemComponent
        :orderId="order.pk"
    />
  </details>
</template>

<script>
import OrderItemComponent from "@/components/maket/order/OrderItemComponent.vue";

export default {
  name: "OrderSingleComponent",
  components: {OrderItemComponent},
  emits: ['delete-alert', 'open-files'],
  data() {
    return {
      orderDateLocal: null,
      deleteUrl: null,
      showDeleteAlert: false,
    }
  },
  created() {
    this.orderDateLocal = this.reformatDate();
    this.deleteUrl = `delete_order/${this.order.pk}`;
  },
  props: {
    order: Object
  },
  methods: {
    reformatDate() {
      const date = this.order.order_date.split('-')
      return `${date[2]}.${date[1]}.${date[0].slice(-2)}`
    },
    deleteAlert() {
      this.$emit('delete-alert', this.deleteUrl);
    },
    handleOpenFiles() {
      this.$emit('open-files', this.order.pk);
    },
    toMaket(orderId){
      window.open(`http://localhost:5173/maket/layout?maketId=0&orderId=${orderId}`, '_blank');
    },
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

details[open] {
  background-color: $colorPrimary200;
}

.order-summary {
  display: grid;
  align-items: center;
  gap: 4px;
  padding: 8px 8px;
  border-radius: 10px;
  flex-wrap: nowrap;
  grid-template-columns: repeat(2, 0.3fr) 2fr 0.8fr 0.4fr 3fr 1.5fr 2fr repeat(3, 0.7fr);

  &:hover {
    background-color: $colorPrimary200;
  }

  & .btn {
    font-size: 14px;
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

.mail {
  word-break: break-all;
}

.customer_name {
  text-wrap: normal;
}

.deleted {
  opacity: 0.5;
  background-color: $colorPrimary200;
}
</style>
