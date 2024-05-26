<template>
  <div class="maket-header">
    <div class="maket-header__title">
      <div class="active">
        МАКЕТ&nbsp;К&nbsp;ЗАКАЗУ&nbsp;{{ headerInfo.number }}&nbsp;от&nbsp;{{ headerInfo.date }}
      </div>
      <div>{{maketId}}</div>
    </div>
    <div>
      <strong>Поставщик&nbsp;</strong>
      {{ headerInfo.supplier }}
    </div>
    <div>
      <strong>Покупатель&nbsp;</strong>
      {{ headerInfo.customer }}
    </div>
  </div>
</template>

<script>


export default {
  name: "MaketHeaderComponent",
  inject: ['appUrl', 'tokenName'],
  props: {
    headerInfo: Object,
    maketId: String,
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import '@/assets/maket/scss/vars';
@import '@/assets/maket/scss/mixins';

.maket-header {
  font-size: 14px;
  padding: 12px;
  border: 1px solid $colorPrimary800;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
  max-width: 297mm;
  &__title{
    @include d-flex-center(space-between);
  }
}

</style>
