<template>
  <div class="maket-open" ref="modalDraggable"
       @mousedown="startDrag"
       @mouseup="stopDrag"
       @mousemove="drag"
  >
    <div class="maket-open__header">
      <div class="active">Выбор макета</div>
      <div class="maket-open__close"
           @click="closeMaket"
      >&times;
      </div>
    </div>
    <div class="active">{{ orderName }}</div>
    <div v-if="maketList">
      <div
          v-for="maket in maketList"
          :key="maket.id"
          @click="editMaket(maket.id)"
      >{{ maket.maket_number + ' ' + maket.comment }}
      </div>
    </div>
    <button
        type="button"
        class="btn btn-save" @click="editMaket(0)">новый
    </button>
  </div>

</template>

<script>

import {modalDragAndDrop} from "@/components/modal_drag_drop/modalDragAndDrop.js";
import {fetchData} from "@/components/services/fetchData.js";

export default {
  name: "ChooseMaketComponent",
  inject: ['appUrl', 'tokenName'],
  mixins: [modalDragAndDrop],
  emits: ['close-maket'],
  data() {
    return {
      maketList: null
    }
  },
  props: {
    orderId: Number,
    orderName: String,
  },
  methods: {
    closeMaket() {
      this.$emit('close-maket')
    },
    async createMaketList() {
      const maketUrl = `${this.appUrl}maket_to_order/${this.orderId}`;
      this.maketList = await fetchData(maketUrl, this.tokenName);
    },
    editMaket(maketId) {
      window.open(`http://localhost:5173/maket/layout?maketId=${maketId}&orderId=${this.orderId}`, '_blank');
      this.$emit('close-maket')
    },


  },
  created() {
    (async () => {
      await this.createMaketList();
    })();
  },

}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.maket-open {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 14px;
  border: 1px solid $colorPrimary800;
  border-radius: 10px;
  position: absolute;
  top: 25vh;
  left: 50vw;
  //max-width: 740px;
  box-shadow: 6px 6px 12px $colorPrimary800;
  background-color: $colorSecondary200;

  &__header {
    padding: 16px;
    justify-content: space-between;
    width: 100%;
    border-radius: 10px;
    background-color: $colorPrimary400;
    display: flex;
    color: $colorPrimary800;
    align-items: center;
  }

  &__close {
    padding-left: 12px;
    z-index: 10;
    float: right;
    font-size: 18px;
    cursor: pointer;
  }
}

</style>
