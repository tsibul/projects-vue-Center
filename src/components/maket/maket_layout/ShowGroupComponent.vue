<template>
  <div class="show-group"
       ref="modalDraggable"
       @mouseup="stopDrag"
       @mousemove="drag"
  >
    <div
        class="show-group__header"
        @mousedown="startDrag"
    >
      <div>убрать&nbsp;ненужное</div>
      <button type="button"
              class="btn btn-close-inverted"
              @click="closeContent">закрыть
      </button>
    </div>
    <div class="show-group__content"
         v-for="group in Object.keys(showGroup)"
         :key="group">
      <div>
        <input type="checkbox"
               class="check"
               id="group"
               :checked="showGroup[group]"
               @change="toggleCheck(group)"
        >
        &nbsp;
        <label for="group">{{ group.replace('()', ' ') }}</label></div>
      <div>количество&nbsp;элементов&nbsp;{{ itemGroup[group].length }}</div>
    </div>
  </div>
</template>

<script>
import {modalDragAndDrop} from "@/components/modal_drag_drop/modalDragAndDrop.js";

export default {
  name: "ShowGroupComponent",
  emits: ['close-content', 'toggle-check'],
  mixins: [modalDragAndDrop],
  props: {
    showGroup: Object,
    itemGroup: Object
  },
  methods: {
    closeContent() {
      this.$emit('close-content');
    },
    toggleCheck(group) {
      this.$emit('toggle-check', group)
    }
  },
}
</script>
<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.show-group {
  @include brd-standard();
  border-color: $colorPrimary800;
  width: fit-content;
  position: absolute;
  z-index: 3;
  background-color: $colorSecondary50;
  left: 10vw;
  top: 10vh;
  box-shadow: 6px 6px 12px $colorPrimary800;
  padding: 12px;

  &__header {
    @include brd-standard;
    background-color: $colorPrimary500;
    color: $colorSecondary200;
    padding: 8px;
    @include d-flex-center(space-between);
    width: 100%;
    margin-bottom: 6px;
    cursor: move;
  }

  &__content {
    display: flex;
    gap: 24px;
    padding: 6px 32px;
  }
}
</style>
