<template>
  <div class="maket-header">
    <div class="maket-header__title active">
      МАКЕТ&nbsp;К&nbsp;ЗАКАЗУ&nbsp;{{ headerInfo.number }}&nbsp;от&nbsp;{{ headerInfo.date }}
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
    headerInfo: Object
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import '@/assets/maket/scss/vars';

.maket-header {
  font-size: 14px;
  padding: 12px;
  //width: 200mm;
  border: 1px solid $colorPrimary800;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
}

</style>
