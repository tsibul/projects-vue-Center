<script>
export default {
  name: "MaketContentTableComponent",
  props: {
    tableContent: Object,
    showGroup: Object
  }
}
</script>

<template>
  <div class="content-table">
    <div class="content-table__title active">
      <div></div>
      <div class="no-center">арт.</div>
      <div class="content-table__item">наименование</div>
      <div class="content-table__item">нанесение</div>
      <div class="content-table__item">кол.</div>
      <div class="content-table__item">место</div>
      <div class="content-table__item">тип</div>
      <div class="content-table__item">цв.</div>
      <div class="content-table__item">2пр.</div>
      <div class="content-table__item">позиция</div>
      <div class="content-table__item">цвет</div>
    </div>
    <div v-for="(group, index) in Object.values(tableContent)"
         :key="index">
      <div class="content-table__content"
           v-for="(item, index) in group"
           :key="index"
           v-show="showGroup[item.itemGroup]"
      >
        <div class="content-table__item">{{ item.no }}</div>
        <div class="content-table__item content-table__wrap">{{ item.article }}</div>
        <div class="content-table__item">{{ item.name }}</div>
        <div class="content-table__item content-table__wrap">{{ item.print_name }}</div>
        <div class="content-table__item">{{ item.quantity }}</div>
        <div class="print-content">
          <div class="print-content__row"
               v-for="print in item.print_item"
               v-show="print.printable"
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
  </div>

</template>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";

.content-table {
  display: flex;
  flex-direction: column;
  gap: 2px;
  border: 1px solid $colorPrimary800;
  border-radius: 0 0 6px 6px;
  border-top: none;
  width: 200mm;
  font-size: 10px;
  padding: 8px;

  &__title {
    display: grid;
    grid-template-columns: 0.5fr 1.8fr 4fr 2.2fr 0.8fr 2.2fr 2fr 0.5fr 0.8fr 2fr 2fr;
  }

  &__content {
    display: grid;
    align-items: center;
    grid-template-columns: 0.5fr 1.8fr 4fr 2.2fr 0.8fr 9.5fr;

    &:hover {
      background-color: $colorSecondary100;
    }
  }

  &__item {
    width: 100%;
    padding: 0 2px;
  }

  &__wrap {
    word-break: break-all;

  }
}

.no-center {
  text-align: start;
}

.print-content {
  &__row {
    display: grid;
    align-items: center;
    grid-template-columns: 2.1fr 2.2fr 0.5fr 0.8fr 1.9fr 1.9fr;
  }
}
</style>
