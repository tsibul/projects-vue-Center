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
    <div class="pen-small__items">
      <div class="pen-small__single-item"
           v-for="printItem in penData.print_item"
           :key="printItem.id"
      >
        <div class="pen-small__text">{{ printItem.place }}</div>
        <div class="pen-small__item">
          <div class="pen-small__image"
               v-html="currentHtml ? currentHtml.replace('itemWidth', '75') : currentHtml"
          >
          </div>
          <!--          <ul class="image-list">-->
          <!--            <li-->
          <!--                v-for="image in Object.keys(colorImages)"-->
          <!--                :key="image.id"-->
          <!--                v-html="colorImages[image][0].replace('itemWidth', '90mm')"-->
          <!--                :data-id="image"-->
          <!--                @click="selectImage($event, image)"-->
          <!--            >-->
          <!--            </li>-->
          <!--          </ul>-->
        </div>
        <div
            v-if="colorImages[currentImage]"
            @click="Object.keys(colorImages).length > 1 ? showImageList($event) : null"
            :data-id="currentImage"
        >
          <div class="pen-small__dropdown">
            <div>{{ colorImages[currentImage][2] }}</div>
            <font-awesome-icon
                v-if="Object.keys(colorImages).length > 1"
                :icon="['fas', 'chevron-down']"/>
          </div>
        </div>
        <ul class="image-list">
          <li
              v-for="image in Object.keys(colorImages)"
              :key="image.id"
              :data-id="image"
              @click="selectImage($event, image)"
          >
            {{ colorImages[image][2] }}
          </li>
        </ul>
        <!--        </div>-->
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
      currentImage: '1',
      currentHtml: null,
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
      event.target.closest('.pen-small__items').querySelector('.image-list').style.display = 'block';
    },
    selectImage(event, image) {
      event.target.closest('.image-list').style.display = 'none';
      this.currentImage = image;
      this.currentHtml = this.colorImages[this.currentImage][0];
    },
  },
  created() {
    (async () => {
      await this.setColorImages();
      this.currentHtml = this.colorImages[this.currentImage][0];
    })();
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.pen-small {
  font-size: 12px;
  display: grid;
  grid-template-columns: 1fr 5.5fr;
  align-items: center;
  gap: 4px;
  width: 100%;

  &__item {
    padding: 3px 0;
    display: flex;
    align-items: center;
    gap: 3px;
  }

  &__items {
    width: 100%;
  }

  &__single-item {
    padding-left: 6px;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 2.8fr repeat(2, 1fr);
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
    &:hover{
      background-color: $colorSecondary100;
    }
  }
  &__image{
    width: 80mm;
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
