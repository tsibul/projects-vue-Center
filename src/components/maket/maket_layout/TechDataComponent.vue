<template>
  <div class="no-print blank-header"></div>
  <header class="tech-data no-print">
    <button class="btn btn-close"
            @click="windowClose">закрыть</button>
    <button class="btn btn-save"
            @click="windowPrint">печать</button>
    <div></div>
    <div class="blank-header__item">
      <input type="checkbox"
             class="check"
             id="pictures"
             @change="togglePictures"
      >
      &nbsp;
      <label for="pictures">картинки</label>
    </div>
    <div class="blank-header__item">
      <input type="checkbox"
             class="check"
             id="frames"
             @change="toggleFrame"
             checked
      >
      &nbsp;
      <label for="frames">рамки</label>
    </div>
    <button class="btn btn-neutral"
            @click="showSort"
    >сортировка
    </button>
    <button class="btn btn-neutral"
            @click="showContent"
    >группы
    </button>
    <div></div>
    <input type="number"
           class="form-input"
           placeholder="номер макета"
           v-if="maketId === '0'">
    <input type="text"
           class="form-input long-input"
           placeholder="комментарий к макету"
           v-if="maketId === '0'">
    <button class="btn btn-save">сохранить&nbsp;макет</button>
    <button class="btn btn-neutral" v-if="maketId !== '0'">новый&nbsp;макет</button>
  </header>

</template>
<script>

export default {
  name: "TechDataComponent",
  emits: ['show-pictures', 'show-frame', 'show-sort', 'window-print', 'window-close', 'show-content'],
  props: {
    maketId: String,
  },
  data() {
    return {
      showPictures: false,
      showFrame: true
    }
  },
  methods: {
    togglePictures() {
      this.showPictures = !this.showPictures;
      this.$emit('show-pictures', this.showPictures);
    },
    toggleFrame() {
      this.showFrame = !this.showFrame;
      this.$emit('show-frame', this.showFrame);
    },
    showSort() {
      this.$emit('show-sort')
    },
    showContent(){
      this.$emit('show-content')
    },
    windowPrint(){
      this.$emit('window-print')
    },
    windowClose(){
      this.$emit('window-close')
    },
  }
}
</script>


<style scoped lang="scss">
@import "@/assets/maket/scss/vars";

.tech-data {
  display: flex;
  align-items: center;
  padding: 12px;
  gap: 12px;
  position: fixed;
  top: 0;
  background-color: $colorPrimary100;
  z-index: 3;
  width: 100%;
}

.long-input {
  width: 100%;
}

.blank-header {
  height: 63px;

  &__item {
    display: flex;
    align-items: center;
  }
}
</style>
