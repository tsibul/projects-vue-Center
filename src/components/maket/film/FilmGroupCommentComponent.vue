<script>
import { submitForm } from '@/components/services/submitForm.js'

export default {
  name: 'FilmGroupCommentComponent',
  inject: ['appUrl', 'tokenName'],
  emits: ['close-form'],
  props: {
    group: Object
  },
  data() {
    return {
      currentGroup: this.group,
      comment: this.group.comment,
    }
  },
  methods: {
    closeForm(event) {
      event.stopPropagation()
      this.$emit('close-form')
    },
    async setComment(event){
      const url = `${this.appUrl}set_film_comment/${this.group.id}`
      const formData = {'comment': this.comment}
      const response = await submitForm(url,this.tokenName,formData)
      if(response === this.group.id){
        this.currentGroup.comment = this.comment
        this.closeForm(event)
      }
    }
  }
}
</script>

<template>
  <div class="comment">
    <div class="comment__header">
      <div>{{ group.item }}&nbsp;{{ group.printName }}&nbsp;(комментарий)</div>
      <span class="import__close"
            @click="closeForm($event)">&times;</span>
    </div>
    <input
      type="text"
      class="form-input comment__input"
      v-model="comment">
    <div class="comment__buttons">
      <button
        class="btn btn-close"
        @click="closeForm($event)"
      >
        отменить
      </button>
      <button
        class="btn btn-save"
        @click="setComment($event)"
      >
        сохранить
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.comment {
  min-width: 320px;
  color: $colorPrimary800;
  position: absolute;
  top: 2rem;
  right: 0;
  @include brd-standard;
  background-color: $colorSecondary50;
  padding: 8px;
  z-index: 10;

  &__header {
    text-wrap: nowrap;
    @include d-flex-center(space-between);
    background-color: $colorPrimary200;
    @include brd-standard;
    padding: 8px;
    margin-bottom: 4px;
  }

  &__input {
    width: 100%;
  }

  &__buttons {
    margin-top: 8px;
    width: 100%;
    @include d-flex-center(flex-end);
    gap: 4px;
  }

}
</style>
