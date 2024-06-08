<script>
import FilmGroupSingleComponent from '@/components/maket/film/FilmGroupSingleComponent.vue'
import { fetchData } from '@/components/services/fetchData.js'
import FileImportComponent from '@/components/file_import/FileImportComponent.vue'
import FilmUpdateComponent from '@/components/maket/film/FilmUpdateComponent.vue'
import FilmUpdateWithListComponent from '@/components/maket/film/FilmUpdateWithListComponent.vue'

export default {
  name: 'FilmSingleComponent',
  components: { FilmUpdateWithListComponent, FilmUpdateComponent, FileImportComponent, FilmGroupSingleComponent },
  inject: ['appUrl', 'tokenName'],
  props: {
    film: Object
  },
  data() {
    return {
      currentFilm: this.film,
      filmEditShow: false,
      loadFileShow: false,
      loadGroupsShow: false
    }
  },
  methods: {
    async filmToggleDeleted() {
      const url = `${this.appUrl}film_delete/${this.film.id}`
      const response = await fetchData(url, this.tokenName)
      if (response.id === this.film.id) {
        this.currentFilm.deleted = !this.currentFilm.deleted
      }
    },
    async saveFilmFile() {
      const url = `${this.appUrl}film_file_save/${this.film.id}`
      const response = await fetchData(url, this.tokenName)
      if (response) {
        this.currentFilm.file = response
      }
    },
    async downloadFilm(event) {
      event.preventDefault()
      const fileUrl = `${this.appUrl}film_load/${this.film.id}`
      const response = await fetchData(fileUrl, this.tokenName)
      if (response) {
        window.location.href = fileUrl
      } else {
        alert('ошибка загрузки')
      }
    },
    listUpdated(data){
      this.currentFilm.groups = this.currentFilm.groups.concat(data)
      this.loadGroupsShow = false
    },
  }
}
</script>

<template>
  <details class="film-details">
    <summary class="film-summary">
      <div :class="film.deleted ? 'inactive' : ''">{{ film.filmNumber }}</div>
      <div :class="film.deleted ? 'inactive' : ''">{{ film.dateCreate }}</div>
      <div :class="film.deleted ? 'inactive' : ''">{{ film.dateSent }}</div>
      <div :class="film.deleted ? 'inactive' : ''">{{ film.format }}</div>
      <div>
        <div
          class="film-summary__file"
          :class="film.deleted ? 'inactive' : ''"
          @click="downloadFilm($event)"
        >{{ film.file }}
        </div>
      </div>
      <div :class="film.deleted ? 'inactive' : ''">{{ film.status ? 'ok' : 'ошибка' }}</div>
      <div class="film-summary__buttons">
        <button
          class="btn btn-save-inverted tooltip"
          @click="filmEditShow=true"
        >
          <font-awesome-icon :icon="['far', 'pen-to-square']" />
          <div class="tooltip-text">редактировать&nbsp;пленку</div>
        </button>
        <button
          class="btn btn-save-inverted tooltip"
          @click="loadGroupsShow=true"
        >
          <font-awesome-icon :icon="['fas', 'list-check']" />
          <div class="tooltip-text">несколько&nbsp;нанесений&nbsp;на&nbsp;пленку</div>
        </button>
        <button
          class="btn btn-neutral-inverted tooltip"
          @click="loadFileShow=true"
        >
          <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" />
          <div class="tooltip-text">загрузить&nbsp;файл</div>
        </button>
        <button
          class="btn tooltip"
          @click="filmToggleDeleted"
          :class="film.deleted ? 'btn-save-inverted' : 'btn-close-inverted'"
        >
          <font-awesome-icon
            v-if="!film.deleted"
            :icon="['fas', 'x']" />
          <font-awesome-icon
            v-else
            :icon="['fas', 'check']" />
          <div
            class="tooltip-text"
            v-html="!film.deleted ? `удалить&nbsp;пленку`: `восстановить&nbsp;пленку`"
          ></div>
        </button>
      </div>
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
  <FileImportComponent
    v-if="loadFileShow"
    :file-type="'.cdr'"
    @close-form="loadFileShow=false"
    @file-loaded="saveFilmFile"
  />
  <FilmUpdateComponent
    v-if="filmEditShow"
    :film="film"
    @close-film="filmEditShow=false"
  />
  <FilmUpdateWithListComponent
    v-if="loadGroupsShow"
    :film="film"
    :groups="film.groups"
    @close-list="loadGroupsShow=false"
    @update-list="listUpdated"
  />

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
  grid-template-columns: 1fr 2fr 2fr 2fr 6fr 1fr 4fr;
  margin-right: 19px;

  &__buttons {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
  }

  &__file {
    width: fit-content;
    &:hover {
      color: $colorPrimary600;
      font-weight: 700;
      text-decoration: underline;
    }
  }
}

.film-content {
  @include brd-standard;
  border-color: transparent;
  background-color: $colorPrimary50;

  &__header {
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

.tooltip-text {
  right: 0;
  top: -2rem;
}

</style>
