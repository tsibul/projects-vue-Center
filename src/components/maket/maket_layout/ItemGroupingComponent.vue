<template>
  <div class="item-grouping"
       ref="modalDraggable"
       @mouseup="stopDrag"
       @mousemove="drag"
       @dragover.prevent
  >
    <header class="item-grouping__header"
            @mousedown="startDrag"
    >
      сортировать (перетащите между разделами)
      <div class="item-grouping_btn-block">
        <button type="button"
                class="btn btn-save" @click="saveGrouping">сохранить группировку</button>
        <button type="button"
                class="btn btn-close"
                @click="closeSort">закрыть</button>
      </div>
    </header>
    <ItemSingleGroupComponent
        v-for="group in Object.keys(itemGroup)"
        :key="group.id"
        :group-key="group"
        :group-data="itemGroup[group]"
        @item-drag="handleItemDrag"
        @item-drop="handleItemDrop"
    />
  </div>
</template>

<script>
import ItemSingleGroupComponent from "@/components/maket/maket_layout/ItemSingleGroupComponent.vue";
import {modalDragAndDrop} from "@/components/modal_drag_drop/modalDragAndDrop.js";
import {submitForm} from "@/components/services/submitForm.js";

export default {
  name: "ItemGroupingComponent",
  components: {ItemSingleGroupComponent},
  inject: ['appUrl', 'tokenName'],
  emits: ['item-drag', 'item-drop', 'close-sort'],
  mixins: [modalDragAndDrop],
  props: {
    itemGroup: Object,
  },
  data() {
    return {
    }
  },
  methods: {
    handleItemDrag(element) {
      this.$emit('item-drag', element);
    },
    handleItemDrop(element) {
      this.$emit('item-drop', element);
    },
    async saveGrouping(){
      const url = `${this.appUrl}maket_grouping_change`;
      const data = this.itemGroup;
      const response = await submitForm(url, this.tokenName, data);
      if(response){
        this.$emit('close-sort');
      } else {
        // window.location.reload();
      }
    },
    closeSort() {
      this.$emit('close-sort');
    },

  },
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.item-grouping {
  @include brd-standard;
  background-color: $colorSecondary50;
  padding: 14px 12px 12px;
  box-shadow: 6px 6px 12px $colorPrimary800;
  display: flex;
  flex-direction: column;
  width: fit-content;
  position: absolute;
  z-index: 3;
  left: 22vw;
  gap: 20px;

  &__header {
    @include brd-standard;
    background-color: $colorPrimary400;
    color: $colorPrimary800;
    padding: 10px;
    margin-bottom: 16px;
    cursor: move;
    @include d-flex-center(space-between);
    width: 100%;
  }

  &__close {
    padding-left: 12px;
    z-index: 10;
    float: right;
    font-size: 18px;
    cursor: pointer;
  }

  &_btn-block {
    display: flex;
    gap: 16px
  }
}


</style>
