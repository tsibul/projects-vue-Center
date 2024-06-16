<script>
import OrderItemComponent from '@/components/maket/order/OrderItemComponent.vue'

export default {
  name: 'OrderSingleComponent',
  components: { OrderItemComponent },
  emits: ['delete-alert', 'open-files', 'to-check', 'reset-alert'],
  props: {
    order: Object
  },
  data() {
    return {
      deleteUrl: null,
      resetUrl: null,
      showDeleteAlert: false
    }
  },
  created() {
    this.deleteUrl = `delete_order/${this.order.pk}`
    this.resetUrl = `reset_order/${this.order.pk}`
  },
  methods: {
    reformatDate(dateIn) {
      const date = dateIn.split('-')
      return `${date[2]}.${date[1]}.${date[0].slice(-2)}`
    },
    deleteAlert() {
      this.$emit('delete-alert', this.deleteUrl)
    },
    resetAlert() {
      this.$emit('reset-alert', this.resetUrl, this.order.pk)
    },
    handleOpenFiles() {
      this.$emit('open-files', this.order.pk)
    },
    toMaket(orderId) {
      const maketId = this.order.maketId ? this.order.maketId : 0
      window.open(`http://localhost:5173/maket/layout?maketId=${maketId}&orderId=${orderId}`, '_blank')
    },
    toCheck(event) {
      event.preventDefault()
      this.$emit('to-check', this.order.pk)
    }
  }
}
</script>

<template>
  <details>
    <summary class="order-summary"
             :class="order.deleted ? 'deleted': order.maket_status"
             :data-id="order.pk">
      <button
        class="btn tooltip"
        :class="order.to_check ? 'close-inverted' : 'save-inverted'"
        @click="toCheck($event)"
        v-if="order.maket_status === 'N'"
      >
        <span
          v-if="order.to_check"
          class="tooltip-text tooltip-text__left">
          проверить и исправить ошибки импорта
        </span>
        <span
          v-else
          class="tooltip-text tooltip-text__left">
          поменять соответствие нанесения на детали
        </span>
        <font-awesome-icon
          v-if="order.to_check"
          class="to-check"
          :icon="['fas', 'exclamation']" />
        <font-awesome-icon
          v-else
          :icon="['fas', 'check']" />
      </button>
      <div v-else></div>
      <div class="active">{{ order.maket_status }}</div>
      <div class="mail">{{ order.order_number }}</div>
      <div>{{ reformatDate(order.order_date) }}</div>
      <div>{{ order.our_company__code }}</div>
      <div class="customer_name">{{ order.customer__name }}</div>
      <div>{{ order.manager__name }}</div>
      <div class="mail">{{ order.manager__phone }}&nbsp;{{ order.manager__mail }}</div>
      <button class="btn btn-neutral-inverted tooltip"
              v-if="!order.deleted"
              @click="toMaket(order.pk)"
      >
        <font-awesome-icon :icon="['fas', 'paintbrush']" />
        <div class="tooltip-text">перейти&nbsp;в&nbsp;шаблон&nbsp;макета</div>
      </button>
      <button class="btn btn-save-inverted tooltip"
              @click="handleOpenFiles">
        <font-awesome-icon
          :icon="['fas', 'arrow-up-from-bracket']"
          class="fa"
        />&nbsp;{{ order.maketQuantity }}&nbsp;/&nbsp;{{ order.files
        }}
        <div class="tooltip-text">связанные&nbsp;файлы макеты/файлы</div>
      </button>
      <button class="btn btn-close-inverted tooltip"
              @click="deleteAlert"
              v-if="!order.deleted"
      >
        <font-awesome-icon :icon="['fas', 'x']" />
        <div class="tooltip-text">удалить&nbsp;заказ</div>
      </button>
      <button
        v-if="order.maket_status !== 'N'"
        class="btn btn-close-inverted tooltip"
        @click="resetAlert"
      >
        <font-awesome-icon
          :icon="['fas', 'arrows-rotate']" />
        <div class="tooltip-text">
          сбросить&nbsp;состояние, при этом все макеты и пленки будут удалены без возможности восстановления
        </div>
      </button>
    </summary>
    <OrderItemComponent
      :items="order.items"
    />
  </details>
</template>

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
  grid-template-columns: repeat(2, 0.3fr) 2fr 0.8fr 0.4fr 3fr 1.5fr 2fr repeat(2, 0.6fr) repeat(2, 0.4fr);

  &:hover {
    background-color: $colorPrimary200;
  }

  & .btn {
    font-size: 14px;
  }
}

.to-check {
  color: red;
  font-weight: bold;
  font-size: 16px;

  &__ok {
    //font-weight: bold;
    font-size: 18px;
    padding-left: 8px;

  }
}

.N {
  color: red;
}

.R {
  color: $colorNeutral400;
}

.mail {
  word-break: break-all;
}

.customer_name {
  text-wrap: balance;
}

.deleted {
  opacity: 0.5;
  background-color: $colorPrimary200;
}

.tooltip-text {
  right: 0;
  top: 2.5rem;

  &__left {
    left: 0;
    top: 2.5rem;
    width: 360px;
  }
}

.close-inverted {
  font-size: 16px;
  border-color: transparent;
  color: red;

  &:hover {
    background-color: red;
    color: $colorPrimary50;
    & svg{
      color: $colorPrimary50;
    }
  }
}

.save-inverted {
  border-color: transparent;
  color: $colorNeutral600;

  &:hover {
    background-color: $colorNeutral600;
    color: $colorPrimary50;
  }
}

</style>
