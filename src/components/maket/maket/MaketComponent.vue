<script>
import ClauseHeadingComponent from '@/components/maket/ClauseHeadingComponent.vue'
import DeleteAlertComponent from '@/components/delete_alert/DeleteAlertComponent.vue'
import MaketSingleComponent from '@/components/maket/maket/MaketSingleComponent.vue'
import { fetchData } from '@/components/services/fetchData.js'
import FileImportComponent from '@/components/file_import/FileImportComponent.vue'
import AdditionalFileComponent from '@/components/maket/additional_files/AdditionalFileComponent.vue'

export default {
  name: 'MaketComponent',
  components: {
    AdditionalFileComponent,
    FileImportComponent,
    MaketSingleComponent,
    DeleteAlertComponent,
    ClauseHeadingComponent
  },
  inject: ['appUrl', 'tokenName'],
  data() {
    return {
      showDeleted: false,
      searchString: 'default',
      idLast: 0,
      orderList: [],
      showDeleteAlert: false,
      deleteUrl: null,
      hideUploadForm: true,
      maketIdToUpload: null,
      orderIdToUpload: null,
      openFiles: false,
      filesId: null
    }
  },
  methods: {
    search(searchInput) {
      if (searchInput !== '') {
        this.searchString = searchInput.replace(' ', '_')
      } else {
        this.searchString = 'default'
      }
      this.idLast = 0
      this.orderList = []
      this.addNextRecords()
    },
    hideDeletedChange(checked) {
      this.showDeleted = checked
    },
    async allOrders() {
      const maketListUrl = `${this.appUrl}maket_list/${this.searchString}/${this.showDeleted ? 1 : 0}/${this.idLast}`
      return await fetchData(maketListUrl, this.tokenName)
    },
    addNextRecords() {
      this.allOrders().then(newData => {
        if (newData.length) {
          this.idLast = this.idLast + 20
          if (this.orderList) {
            this.orderList = [...this.orderList, ...newData]
          } else {
            this.orderList = newData
          }
        }
      })
    },
    async hideDeletedChecked() {
      this.idLast = 0
      this.orderList = []
      this.addNextRecords()
    },
    handleDeleteAlert(url) {
      this.deleteUrl = url
      this.showDeleteAlert = true
    },
    handleDeleted(maketDeleted) {
      const order = this.orderList.find((order) => order.maketList.some(el => el.id === maketDeleted))
      const deletedIndex = order.maketList.findIndex(el => el.id === Number(maketDeleted))
      if (order.maketList[deletedIndex].file) {
        order.maketQuantity -= 1
      }
      order.maketList[deletedIndex].maketDeleted = true
      this.showDeleteAlert = false
    },
    async maketImported(success) {
      if (success) {
        const orderUrl = `${this.appUrl}maket_file_save/${this.maketIdToUpload}`
        const fileName = await fetchData(orderUrl, this.tokenName)
        const order = this.orderList.find((el) => el.id === this.orderIdToUpload)
        const maket = order.maketList.find(el => el.id === this.maketIdToUpload)
        const prevFileName = maket['file'] === ''
        maket['file'] = fileName
        order['maketStatus'] = 'R'
        if (prevFileName) {
          order['maketQuantity'] += 1
        }
        this.maketIdToUpload = null
        this.orderIdToUpload = null
      }
    }
    ,
    beginLoadingMaketFile(data) {
      this.hideUploadForm = false
      this.maketIdToUpload = data[0]
      this.orderIdToUpload = data[1]
    },
    handleCloseFiles() {
      this.openFiles = false
      this.filesId = null
    },
    handleOpenFiles(orderId) {
      this.openFiles = true
      this.filesId = orderId
    },
    handleFileDeleted(orderId) {
      const order = this.orderList.find((order) => order.pk === orderId)
      order.files -= 1
    },
    handleFileImported(orderId) {
      const order = this.orderList.find((order) => order.pk === orderId)
      order.files += 1
    },
    handleFileReconnected(reconnectData, orderId) {
      const orderNew = this.orderList.find((order) => order.pk === orderId)
      orderNew.files += 1
      const orderOld = this.orderList.find((order) => order.pk === reconnectData)
      orderOld.files -= 1
    }
  },
  created() {
    this.addNextRecords()
    // (async () => {
    //   await this.addNextRecords()
    // })()
  },
  watch: {
    showDeleted: {
      handler: 'hideDeletedChecked'
    }
  }
}
</script>


<template>
  <div class="maket">
    <ClauseHeadingComponent
      :title="'Заказы с макетами'"
      :icon="'images'"
      :font-class="{'font__normal': true}"
      :check-box-deleted="true"
      :check-box-deleted-text="'показать все'"
      :check-box-status="showDeleted"
      @search-string="search"
      @hide-deleted-change="hideDeletedChange"
    />
    <div class="maket__row active ">
      <div>номер&nbsp;</div>
      <div>дата</div>
      <div>клиент</div>
      <div>файлы</div>
      <div class="maket__row_right">
        <div>макет</div>
        <div>создан</div>
        <div>прим.</div>
        <div>файл</div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="maket__content">
      <MaketSingleComponent
        v-for="(order, index) in orderList"
        :key="index"
        :order="order"
        :index="index"
        @mouseover="index + 1 === orderList.length ? addNextRecords() : null"
        @delete-alert="handleDeleteAlert"
        @load-maket-file="beginLoadingMaketFile"
        @open-files="handleOpenFiles(order.id)"
      />
    </div>
  </div>
  <DeleteAlertComponent
    v-if="showDeleteAlert"
    @closeForm="showDeleteAlert=false"
    @deleted="handleDeleted"
    :deleteUrl="deleteUrl" />
  <FileImportComponent
    v-if="!hideUploadForm"
    :fileType="'.pdf'"
    @closeForm="hideUploadForm=true"
    @file-loaded="maketImported"
  />
  <AdditionalFileComponent
    v-if="openFiles"
    @close-files="handleCloseFiles"
    :orderId="filesId"
    @one-file-deleted="handleFileDeleted(filesId)"
    @one-file-imported="handleFileImported(filesId)"
    @file-reconnected="handleFileReconnected($event, filesId)"
  />

</template>


<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.maket {
  @include brd-standard;
  border-color: transparent;

  &__row {
    display: grid;
    align-items: center;
    gap: 4px;
    padding: 4px 0 4px 12px;
    border-radius: 10px;
    flex-wrap: nowrap;
    grid-template-columns: 1.5fr 0.6fr 3fr 0.7fr 8.5fr;
    margin-right: 19px;

    &_right {
      display: grid;
      align-items: center;
      padding: 4px 0 4px 12px;
      gap: 4px;
      grid-template-columns: 1.2fr  0.6fr 1fr 3fr repeat(2, 0.4fr);
    }
  }


  &__content {
    max-height: calc(100vh - 210px);
    overflow-y: scroll;
    font-size: 15px;
  }
}
</style>
