<template>
  <div class="single-group">
    <div class="single-group__header">
      <div class="single-group__header_item">
      {{ groupName }}
    </div>
    <div class="single-group__header_item">
      <input type="checkbox"
             :id="groupName"
             checked
             class="check-small">
      &nbsp;
      <label class=""
             :for="groupName">в макете</label>
    </div>
  </div>
    <div class="single-group__content">
      <div class="single-group__item" v-for="item in groupData"
           :key="item.id">
        <div>артикул</div>
        <div>{{ item.article }}</div>
        <div>нанесение</div>
        <div>{{ item.print_name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemSingleGroupComponent",
  props: {
    groupKey: String,
    groupData: Array
  },
  data() {
    return {
      groupName: `артикул: ${this.groupKey.replace('()', ' нанесение: ')}`
    }
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.single-group {
  @include brd-standard();
  position: relative;
  background-color: $colorSecondary50;
  padding: 8px 12px;
  width: 1200px;


  &__header {
    display: grid;
    justify-content: space-between;
    position: absolute;
    top: -20px;
    left: 32px;
    width: 700px;
    grid-template-columns: 8fr 2fr;

    &_item {
      @include brd-standard();
      display: flex;
      align-items: center;
      border-color: transparent;
      background-color: $colorSecondary50;
      padding: 8px;
      width: fit-content;
    }
  }

  &__content {
    margin-top: 16px;
    display: grid;
    grid-template-columns: auto;
  }

  &__item {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 3fr;
    gap: 12px;
    padding: 4px 12px;

    &:hover {
      @include brd-standard;
      border-color: transparent;
      background-color: $colorPrimary100;
      cursor: move;
    }
  }
}

.check-small {
  height: 14px;
  accent-color: $colorPrimary800;
}

</style>
