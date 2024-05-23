<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'TechDataComponent',
  components: { FontAwesomeIcon },
  emits: [
    'save-maket',
    'show-sort',
    'window-print',
    'window-close',
    'show-content',
    'tech-info-changed'
  ],
  props: {
    orderId: String,
    maketId: String,
    formatList: Object,
    formatSelected: Number,
    techInfo: Object
  },
  data() {
    return {
      currentTechInfo: {}
    }
  },
  methods: {
    saveMaket() {
      this.$emit('save-maket')
    },
    togglePictures() {
      this.currentTechInfo['pictureShow'] = !this.currentTechInfo['pictureShow']
      this.$emit('tech-info-changed', this.currentTechInfo)

    },
    toggleFrame() {
      this.currentTechInfo['frameShow'] = !this.currentTechInfo['frameShow']
      this.$emit('tech-info-changed', this.currentTechInfo)
    },
    toggleTable() {
      this.currentTechInfo['tableShow'] = !this.currentTechInfo['tableShow']
      this.$emit('tech-info-changed', this.currentTechInfo)
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
      event.target.closest('.format__block').querySelector('.format__list').style.display = 'block'
    },
    selectFormat(event, item) {
      event.preventDefault()
      event.target.closest('.format__list').style.display = 'none'
      this.currentTechInfo['formatSelected'] = item
      this.$emit('tech-info-changed', this.currentTechInfo)
    },
    selectMaket(maketId, orderId){
      if(Number(maketId) !== Number(this.maketId)) {
        window.location.href = `http://localhost:5173/maket/layout?maketId=${maketId}&orderId=${orderId}`;
      }
    },
  },
  watch: {
    techInfo: {
      immediate: true,
      handler(newVal) {
        this.currentTechInfo = newVal
      }
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
        <div class="format__text"
             v-if="currentTechInfo"
        >
          {{ formatList[currentTechInfo['formatSelected']][0] }}
        </div>
        &nbsp;
        <font-awesome-icon :icon="['fas', 'chevron-down']" />
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
      <input
        v-if="currentTechInfo"
        type="checkbox"
        class="check"
        id="table"
        @change="toggleTable"
        :checked="currentTechInfo['tableShow']"
      >
      &nbsp;
      <label for="table"
             class="check">таблица</label>
    </div>
    <div class="blank-header__item">
      <input
        v-if="currentTechInfo"
        type="checkbox"
        class="check"
        id="pictures"
        @change="togglePictures"
        :checked="currentTechInfo['pictureShow']"
      >
      &nbsp;
      <label class="check"
             for="pictures">картинки</label>
    </div>
    <div class="blank-header__item">
      <input
        v-if="currentTechInfo"
        type="checkbox"
        class="check"
        id="frames"
        @change="toggleFrame"
        :checked="currentTechInfo['frameShow']"
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
    <input
      v-if="currentTechInfo"
      type="number"
      class="form-input short-input"
      placeholder="номер макета"
      v-model="currentTechInfo['maketNumber']"
    >
    <input
      v-if="currentTechInfo"
      type="text"
      class="form-input long-input"
      placeholder="комментарий к макету"
      v-model="currentTechInfo['maketComment']">
    <button
      class="btn btn-save"
      @click="saveMaket"
    >сохранить&nbsp;макет
    </button>
    <div>выбрать&nbsp;макет:</div>
    <div class="btn btn-neutral maket-btn">
      <div class="maket-btn__title">
        <div>
          {{ currentTechInfo.maketId ? currentTechInfo.maketNumber
          + '\u00A0от\u00A0' + currentTechInfo.maketDate : 'новый\u00A0макет' }}
        </div>
        <font-awesome-icon :icon="['fas', 'chevron-down']" />
      </div>
      <ul class="maket-list">
        <li value="0"
            @click="selectMaket('0', orderId)"
            v-show="Number(maketId) !== 0"
        >новый&nbsp;макет</li>
        <li
          v-for="maket in currentTechInfo['maketData']"
          :key="maket.id"
          value="maket.Id"
          v-show="Number(maketId) !== Number(maket.id)"
          @click="selectMaket(maket.id, orderId, $event)"
        >{{ maket.maket_number }}&nbsp;от&nbsp;{{ maket.date }}
        </li>
      </ul>
    </div>
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
  z-index: 7;
  width: 100%;
}

.long-input {
  width: 100%;
}

.short-input {
  width: 60px;
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

.maket-btn {

  &__title {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  &:hover .maket-list {
    display: block;
  }
}

.maket-list {
  display: none;
  position: absolute;
  list-style: none;
  background-color: white;
  @include brd-standard;
  top: 3rem;
  right: 10px;

  & li {
    min-width: 152px;
    padding: 7px 20px 7px 12px;

    &:hover {
      background-color: $colorPrimary100;
      @include brd-standard;
      border-color: transparent;
    }
  }
}
</style>
