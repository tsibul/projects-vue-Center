<script>

import ItemErrorComponent from '@/components/maket/order/ItemErrorComponent.vue'
import { modalDragAndDrop } from '@/components/modal_drag_drop/modalDragAndDrop.js'

export default {
  name: 'OrderErrorComponent',
  components: { ItemErrorComponent },
  inject: ['appUrl', 'tokenName'],
  emits: ['close-error', 'save-config'],
  mixins: [modalDragAndDrop],
  props: {
    items: Array
  },
  data() {
    return {
      currentItems: JSON.parse(JSON.stringify(this.items)),
      draggedItem: null
    }
  },
  methods: {
    closeError() {
      this.$emit('close-error')
    },
    saveConfig() {
      this.$emit('save-config')
      this.closeError()
    },
    handleItemDrag(id){
      this.draggedItem = this.currentItems.find(el => el.id === id)
    },
    handleItemDrop(id){
      const replacedItem = this.currentItems.find(el => el.id === id)
      const movingData = this.draggedItem.prints
      this.draggedItem.prints = replacedItem.prints
      replacedItem.prints = JSON.parse(JSON.stringify(movingData))
      this.draggedItem = null
    },
  }
}
</script>

<template>
  <div class="order-error"
       ref="modalDraggable"
       @mouseup="stopDrag"
       @mousemove="drag"
       @dragover.prevent
  >
    <header class="order-error__header"
            @mousedown="startDrag"
    >
      сортировать (перетащите между разделами)
      <div class="order-error__buttons">
        <button type="button"
                class="btn btn-save" @click="saveConfig">сохранить группировку
        </button>
        <button type="button"
                class="btn btn-close"
                @click="closeError">закрыть
        </button>
      </div>
    </header>
    <div class="order-error__content">
    <ItemErrorComponent
      v-for="item in currentItems"
      :key="item.id"
      :item="item"
      @item-drag="handleItemDrag"
      @item-drop="handleItemDrop"
    /></div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.order-error {
  @include brd-standard();
  //width: fit-content;
  position: fixed;
  z-index: 7;
  width: 1400px;
  background-color: $colorSecondary50;
  top: 10%;
  left: 3vw;
  box-shadow: 6px 6px 12px $colorPrimary800;
  padding: 12px;

  &__header {
    @include brd-standard;
    background-color: $colorPrimary400;
    color: $colorPrimary800;
    padding: 8px;
    @include d-flex-center(space-between);
    //width: 100%;
    margin-bottom: 6px;
    cursor: move;
  }
  &__content{
    overflow-y: auto;
    max-height: calc(100vh - 200px);
  }
  &__buttons{
    @include d-flex-center(flex-end);
    gap: 8px;
  }
}
</style>
