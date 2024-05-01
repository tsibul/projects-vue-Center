<template>
  <div class="maket-header"
       ref="modalDraggable"
       @mousedown="startDrag"
       @mouseup="stopDrag"
       @mousemove="drag">
    <div class="maket-header__title active">
      МАКЕТ&nbsp;К&nbsp;ЗАКАЗУ&nbsp;{{ orderData[0].order_number }}&nbsp;от&nbsp;{{ reformatDate() }}
    </div>
    <div>
      <strong>Поставщик&nbsp;</strong>
      {{ orderData[0].supplier }}
    </div>
    <div>
      <strong>Покупатель&nbsp;</strong>
      {{ orderData[0].customer_name }}
    </div>
  </div>
</template>

<script>

import {modalDragAndDrop} from "@/components/modal_drag_drop/modalDragAndDrop.js";

export default {
  name: "MaketHeaderComponent",
  inject: ['appUrl', 'tokenName'],
  mixins: [modalDragAndDrop],
  props: {
    orderData: Object
  },
  methods: {
    reformatDate() {
      const date = this.orderData[0].order_date.split('-')
      return `${date[2]}.${date[1]}.${date[0].slice(-2)}`
    },

  }
}
</script>

<style scoped lang="scss">
@import '@/assets/maket/scss/vars';

.maket-header {
  font-size: 14px;
  padding: 12px;
  width: 200mm;
  border: 1px solid $colorPrimary800;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  //position: absolute;
  //left: 5mm;
  //top: calc(37px + 5mm);
  margin: 5mm;

}

</style>
