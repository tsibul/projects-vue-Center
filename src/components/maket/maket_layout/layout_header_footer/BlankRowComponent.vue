<script>
export default {
  name: "BlankRowComponent",
  methods:{
    addBlankRow(event){
      const row = document.createElement('div');
      row.classList.add('empty-row');
      row.style.height = '16px';
      row.textContent= '';
      let frame = event.target.closest('.content-frame')
      if (!frame){
        frame = event.target.closest('.maket-footer');
      }
      const print = frame.closest('.maket-layout__print')
      print.insertBefore(row, frame)
    },
    removeBlankRow(event){
      let frame = event.target.closest('.content-frame')
      if (!frame){
        frame = event.target.closest('.maket-footer');
      }
      const row = frame.previousElementSibling;
      if(row.classList.contains('empty-row')) {
        row.remove();
      }
    },
  },

}
</script>

<template>
  <div class="blank-row no-print">
    <button
        class="btn-inline"
        @click="addBlankRow($event)"
    >
      <font-awesome-icon :icon="['fas', 'chevron-down']"/>
      <span class="tooltip-text">сдвинуть&nbsp;вниз</span>
    </button>
    &nbsp;
    <button
        class="btn-inline"
        @click="removeBlankRow($event)"
    >
      <font-awesome-icon :icon="['fas', 'chevron-up']"/>
      <span class="tooltip-text">сдвинуть&nbsp;вверх</span>
    </button>
  </div>

</template>

<style scoped lang="scss">
@import "@/assets/maket/scss/mixins";
@import "@/assets/maket/scss/mixins";

.blank-row {
  position: absolute;
  display: flex;
  align-items: center;
  background-color: white;
  top: -0.6rem;
  padding: 0 4px;
}

.empty-row {
  height: 16px;
}

.btn-inline {
  @include brd-standard;
  padding: 1px 8px;
  font-size: 12px;
  background-color: $colorPrimary500;
  color: white;
  cursor: pointer;
  z-index: 5;
  transition: color 0.3s ease-out;
  position: relative;
  &:hover{
    color: $colorPrimary500;
    background-color: white;
  }
  &:hover .tooltip-text{
    visibility: visible;
  }
}

</style>
