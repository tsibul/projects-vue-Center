<script>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "TechDataComponent",
  components: {FontAwesomeIcon},
  emits: [
    'show-pictures',
    'show-frame',
    'show-sort',
    'window-print',
    'window-close',
    'show-content',
    'show-table',
    'chosen-format'
  ],
  props: {
    maketId: String,
    formatList: Object,
    formatSelected: Number,
  },
  data() {
    return {
      showPictures: false,
      showFrame: true,
      showTable: true,
      currentFormatSelected: this.formatSelected,
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
    toggleTable() {
      this.showTable = !this.showTable;
      this.$emit('show-table', this.showTable);
    },
    showSort() {
      this.$emit('show-sort')
    },
    showContent() {
      this.$emit('show-content')
    },
    windowPrint() {
      this.$emit('window-print')
    },
    windowClose() {
      this.$emit('window-close')
    },
    showFormatList(event) {
      event.target.closest('.format__block').querySelector('.format__list').style.display = 'block';
    },
    selectFormat(event, item) {
      event.preventDefault();
      event.target.closest('.format__list').style.display = 'none';
      this.currentFormatSelected = item;
      this.$emit('chosen-format', item)
    }
  }
}
</script>

<template>
  <div class="no-print blank-header"></div>
  <header class="tech-data no-print">
    <button class="btn btn-close"
            @click="windowClose">закрыть
    </button>
    <button class="btn btn-save"
            @click="windowPrint">печать
    </button>
    <div></div>
    <div class="blank-header__item">
      <div>формат:</div>
      &nbsp;
      <div class="format__block"
           @click="showFormatList($event)"
      >
        <div class="format__text">{{ formatList[currentFormatSelected][0] }}</div>
        &nbsp;
        <font-awesome-icon :icon="['fas', 'chevron-down']"/>
        <ul class="format__list">
          <li v-for="item in Object.keys(formatList)"
              :key="item"
              :value="item"
              @mousedown="selectFormat($event, item)"
          >
            {{ formatList[item][0] }}
          </li>
        </ul>
      </div>
      &emsp;
      <input type="checkbox"
             class="check"
             id="table"
             @change="toggleTable"
             checked
      >
      &nbsp;
      <label for="table"
             class="check">таблица</label>
    </div>
    <div class="blank-header__item">
      <input type="checkbox"
             class="check"
             id="pictures"
             @change="togglePictures"
      >
      &nbsp;
      <label class="check"
             for="pictures">картинки</label>
    </div>
    <div class="blank-header__item">
      <input type="checkbox"
             class="check"
             id="frames"
             @change="toggleFrame"
             checked
      >
      &nbsp;
      <label for="frames"
             class="check">рамки</label>
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

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

* {
  font-family: 'Montserrat', sans-serif;
}

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


.format {
  &__block {
    position: relative;
    @include d-flex-center(space-between);
    @include brd-standard;
    padding: 8px 6px;
    cursor: pointer;
    min-width: 140px;

    &:hover {
      background-color: white;
    }
  }

  &__text {
    text-wrap: nowrap;
  }

  &__list {
    @include brd-standard;
    display: none;
    position: absolute;
    list-style: none;
    background-color: white;
    top: 2rem;
    left: -2px;
    z-index: 5;
    width: 100%;

    & li {
      @include brd-standard;
      border-color: transparent;
      padding: 8px 6px;

      &:hover {
        background-color: $colorPrimary100;
      }

    }
  }
}
</style>
