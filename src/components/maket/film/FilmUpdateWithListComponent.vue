<script>
import { modalDragAndDrop } from '@/components/modal_drag_drop/modalDragAndDrop.js'
import { fetchData } from '@/components/services/fetchData.js'
import { submitForm } from '@/components/services/submitForm.js'

export default {
  name: 'FilmUpdateWithListComponent',
  inject: ['appUrl', 'tokenName'],
  emits: ['close-list', 'update-list'],
  mixins: [modalDragAndDrop],
  props: {
    film: Object
  },
  data() {
    return {
      groupList: null
      // currentGroups: this.groups,
    }
  },
  methods: {
    closeFilm() {
      this.$emit('close-list')
    },
    createGroupList() {
      const url = `${this.appUrl}maket_group_list_not_in_film`
      fetchData(url, this.tokenName).then(response => {
        if (response) {
          this.groupList = response
          this.groupList.forEach(group => {
            group['checked'] = false
          })
        }
      })
    },
    updateFilm() {
      const groupsChecked = []
      this.groupList.forEach(group => {
        if (group['checked']) {
          groupsChecked.push(group['id'])
        }
      })
      const url = `${this.appUrl}film_update_with_list/${this.film.id}`
      submitForm(url, this.tokenName, { 'checked': groupsChecked }).then(response => {
        if (response) {
          this.$emit('update-list', response)
        }
      })
    }
  },
  created() {
    this.createGroupList()
  }
}
</script>

<template>
  <div class="film-update-list" ref="modalDraggable"
       @mousedown="startDrag"
       @mouseup="stopDrag"
       @mousemove="drag">
    <div class="film-update-list__header active">
      <div>добавить&nbsp;списком&nbsp;на&nbsp;пленку&nbsp;{{ film.filmNumber }}</div>
      <span class="import__close"
            @click="closeFilm($event)">&times;</span>
    </div>
    <div class="film-update-list__row active margin-right">
      <div></div>
      <div>деталь</div>
      <div>нанесение</div>
      <div>клиент</div>
      <div>заказ</div>
      <div>макет</div>
    </div>
    <div class="film-update-list__content">

      <div
        class="film-update-list__row"
        v-for="(group, index) in groupList"
        :key="index"
      >
        <input
          type="checkbox"
          class="check"
          v-model="group.checked"
        >
        <div>{{ group.name.split('()')[0] }}</div>
        <div>{{ group.name.split('()')[1] }}</div>
        <div>{{ group.customer }}</div>
        <div>{{ group.order }}</div>
        <div>{{ group.maketNo }}&nbsp;{{ group.comment }}</div>
      </div>
    </div>
    <div class="film-update-list__buttons">
      <button
        class="btn btn-close"
        @click="closeFilm()">закрыть
      </button>
      <button
        class="btn btn-save"
        @click="updateFilm"
      >
        сохранить
      </button>
    </div>

  </div>
</template>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.film-update-list {
  @include brd-standard;
  position: fixed;
  left: 5vw;
  top: 80px;
  max-width: 90vw;
  padding: 12px;
  background-color: $colorSecondary50;
  z-index: 12;
  @include modal-shadow;

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
    //gap: 12px;
    max-height: calc(100vh - 250px);
    overflow-y: auto;
  }

  &__row {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1.5fr 5fr 5fr 4fr 3fr;
    padding: 5px 0;
    gap: 20px;
    @include brd-standard;
    border-color: transparent;

    &:hover {
      background-color: $colorPrimary200;
    }
  }

  &__buttons {
    @include d-flex-center(end);
    gap: 4px;
  }
}

.margin-right {
  margin-right: 19px;
  padding-bottom: 8px;
}
</style>
