<template>
  <div class="maket-footer" ref="modalDraggable"
       @mousedown="startDrag"
       @mouseup="stopDrag"
       @mousemove="drag">
    <div class="maket-footer__heading">
      <div class="active maket-footer__text">Пожалуйста, ВНИМАТЕЛЬНО ПРОВЕРЯЙТЕ МАКЕТ!</div>
      <strong>Найденная в готовом изделии ошибка, в случае если макет утвержден, не может быть основанием для переделки
        заказа
        за счет Исполнителя. После утверждения макета изменения не принимаются!</strong>
    </div>
    <div class="maket-footer__data">
      <div class="maket-footer__block">
        <div>Поставщик:&nbsp;<strong>{{ footerInfo.supplier }}</strong></div>
        <div>от поставщика:&nbsp;{{ footerInfo.our_manager }}</div>
        <div>{{ footerInfo.our_manager_info }}</div>
      </div>
      <div class="maket-footer__block">
        <div>Заказчик:&nbsp;<strong>{{ footerInfo.customer }}</strong></div>
        <div>от заказчика:&nbsp;{{ footerInfo.cst_manager }}</div>
        <div>{{ footerInfo.cst_manager_info }}</div>
        <br>
        <div class="text-end">_____________________________</div>
        <div class="text-small text-end">подпись</div>
        <div class="text-small text-end">М.П.</div>
      </div>
    </div>
  </div>

</template>

<script>
import {modalDragAndDrop} from "@/components/modal_drag_drop/modalDragAndDrop.js";

export default {
  name: "MaketFooterComponent",
  mixins: [modalDragAndDrop],
  props: {
    footerInfo: Object
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";

.maket-footer {
  font-size: 14px;
  //padding: 12px;
  width: 200mm;
  border: 1px solid $colorPrimary800;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 5mm;
  position: absolute;

  &__heading {
    text-align: center;
  }

  &__data {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
    padding: 0 8px;
  }

  &__text {
    padding: 8px 0 8px 0;
  }
  &__block {
    padding: 8px 0 8px 0;
  }
}
.text-end{
  text-align: end;
}
.text-small{
  font-size: 10px;
}
</style>
