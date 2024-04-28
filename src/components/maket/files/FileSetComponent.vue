<template>
  <DeleteAlertComponent
      v-if="showDeleteAlert"
      @closeForm="showDeleteAlert=false"
      @deleted="handleDeleted"
      :deleteUrl="deleteUrl"
  />
</template>

<script>
import DeleteAlertComponent from "@/components/delete_alert/DeleteAlertComponent.vue";

export default {
  name: "FileSetComponent",
  components: {DeleteAlertComponent},
  inject: ['tokenName', 'appUrl'],
  props: {
    searchString: String,
    order: String,
    showUnDeleted: Boolean,
  },
  data(){
    return{
     showDeleteAlert: false,
     deleteUrl: null,
    }
  },
  methods:{
    handleDeleted(){}
  }
}
</script>


<style scoped lang="scss">

</style>
