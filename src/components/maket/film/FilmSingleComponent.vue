<script>
import FilmGroupSingleComponent from '@/components/maket/film/FilmGroupSingleComponent.vue'

export default {
  name: 'FilmSingleComponent',
  components: { FilmGroupSingleComponent },
  inject: ['appUrl', 'tokenName'],
  props: {
    film: Object
  }
}
</script>

<template>
  <details class="film-details">
    <summary class="film-summary">
      <div>{{ film.filmNumber }}</div>
      <div>{{ film.dateCreate }}</div>
      <div>{{ film.dateSent }}</div>
      <div>{{ film.format }}</div>
      <div>{{ film.file }}</div>
      <div>{{ film.status ? 'ok' : 'ошибка' }}</div>
      <div></div>
      <button class="btn btn-close-inverted">delete</button>
    </summary>
    <div class="film-content">
      <div class="film-content__header active font__14">
        <div>арт.</div>
        <div>нанесение</div>
        <div>макет</div>
        <div>заказ</div>
        <div>дата</div>
        <div>клиент</div>
        <div>тип&nbsp;нанесения</div>
        <div>комментарий</div>
        <div>статус</div>
      </div>
      <FilmGroupSingleComponent
        v-for="(group, index) in film.groups"
        :key="index"
        :group="group"
        :film-id="film.id"
      />
    </div>
  </details>

</template>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.film-details {
  @include brd-standard;
  border-color: transparent;

  &:hover {
    background-color: $colorPrimary200;
  }
}

.film-summary {
  cursor: pointer;
  display: grid;
  align-items: center;
  gap: 4px;
  padding: 4px 0 4px 12px;
  border-radius: 10px;
  flex-wrap: nowrap;
  grid-template-columns: 1fr 2fr 2fr 2fr 6fr 1fr 2fr 2fr;
  margin-right: 19px;
}

.film-content {
  @include brd-standard;
  border-color: transparent;
  background-color: $colorPrimary50;

  &__header{
    display: grid;
    align-items: center;
    gap: 4px;
    padding: 2px 0 2px 12px;
    border-radius: 10px;
    flex-wrap: nowrap;
    grid-template-columns: 1fr 3fr 1fr 2.5fr 1fr 4fr 2fr 3fr 1fr repeat(3, 1fr);
    margin-right: 19px;
  }
}
</style>
