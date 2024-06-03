<script>
import ToFilmComponent from '@/components/maket/maket/ToFilmComponent.vue'

export default {
  name: 'MaketGroupComponent',
  components: { ToFilmComponent },
  props: {
    group: Object
  },
  data() {
    return {
      currentGroup: this.group,
      showToFilm: false,
      connected: null
    }
  },
  methods: {
    selectFilm(group, connected) {
      this.connected = connected
      this.currentGroup = group
      this.showToFilm = true
    },
    filmSelected() {
      this.currentGroup = null
      this.showToFilm = false
    },
    closeFilm() {
      this.currentGroup = null
      this.showToFilm = false
    }
  }
}
</script>

<template>
  <div
    class="maket-single__item"
  >
    <ToFilmComponent
      :connected="connected"
      :group="currentGroup"
      v-if="showToFilm"
      @film-selected="filmSelected"
      @close-form="closeFilm"
    />
    <div>{{ group.name.replaceAll('()', ' ') }}</div>
    <div class="film-list">
      <div
        v-for="(film, index) in group.films"
        :key="index"
        :class="!film.dateSent ? 'film-list_red' : ''"
      >
        {{ film.film_number }}&nbsp;от&nbsp;{{ film.dateSent ? film.dateSent : film.dateCreate }},&nbsp;
      </div>
    </div>
    <button
      class="btn btn-save-inverted tooltip"
      @click="selectFilm(group, true)"
    >
      <font-awesome-icon :icon="['fas', 'pencil']" />
      &nbsp;
      <font-awesome-icon :icon="['fas', 'angle-right']" />
      &nbsp;
      <font-awesome-icon :icon="['fas', 'film']" />
      <div class="tooltip-text">на&nbsp;пленку</div>
    </button>
    <button
      class="btn btn-close-inverted tooltip"
      @click="selectFilm(group, false)"
    >
      <font-awesome-icon :icon="['fas', 'film']" />
      &nbsp;
      <font-awesome-icon :icon="['fas', 'angle-right']" />
      &nbsp;
      <font-awesome-icon :icon="['fas', 'trash']" />
      <div class="tooltip-text">ошибка&nbsp;в&nbsp;пленке</div>
    </button>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.maket-single__item {
  position: relative;
  display: grid;
  align-items: center;
  grid-template-columns: 2fr 3.2fr 0.7fr 0.7fr;
  gap: 6px;
  padding: 4px 0 4px 12px;
  @include brd-standard;
  border-color: transparent;

  &:hover {
    background-color: $colorPrimary200;
  }
}

.tooltip-text {
  right: 0;
  top: -2.0rem;
}

.film-list {
  @include d-flex-center(flex-start);

  &_red {
    color: red;
  }
}
</style>
