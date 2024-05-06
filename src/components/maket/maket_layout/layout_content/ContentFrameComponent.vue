<template>
  <div class="content-frame"
  >
    {{ groupMame }}
  </div>

</template>

<script>
export default {
  name: "ContentFrameComponent",
  props: {
    groupData: Array,
    groupMame: String,
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";

.content-frame {
  width: 200mm;
  margin: 5mm 5mm 0 5mm;
}
</style>
