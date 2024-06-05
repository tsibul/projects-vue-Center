<script>
import ClauseHeadingComponent from '@/components/maket/ClauseHeadingComponent.vue'
import { fetchData } from '@/components/services/fetchData.js'
import FilmSingleComponent from '@/components/maket/film/FilmSingleComponent.vue'

export default {
  name: 'FilmComponent',
  inject: ['appUrl', 'tokenName'],
  components: {
    FilmSingleComponent,
    ClauseHeadingComponent
  },
  data() {
    return {
      filmList: [],
      showDeleted: false,
      searchString: 'default',
      idLast: 0,
      showDeleteAlert: false,
      deleteUrl: null
    }
  },
  methods: {
    search(searchInput) {
      if (searchInput !== '') {
        this.searchString = searchInput.replace(' ', '_')
      } else {
        this.searchString = 'default'
      }
      this.idLast = 0
      this.filmList = []
      this.addNextRecords()
    },
    hideDeletedChange(checked) {
      this.showDeleted = checked
    },
    async allFilms() {
      const filmListUrl = `${this.appUrl}film_list/${this.searchString}/${this.showDeleted ? 1 : 0}/${this.idLast}`
      return await fetchData(filmListUrl, this.tokenName)
    },
    addNextRecords() {
      this.allFilms().then(newData => {
        if (newData.length) {
          this.idLast = this.idLast + 20
          if (this.filmList) {
            this.filmList = [...this.filmList, ...newData]
          } else {
            this.filmList = newData
          }
        }
      })
    },
    hideDeletedChecked() {
      this.idLast = 0
      this.filmList = []
      this.addNextRecords()
    }
  },
  watch: {
    showDeleted: {
      handler: 'hideDeletedChecked'
    }
  },
  created() {
    this.addNextRecords()
  }
}
</script>

<template>
  <div class="film">
    <ClauseHeadingComponent
      :title="'Пленки'"
      :icon="'id-card'"
      :font-class="{'font__normal': true}"
      :check-box-deleted="true"
      :check-box-deleted-text="'показать все'"
      :check-box-status="showDeleted"
      @search-string="search"
      @hide-deleted-change="hideDeletedChange"
    />
    <div class="film__list">
      <div class="film__row active ">
        <div>номер&nbsp;</div>
        <div>дата</div>
        <div>дата отправки</div>
        <div>формат</div>
        <div>файл</div>
        <div>статус</div>
        <div></div>
        <button type="button" class="btn btn-save">новая&nbsp;пленка</button>
      </div>
      <FilmSingleComponent
        v-for="(film, index) in filmList"
        :key="index"
        :film="film"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.film {
  @include brd-standard;

  &__row {
    display: grid;
    align-items: center;
    gap: 4px;
    padding: 4px 0 4px 12px;
    border-radius: 10px;
    flex-wrap: nowrap;
    grid-template-columns: 1fr 2fr 2fr 2fr 6fr 1fr 2fr 2fr;
    margin-right: 19px;
  }

  &__list {
    max-height: calc(100vh - 170px);
    overflow-y: auto;
  }
}
</style>
