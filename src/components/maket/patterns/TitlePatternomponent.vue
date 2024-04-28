<script setup>

</script>

<template>
  <div class="title-row active">
    <div>продукция</div>
    <div>название</div>
    <div>шаблон нанесения</div>
    <button class="btn btn-save"
            @click="newRecord">добавить
    </button>
  </div>


</template>

<script>
export default {
  name: 'TitlePatternComponent',
  data() {
    return {
      param: false
    }
  },
  props: {
    rowClass: Object,
    dictionaryName: String,
  },
  emits: ['show-form'],
  methods: {
    newRecord() {
      this.param = !this.param;
      this.$emit('show-form', this.param);
    },
  },

}

</script>


<style scoped lang="scss">
.title-row {
  display: grid;
  grid-template-columns: 4fr 5fr 7fr 4fr;
  margin-right: 19px;
  align-items: center;
  gap: 10px;
  padding: 8px 8px;
  border-radius: 10px;
  flex-wrap: nowrap;
}

</style>
