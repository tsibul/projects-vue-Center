<script>
import { fetchData } from '@/components/services/fetchData.js'
import FilmGroupCommentComponent from '@/components/maket/film/FilmGroupCommentComponent.vue'

export default {
  name: 'FilmGroupSingleComponent',
  components: { FilmGroupCommentComponent },
  inject: ['appUrl', 'tokenName'],
  props: {
    group: Object
  },
  data() {
    return {
      currentGroup: this.group,
      commentShow: false
    }
  },
  methods: {
    async toggleStatus() {
      const url = `${this.appUrl}toggle_film_status/${this.group.id}`
      const response = await fetchData(url, this.tokenName)
      if(response === this.group.id){
        this.currentGroup.status = !this.currentGroup.status
      }
    },
    closeComment(){
      this.commentShow = false
    },
    showComment(){
      this.commentShow = true
    },
  }
}
</script>

<template>
  <div
    class="film-group font__14"
  >
    <div :class="group.deleted ? 'inactive' : ''">{{ group.item }}</div>
    <div :class="group.deleted ? 'inactive' : ''">{{ group.printName }}</div>
    <div :class="group.deleted ? 'inactive' : ''">{{ group.maketNumber }}</div>
    <div :class="group.deleted ? 'inactive' : ''">{{ group.orderNumber }}</div>
    <div :class="group.deleted ? 'inactive' : ''">{{ group.orderDate }}</div>
    <div :class="group.deleted ? 'inactive' : ''">{{ group.customer }}</div>
    <div :class="group.deleted ? 'inactive' : ''">{{ group.printType }}</div>
    <div :class="group.deleted ? 'inactive' : ''">{{ group.comment }}</div>
    <div :class="group.deleted ? 'inactive' : ''">{{ group.status ? 'ok' : 'ошибка' }}</div>
    <button
      @click="toggleStatus"
      v-if="!group.status"
      class="btn btn-save-inverted tooltip">
      <font-awesome-icon :icon="['far', 'thumbs-up']" />
      <div class="tooltip-text">поменять&nbsp;статус&nbsp;на&nbsp;OK</div>
    </button>
    <button
      @click="toggleStatus"
      v-else
      class="btn btn-close-inverted tooltip">
      <font-awesome-icon :icon="['far', 'thumbs-down']" />
      <div class="tooltip-text">поменять&nbsp;статус&nbsp;на&nbsp;ошибка</div>
    </button>
    <button
      class="btn btn-neutral-inverted font__14 tooltip comment"
      @click="showComment"
    >
      <font-awesome-icon :icon="['far', 'comment']" />
      <div class="tooltip-text">поменять&nbsp;/&nbsp;добавить&nbsp;комментарий</div>
      <FilmGroupCommentComponent
        v-if="commentShow"
        :group="group"
        @close-form="closeComment"
      />
    </button>
    <button
      v-if="!group.deleted"
      class="btn btn-close-inverted font__14  tooltip">
      <font-awesome-icon :icon="['fas', 'x']" />
      <div class="tooltip-text">убрать&nbsp;с&nbsp;пленки</div>
    </button>
    <button
      v-else
      class="btn btn-save-inverted font__14  tooltip">
      <font-awesome-icon :icon="['fas', 'check']" />
      <div class="tooltip-text">вернуть&nbsp;на&nbsp;пленку</div>
    </button>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.film-group {
  display: grid;
  align-items: center;
  gap: 4px;
  padding: 2px 0 2px 12px;
  border-radius: 10px;
  flex-wrap: nowrap;
  grid-template-columns: 1fr 3fr 1fr 2.5fr 1fr 4fr 2fr 3fr 1fr repeat(3, 1fr);
  margin-right: 19px;

  &:hover {
    background-color: $colorPrimary100;
  }

}

.tooltip-text {
  right: 0;
  top: -2rem;
}


</style>
