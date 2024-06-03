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
      filmList: null,
      currentFilmList: null
    }
  },
  methods: {
    async filmListCreate() {
      const url = `${this.appUrl}film_list_for_group/${this.group.id}/${this.connected ? 1 : 0}`;
      this.filmList = await fetchData(url, this.tokenName);
      this.currentFilmList = this.filmList;
    },
    async selectFilm(filmId) {
      if (this.connected) {
        const url = `${this.appUrl}group_to_film/${this.currentGroup.id}/${filmId}`;
        const response = await fetchData(url, this.tokenName);
        this.currentGroup.films.push(response);
        this.$emit('close-form');
      } else {
        const url = `${this.appUrl}group_from_film/${this.currentGroup.id}/${filmId}`;
        const response = await fetchData(url, this.tokenName);
        const deletedIndex = this.currentGroup.films.findIndex(el => el.id === response.id);
        this.currentGroup.films.splice(deletedIndex, 1);
        this.$emit('close-form');
      }
    },
    closeForm(event) {
      event.stopPropagation();
      this.$emit('close-form');
    }
  },
  created() {
    (async () => {
      await this.filmListCreate();
    })()
  },
  watch: {
    async connected() {
      await this.filmListCreate();
    },
    async currentGroup() {
      await this.filmListCreate();
    },
    currentFilm(newValue) {
      this.currentFilmList = this.filmList.filter(el => (
        el.film_number.toString().includes(newValue.toString()) ||
        el.dateCreate.includes(newValue.toString()) ||
        (el.dateSent ? el.dateSent.includes(newValue.toString()) : false)
      ));
    }
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
        v-if="connected"
        @click="selectFilm(0)"
      >новая
      </li>
      <li v-for="(film, index) in currentFilmList"
          :key="index"
          :class="!film.dateSent ? 'to-film__list_red' : ''"
          @click="selectFilm(film.id)"
      >
        {{ film.film_number }}&nbsp;от&nbsp;{{ film.dateSent ? film.dateSent : film.dateCreate }}
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
