<template>
  <div class="pen-small"
  >
    <div class="pen-small__text">
      <div>{{ penData['no'] }}</div>
      <input
          type="checkbox"
          class="check"
          :id="article">&nbsp;
      <label :for="article">{{ article }}</label>
    </div>
    <div >
      <div class="pen-small__single-item"
           v-for="printItem in printItemList"
           :key="printItem.id"
      >
        <!--        <div class="pen-small__text">{{ printItem.place }}</div>-->
        <div class="pen-small__item">
          <div class="pen-small__image"
               v-html="colorImages[printItem.image_id] ? colorImages[printItem.image_id][0].replace('itemWidth', '40') : colorImages"
          >
          </div>
        </div>
        <div class="pen-small__tech">
          <div
              v-if="colorImages[printItem.image_id]"
              @click="printItem.image_list.length > 1 ? showImageList($event) : null"
              :data-id="printItem.image_id"
          >
            <div class="pen-small__dropdown">
              <div>{{ colorImages[printItem.image_id][2] }}</div>
              <font-awesome-icon
                  v-if="printItem.image_list.length > 1"
                  :icon="['fas', 'chevron-down']"/>
            </div>
          </div>
          <input type="text" class="pen-small__color">
          <ul class="image-list">
            <li
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

<script>
import {setImageColors} from "@/components/maket/maket_layout/layout_content/setImageColors.js";

export default {
  name: "SinglePenSmallComponent",
  inject: ['appUrl', 'tokenName'],
  data() {
    return {
      article: this.penData['article'],
      colorImages: {},
      printItemList: this.penData.print_item,
    }
  },
  props: {
    penData: Object,
    penImages: Array
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
      event.target.closest('.image-list').style.display = 'none';
      const itemFromList = this.printItemList.find(item => item.id === printItem.id);
      itemFromList['image_id'] = image;
    },
  },
  created() {
    (async () => {
      await this.setColorImages();
    })();
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.pen-small {
  @include d-flex-center(space-between);
  font-size: 10px;
  gap: 4px;
  //width: 100%;

  &__item {
    padding: 3px 0;
    display: flex;
    align-items: center;
    gap: 3px;
    position: relative;
  }

  &__items {
    //width: 100%;
  }

  &__single-item {
    padding-left: 6px;
    //display: grid;
    //align-items: center;
    //grid-template-columns: 1fr 2.8fr repeat(2, 1fr);
    position: relative;
    width: 100%;
  }

  &__text {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__dropdown {
    @include d-flex-center(space-between);
    padding: 3px;
    @include brd-standard;
    border: transparent;

    &:hover {
      background-color: $colorSecondary100;
    }
  }

  &__image {
    //width: 80mm;
  }

  &__color {
    @include brd-standard;
    width: 100%;
  }

  &__tech {
    position: absolute;
    display: none;
    background-color: white;
  }

  &__item:hover {
  }
}

.image-list {
  display: none;
  position: absolute;
  list-style: none;
  background-color: white;
  top: 2rem;
  left: 112mm;
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


}

</style>
