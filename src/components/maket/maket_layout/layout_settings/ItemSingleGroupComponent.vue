<script>
export default {
  name: "ItemSingleGroupComponent",
  emits: ['item-drop', 'item-drag', 'split-group'],
  props: {
    groupKey: String,
    groupData: Array
  },
  data() {
    return {
      groupName: `артикул: ${this.groupKey.replace('()', ' нанесение: ')}`,
      draggedItem: null,
    }
  },
  methods: {
    dragStart(item) {
      this.draggedItem = item;
      const data = JSON.stringify({groupKey: this.groupKey, item});
      event.dataTransfer.setData("text/plain", data);
      this.$emit('item-drag', {'groupKey': this.groupKey, item: this.draggedItem});
    },
    dragEnd() {
      this.draggedItem = null;
    },
    itemDrop(event) {
      const data = event.dataTransfer.getData("text/plain");
      const item = JSON.parse(data);
      if (item.groupKey !== this.groupKey) {
        this.$emit('item-drop', {'groupKey': this.groupKey, item});
      }
    },
    splitGroup(){
      this.$emit('split-group', this.groupKey);
    },
  }
}
</script>

<template>
  <div class="single-group">
    <div class="single-group__header">
      <div class="single-group__header_item active">
        <div>{{ groupName }}</div>
        <button
            type="button"
            class="btn-sm font__normal"
            @click="splitGroup"
        >
          разделить группу</button>
      </div>
    </div>
    <div class="single-group__content"
         @drop="itemDrop"
    >
      <div v-for="(item, index) in groupData"
           :key="index"
           draggable="true"
           @dragstart="dragStart(item)"
           @dragend="dragEnd"
      >
        <div class="single-group__item"
        >
          <div>{{ item.article }}</div>
          <div>{{ item.print_name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.single-group {
  @include brd-standard();
  position: relative;
  background-color: $colorSecondary50;
  padding: 8px 12px;
  width: 800px;


  &__header {
    display: grid;
    justify-content: space-between;
    position: absolute;
    top: -20px;
    left: 32px;
    width: 760px;
    grid-template-columns: 8fr 2fr;

    &_item {
      @include brd-standard();
      @include d-flex-center(space-between);
      border-color: transparent;
      background-color: $colorSecondary50;
      padding: 8px;
      width: 100%;
    }
  }

  &__content {
    margin-top: 16px;
    display: grid;
    grid-template-columns: auto;
    min-height: 20px;
  }

  &__item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    padding: 4px 12px;

    &:hover {
      @include brd-standard;
      border-color: transparent;
      background-color: $colorPrimary100;
      cursor: move;
    }
  }
}

.check-small {
  height: 14px;
  accent-color: $colorPrimary800;
}

</style>
