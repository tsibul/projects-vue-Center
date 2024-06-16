<script>
export default {
  name: 'ItemErrorComponent',
  emits: ['item-drop', 'item-drag'],
  props: {
    item: Object
  },
  data() {
    return {
    }
  },
  methods: {
    dragStart(id) {
      this.$emit('item-drag', id)
    },
    itemDrop() {
        this.$emit('item-drop', this.item.id)
    }
  }
}
</script>

<template>
  <div class="order-item"
       @drop="itemDrop"
  >
    <div class="order-item__item">
      <div>{{ item.print_no }}</div>
      <div>{{ item.code }}</div>
      <div>{{ item.name }}</div>
      <div>{{ item.print_name }}</div>
      <div>{{ item.quantity }}</div>
    </div>
    <div
      class="order-item__prints"
      draggable="true"
      @dragstart="dragStart(item.id)"
    >
      <div
        class="order-item__print"
        v-for="(print, index) in item.prints"
        v-show="print.print_type__printable"
        :key="index"
      >
        <div>{{ print.type }}</div>
        <div>{{ print.print_place__name }}</div>
        <div>{{ print.colors }}</div>
        <div>{{ print.second_pass ? 'V' : ''}}</div>
        <div>{{ print.print_price }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.order-item {
  @include brd-standard();
  position: relative;
  padding: 2px 12px;
  display: grid;
  grid-template-columns: 4fr 2fr;
  align-items: center;
  gap: 20px;

  &__item {
    font-size: 14px;
    @include brd-standard();
    border-color: transparent;
    padding: 2px 0;
    //width: 100%;
    display: grid;
    grid-template-columns: 0.5fr 2fr 5fr 3fr 0.6fr;
    align-items: center;
  }

  &__prints{
    @include brd-standard;
    border-color: transparent;
    &:hover{
      cursor: move;
      background-color: $colorPrimary200;
    }}

  &__print {
    font-size: 13px;
    @include brd-standard();
    border-color: transparent;
    padding: 2px 0;
    display: grid;
    gap: 2px;
    grid-template-columns: 2.5fr 3fr 0.3fr 0.3fr 0.5fr;
    align-items: center;
  }
}


</style>
