<script>
import {setImageColors} from "@/components/maket/maket_layout/layout_content/setImageColors.js";

export default {
  name: "SinglePenSmallComponent",
  inject: ['appUrl', 'tokenName'],
  emits: ['position-selected'],
  data() {
    return {
      currentPenData: this.penData,
      article: this.penData['article'],
      colorImages: {},
    }
  },
  props: {
    penData: Object,
    penImages: Array,
  },
  methods: {
    async setColorImages() {
      for (const image of this.penImages) {
        this.colorImages[image[0]] = [await setImageColors(this.article, image[1], this.appUrl, this.tokenName),
          image[2], image[3]];
      }
    },
    showImageList(event) {
      console.log()
      event.target.closest('.pen-small__single-item').querySelector('.image-list').style.display = 'block';
    },
    selectImage(event, image, printItem) {
      const printItemId = printItem.id;
      const selectedImage = this.colorImages[image]
      event.target.closest('.image-list').style.display = 'none';
      const itemFromList = this.currentPenData.print_item.find(item => item.id === printItemId);
      itemFromList['image_id'] = image;
      itemFromList['position_id'] = selectedImage[1];
      itemFromList['position'] = selectedImage[2];
    },
    positionChanged() {
      this.$emit('position-selected', this.currentPenData);
    }
  },
  created() {
    (async () => {
      await this.setColorImages();
      this.currentPenData.print_item.forEach(itemFromList => {
        const selectedImage = this.colorImages[itemFromList['image_id']]
        itemFromList['position_id'] = selectedImage[1];
        itemFromList['position'] = selectedImage[2];
      });
      this.$emit('position-selected', [this.key, this.currentPenData]);
    })();
  },
  watch: {
    currentPenData: {
      handler: 'positionChanged',
      deep: true,
    },
  }
}
</script>

<template>
  <div class="pen-small"
  >
    <div>{{ currentPenData['no'] }}</div>
    <div class="pen-small__prints">
      <div class="pen-small__single-item"
           v-for="printItem in currentPenData.print_item"
           :key="printItem"
      >
        <div class="pen-small__text">
          <input
              type="checkbox"
              class="check"
              :id="article">&nbsp;
          <label :for="article"
                 class="pen-small__wrap"
          >
            {{ article }}</label>
        </div>
        <div class="pen-small__item">
          <div class="pen-small__image"
               v-html="colorImages[printItem.image_id] ? colorImages[printItem.image_id][0].replace('itemWidth', '40') : colorImages"
          >
          </div>
        </div>
        <div class="pen-small__tech no-print">
          <div
              v-if="colorImages[printItem.image_id]"
              @click="printItem.image_list.length > 1 ? showImageList($event) : null"
              :data-id="printItem.image_id"
          >
            <div class="pen-small__dropdown">
              <div class="image-list__nowrap">{{ colorImages[printItem.image_id][2] }}</div>
              &nbsp;
              <font-awesome-icon
                  v-if="printItem.image_list.length > 1"
                  :icon="['fas', 'chevron-down']"/>
            </div>
          </div>
          <input type="text" class="pen-small__color">
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

.pen-small {
  display: flex;
  align-items: center;
  font-size: 10px;
  //gap: 4px;

  &__prints {
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
    z-index: 3;
    left: 100%;
    top: -8px;
    @include d-flex-center(space-between);
    gap: 12px;
    transition: opacity 1s ease-in-out;
    background-color: $colorPrimary200;
    opacity: 0;
  }

  &__single-item {
    padding: 3px 3px 3px 6px;
    position: relative;
    @include d-flex-center(space-between);

    gap: 4px;

    &:hover .pen-small__tech {
      opacity: 1;
    }
  }

  &__text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    //gap: 4px;
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

  &__color {
    @include brd-standard;
    min-width: 60px;
    font-size: 14px;
    padding: 4px 10px;
  }

  &__wrap {
    word-break: break-all;
  }

}

.image-list {
  display: none;
  position: absolute;
  list-style: none;
  background-color: white;
  top: 1rem;
  //left: 112mm;
  z-index: 3;
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
