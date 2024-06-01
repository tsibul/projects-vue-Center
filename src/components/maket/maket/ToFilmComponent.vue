<script>
import { fetchData } from '@/components/services/fetchData.js'

export default {
  name: 'ToFilmComponent',
  inject: ['appUrl', 'tokenName'],
  emits: ['film-selected', 'close-form'],
  props: {
    connected: Boolean,
    group: Object
  },
  data() {
    return {
      currentGroup: this.group,
      currentFilm: null,
      filmList: null
    }
  },
  methods: {
    async filmListCreate() {
      const url = `${this.appUrl}film_list_for_group/${this.group.id}/${this.connected ? 1 : 0}`
      this.filmList = await fetchData(url, this.tokenName)
    },
    selectFilm(filmId) {

    },
    closeForm(event){
      event.stopPropagation();
      this.$emit('close-form');
    }
  },
  created() {
    (async () => {
      await this.filmListCreate()
    })()
  }
}
</script>

<template>
  <div class="to-film">
    <div class="to-film__header">
      <p v-text="connected ? 'на пленку' : 'убрать с пленки'"
      ></p>
      <span class="import__close"
            @click="closeForm($event)">&times;</span>
    </div>
    <input
      type="text"
      class="form-input"
      v-model="currentFilm">
    <ul class="to-film__list">
      <li
        @click="selectFilm(0)"
      >новая
      </li>
      <li v-for="(film, index) in filmList"
          :key="index"
          :class="!film.dateSent ? 'to-film__list_red' : ''"
          @click="selectFilm(film.id)"
      >
        {{ film.number }}&nbsp;от&nbsp;{{ film.dateSent ? film.dateSent : film.dateCreate }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.to-film {
  color: $colorPrimary800;
  position: absolute;
  top: 2.5rem;
  right: 0;
  @include brd-standard;
  background-color: $colorSecondary50;
  padding: 8px;
  z-index: 10;

  &__header {
    @include d-flex-center(space-between);
    background-color: $colorPrimary300;
    @include brd-standard;
    padding: 8px;
    margin-bottom: 4px;

  }

  &__list {
    list-style: none;
    max-height: 200px;
    overflow-y: auto;

    & li {
      @include brd-standard;
      border-color: transparent;
      padding: 8px;
      margin-top: 4px;

      &:hover {
        background-color: $colorSecondary100;
      }
    }

    &_red {
      color: red;
    }
  }
}
</style>
