<script>
export default {
  name: 'FilmGroupCommentComponent',
  inject: ['appUrl', 'tokenName'],
  emits: ['close-form'],
  props: {
    group: Object
  },
  data() {
    return {
      currentGroup: this.group
    }
  },
  methods: {
    closeForm(event) {
      event.stopPropagation()
      this.$emit('close-form')
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
      v-model="currentGroup.comment">
    <div class="comment__buttons">
      <button
        class="btn btn-close"
        @click="closeForm($event)"
      >
        отменить
      </button>
      <button class="btn btn-save">сохранить</button>
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
