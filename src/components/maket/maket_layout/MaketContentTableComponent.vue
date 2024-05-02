<template>
  <div class="content-table">
    <div class="content-table__title active">
      <div>#</div>
      <div>арт.</div>
      <div>наименование</div>
      <div>нанесение</div>
      <div>кол-во</div>
      <div>место</div>
      <div>тип</div>
      <div>цв.</div>
      <div>2-й пр.</div>
      <div>позиция</div>
      <div>цвет</div>
    </div>
    <div class="content-table__content"
         v-for="item in tableContent"
         :key="item.id"
    >
      <div class="content-table__item">{{ item.no }}</div>
      <div class="content-table__item">{{ item.article }}.</div>
      <div class="content-table__item">{{ item.name }}</div>
      <div class="content-table__item">{{ item.print_name }}</div>
      <div class="content-table__item">{{ item.quantity }}</div>
      <div class="print-content">
        <div class="print-content__row"
             v-for="print in item.print_item"
             :key="print.id"
        >
          <div class="content-table__item">{{ print.place }}</div>
          <div class="content-table__item">{{ print.type }}</div>
          <div class="content-table__item">{{ print.color_quantity }}</div>
          <div class="content-table__item">{{ print.second_pass ? 'V' : '' }}</div>
          <div class="content-table__item">{{ print.position }}</div>
          <div class="content-table__item">{{ print.color }}</div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "MaketContentTableComponent",
  props: {
    tableContent: Object
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";

.content-table {
  border: 1px solid $colorPrimary800;
  border-radius: 0 0 6px 6px;
  border-top: none;
  width: 200mm;
  margin: 0 0 8px 5mm;
  font-size: 10px;
  padding: 8px;

  &__title {
    display: grid;
    //gap: 2px;
    grid-template-columns: 0.5fr 2fr 4fr 2.2fr 0.8fr 2fr 2fr 0.5fr 0.8fr 2fr 2fr;
    text-align: center;
  }

  &__content {
    display: grid;
    align-items: center;
    //gap: 2px;
    grid-template-columns: 0.5fr 2fr 4fr 2.2fr 0.8fr 9.3fr;
    &:hover{
      background-color: $colorSecondary100;
    }
  }
  &__item{
    padding: 5px 5px 0 0;
    width: 100%;
    word-break: break-all;
  }
}

.print-content {
  &__row {
    display: grid;
    gap: 6px;
    grid-template-columns: 2fr 2.2fr 0.5fr 0.5fr 2fr 2.1fr;
  }

}
</style>
