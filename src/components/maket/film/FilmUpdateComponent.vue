<script>
import { modalDragAndDrop } from '@/components/modal_drag_drop/modalDragAndDrop.js'
import { stringToDate } from '@/components/services/reformatDate.js'

export default {
  name: 'FilmUpdateComponent',
  inject: ['appUrl', 'tokenName'],
  emits: ['close-film'],
  mixins: [modalDragAndDrop],
  props: {
    film: Object
  },
  data() {
    return {
      currentFilm: this.film,
      showStatus: false,
      showFormat: false,
      format: this.film.format,
      status: this.film.status
    }
  },
  methods: {
    stringToDate,
    closeForm() {
      this.$emit('close-film')
    },
    selectFormat(format) {
      this.format = format
      this.showFormat = false
    },
    selectStatus(status) {
      this.status = status
      this.showStatus = false
    }

  }
}
</script>

<template>
  <div class="film-update" ref="modalDraggable"
       @mousedown="startDrag"
       @mouseup="stopDrag"
       @mousemove="drag">
    <div class="film-update__header">
      <div>{{ film ? 'редактировать пленку' : 'создать пленку' }}</div>
      <span class="import__close"
            @click="closeForm($event)">&times;</span>
    </div>
    <div class="film-update__content">
      <div class="film-update__row">
        <div class="film-update__row-block">
          <label for="film-number">номер </label>
          <input
            type="number"
            class="form-input input-small"
            id="film-number"
            :value="film.filmNumber"
          >
        </div>
        <div class="film-update__row-block">
          <label for="film-date">дата </label>
          <input
            type="date"
            class="form-input"
            id="film-date"
            :value="stringToDate(film.dateCreate)"
          >
        </div>
      </div>
      <div class="film-update__row">
        <span></span>
        <span class="film-update__row-block">
        <label for="film-date">отправлено </label>
        <input
          type="date"
          class="form-input"
          id="film-date"
          :value="stringToDate(film.dateSent)"
        >
        </span>
      </div>
      <div class="film-update__row">
        <div class="film-update__row-block">
          <label for="film-format">формат </label>
          <input
            type="text"
            class="form-input input-small"
            id="film-format"
            :value="format"
            readonly
            @click="showFormat=!showFormat"
          >
          <font-awesome-icon
            :icon="['fas', 'chevron-down']"
            class="chevron"
            @click="showFormat=!showFormat"

          />
          <ul
            class="film-update__dropdown"
            v-if="showFormat"
          >
            <li
              class="font__14"
              @click="selectFormat('A5')"
            >
              A5
            </li>
            <li
              class="font__14"
              @click="selectFormat('A4')"
              value="A4"
            >A4
            </li>
            <li
              class="font__14"
              @click="selectFormat('A3')"
              value="A3"
            >A3
            </li>
            <li
              class="font__14"
              @click="selectFormat('A2')"
              value="A2"
            >A2
            </li>
          </ul>
        </div>
        <div class="film-update__row-block">
          <label for="film-status">статус </label>
          <input
            type="text"
            class="form-input input-small"
            id="film-status"
            :value="status ? 'ok' : 'ошибка'"
            readonly
            @click="showStatus=!showStatus"
          >
          <font-awesome-icon
            :icon="['fas', 'chevron-down']"
            class="chevron"
            @click="showStatus=!showStatus"
          />
          <ul
            class="film-update__dropdown"
            v-if="showStatus"
          >
            <li
              class="font__14"
              @click="selectStatus(0)"
            >ошибка
            </li>
            <li
              class="font__14"
              @click="selectStatus(1)"
            >ok
            </li>
          </ul>
        </div>
      </div>
      <div class="film-update__buttons">
        <button
          class="btn btn-close"
          @click="closeForm($event)">закрыть
        </button>
        <button
          class="btn btn-save">
          сохранить
        </button>
      </div>

    </div>
  </div>

</template>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.film-update {
  @include brd-standard;
  position: fixed;
  left: 40%;
  top: 30%;
  padding: 12px;
  //min-width: 480px;
  background-color: $colorSecondary50;

  &__header {
    @include brd-standard;
    border-color: transparent;
    background-color: $colorPrimary600;
    padding: 12px;
    @include d-flex-center(space-between);
    margin-bottom: 12px;
    cursor: move;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__row {
    display: grid;
    grid-template-columns: 2fr 2.4fr;
    gap: 20px;
  }

  &__row-block {
    @include d-flex-center(space-between);
    gap: 8px;
    position: relative;
  }

  &__dropdown {
    @include brd-standard;
    position: absolute;
    top: 2rem;
    right: 0;
    list-style: none;
    min-width: 126px;
    background-color: $colorSecondary50;

    & li {
      padding: 4px 12px;

      &:hover {
        @include brd-standard;
        border-color: transparent;
        background-color: $colorPrimary200;
      }
    }
  }

  &__buttons {
    @include d-flex-center(end);
    gap: 4px;
  }
}

.input-small {
  max-width: 126px;
}

.chevron {
  position: absolute;
  right: 0;
  padding: 0 6px;
  cursor: pointer;
}
</style>
