<script>
export default {
  name: 'ItemErrorComponent',
  emits: ['item-drop', 'item-drag'],
  props: {
    item: Object
  },
  data() {
    return {
      draggedItem: null
    }
  },
  methods: {
    dragStart(item) {
      this.draggedItem = item
      const data = JSON.stringify({ groupKey: this.groupKey, item })
      event.dataTransfer.setData('text/plain', data)
      this.$emit('item-drag', { item: this.draggedItem })
    },
    dragEnd() {
      this.draggedItem = null
    },
    itemDrop(event) {
      const data = event.dataTransfer.getData('text/plain')
      const item = JSON.parse(data)
      if (item.groupKey !== this.groupKey) {
        this.$emit('item-drop', { item })
      }
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
      @dragstart="dragStart(item)"
      @dragend="dragEnd"
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
    grid-template-columns: 2.5fr 3fr 0.3fr 0.3fr;
    align-items: center;
  }
}


</style>
