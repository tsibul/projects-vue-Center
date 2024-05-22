<script>

import BlankRowComponent from '@/components/maket/maket_layout/layout_header_footer/BlankRowComponent.vue'

export default {
  name: 'MaketFooterComponent',
  components: { BlankRowComponent },
  emits: ['rows-added'],
  props: {
    footerInfo: Object,
    rowsBefore: Number
  },
  data() {
    return {
      currentRowsBefore: this.rowsBefore
    }
  },
  methods: {
    blankRowPressed(number) {
      this.currentRowsBefore = this.currentRowsBefore + number
      this.$emit('rows-added', this.currentRowsBefore)
    }
  }
}
</script>

<template>
  <div class="empty-row"
       style="height: 16px;"
       v-for="(n,index) in rowsBefore"
       :key="index">
  </div>
  <div class="maket-footer">
    <BlankRowComponent
      @pressed="blankRowPressed"
    />
    <div class="maket-footer__heading">
      <div class="active maket-footer__text">
        Пожалуйста, ВНИМАТЕЛЬНО ПРОВЕРЯЙТЕ МАКЕТ!
      </div>
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

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";

.maket-footer {
  position: relative;
  font-size: 14px;
  border: 1px solid $colorPrimary800;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 16px 16px 8px 16px;
  max-width: 297mm;

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
    //cursor: move;

    &:hover {
      background-color: $colorPrimary100;
    }
  }

  &__block {
    padding: 8px 0 8px 0;
  }
}

.text-end {
  text-align: end;
}

.text-small {
  font-size: 10px;
}
</style>
