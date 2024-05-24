<script>
import {setImageColors} from "@/components/maket/maket_layout/layout_content/setImageColors.js";

export default {
  name: "SingleNoteSmallComponent",
  inject: ['appUrl', 'tokenName'],
  emits: ['print-item-checked'],
  data() {
    return {
      currentNoteData: this.noteData,
      article: this.noteData['article'],
      colorImages: {},
    }
  },
  props: {
    noteData: Object,
    noteImages: Array,
    selectAll: Boolean,
    totalOrientation: Array,
  },
  methods: {
    async setColorImages() {
      for (const image of this.noteImages) {
        this.colorImages[image[0]] = [await setImageColors(this.article, image[1], this.appUrl, this.tokenName),
          image[2], image[3], image[4]];
      }
    },
    showImageList(event) {
      console.log()
      event.target.closest('.note-small__single-item').querySelector('.image-list').style.display = 'block';
    },
    selectImage(event, image, printItem) {
      const printItemId = printItem.id;
      const selectedImage = this.colorImages[image]
      event.target.closest('.image-list').style.display = 'none';
      const itemFromList = this.currentNoteData.print_item.find(item => item.id === printItemId);
      itemFromList['image_id'] = image;
      itemFromList['position_id'] = selectedImage[1];
      itemFromList['position'] = selectedImage[2];
      if (event.target.closest('.note-small__single-item').querySelector('.check').checked) {
        this.$emit('print-item-checked', [itemFromList.id, this.colorImages[itemFromList.image_id]])
      }
    },
    printItemChecked(event, printItem) {
      if (event.checked) {
        this.$emit('print-item-checked', [printItem.id, this.colorImages[printItem.image_id]]);
        printItem.checked = true;
      } else {
        this.$emit('print-item-checked', [printItem.id, null]);
        printItem.checked = false;
      }
    },
    selectAllHandler() {
      const block = document.getElementById(`${this.currentNoteData['id']}`);
      block.querySelectorAll('.check').forEach(el => {
        el.checked = this.selectAll;
        const printItem = this.currentNoteData.print_item.find(item => item.id === Number(el.id));
        this.printItemChecked(el, printItem);
      });
    },
    setAllPositions() {
      this.currentNoteData.print_item.forEach(itemFromList => {
        const selectedImage = this.colorImages[itemFromList['image_id']]
        itemFromList['position_id'] = selectedImage[1];
        itemFromList['position'] = selectedImage[2];
      });
    },
    setAllPositionChanged() {
      this.currentNoteData.print_item.forEach(itemFromList => {
        const checkBoxValue = document.getElementById(itemFromList.id).checked;
        if (checkBoxValue) {
          this.$emit('print-item-checked', [itemFromList.id, this.colorImages[itemFromList.image_id]])
        }
      });
    },
    changePrintItemColor(event, printItem, index){
      printItem.color[index]['pantone'] = event.target.value;
    }
  },
  created() {
    (async () => {
      await this.setColorImages();
      this.setAllPositions();
      this.currentNoteData.print_item.forEach(printItem => {
        const checkbox = document.getElementById(printItem.id);
        if(printItem.checked){
          this.printItemChecked(checkbox, printItem);
        }
      });

    })();
  },
  watch: {
    selectAll: {
      handler: 'selectAllHandler'
    },
    totalOrientation: {
      handler: 'setAllPositionChanged'
    }
  }
}
</script>

<template>
  <div class="note-small"
       :id="currentNoteData.id"
  >
    <div class="active">{{ currentNoteData['no'] }}</div>
    <div class="note-small__prints">
      <div class="note-small__single-item"
           v-for="printItem in currentNoteData.print_item"
           :key="printItem"
      >
        <div class="note-small__item">
          <div class="note-small__image"
               v-html="colorImages[printItem.image_id] ? colorImages[printItem.image_id][0].replace('itemWidth', '20') : colorImages"
          >
          </div>
        </div>
        <div class="note-small__text">
          <input
              type="checkbox"
              class="check"
              :id="printItem.id"
              :checked="printItem.checked"
              @change="printItemChecked($event.target, printItem)"
          >&nbsp;
          <label :for="printItem.id"
                 class="note-small__wrap"
          >
            {{ article }}</label>
        </div>
        <div class="note-small__tech no-print">
          <div
              v-if="colorImages[printItem.image_id]"
              @click="printItem.image_list.length > 1 ? showImageList($event) : null"
              :data-id="printItem.image_id"
          >
            <div class="note-small__dropdown">
              <div class="image-list__nowrap">{{ colorImages[printItem.image_id][2] }}</div>
              &nbsp;
              <font-awesome-icon
                  v-if="printItem.image_list.length > 1"
                  :icon="['fas', 'chevron-down']"/>
            </div>
          </div>
          <div
              v-for="(color, index) in printItem.color"
              :key="index"
              class="note-small__color-set"
              @keydown.enter="changePrintItemColor($event, printItem, index)"
          >
            <div>{{ index + 1 }}</div>
            <input type="text"
                   class="note-small__color"
                   :value="color['pantone']"
            >
          </div>
          <ul class="image-list">
            <li class="image-list__nowrap"
                v-for="image in printItem.image_list"
                :key="image.id"
                :data-id="image"
                @click="selectImage($event, image, printItem)"
            >
              <div v-if="colorImages[image]">{{ colorImages[image][2] }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.note-small {
  @include d-flex-center(flex-start);
  font-size: 8px;

  &__prints {
    display: flex;
    width: 100%;
  }

  &__item {
    padding: 3px 0;
    display: flex;
    align-items: center;
    gap: 3px;
    position: relative;
  }

  &__tech {
    border: 1px solid $colorPrimary800;
    border-radius: 10px;
    font-size: 12px;
    padding: 6px;
    position: absolute;
    z-index: 1;
    left: 0;
    top: 22mm;
    @include d-flex-center(space-between);
    gap: 12px;
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
    background-color: $colorPrimary200;
    opacity: 0;
    visibility: hidden;
    transition-delay: 0.1s;
  }

  &__single-item {
    padding: 3px 3px 3px 6px;
    position: relative;
    @include d-flex-center(space-between);
    flex-direction: column;
    gap: 4px;

    &:hover .note-small__tech {
      transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
      transition-delay: 0.2s;
      opacity: 1;
      visibility: visible;
    }
  }

  &__text {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__dropdown {
    @include d-flex-center(space-between);
    padding: 3px;
    @include brd-standard;
    border: transparent;

    &:hover {
      background-color: $colorPrimary100;
    }
  }

  &__color-set {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__color {
    @include brd-standard;
    max-width: 60px;
    font-size: 12px;
    padding: 4px 10px;
  }

  &__wrap {
    text-overflow: ellipsis;
  }

}

.image-list {
  display: none;
  position: absolute;
  list-style: none;
  background-color: white;
  top: 1rem;
  z-index: 5;
  @include brd-standard;

  & li {
    padding: 4px 1mm;
    border: solid 0.5px transparent;
    border-radius: 6px;
  }

  & li:hover {
    background-color: $colorSecondary100;
  }

  &__nowrap {
    text-wrap: nowrap;
  }
}

</style>
