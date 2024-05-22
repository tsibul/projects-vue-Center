<script>
import { fetchData } from '@/components/services/fetchData.js'
import TechDataComponent from '@/components/maket/maket_layout/layout_settings/TechDataComponent.vue'
import MaketHeaderComponent from '@/components/maket/maket_layout/layout_header_footer/MaketHeaderComponent.vue'
import MaketFooterComponent from '@/components/maket/maket_layout/layout_header_footer/MaketFooterComponent.vue'
import MaketContentTableComponent
  from '@/components/maket/maket_layout/layout_header_footer/MaketContentTableComponent.vue'
import ItemGroupingComponent from '@/components/maket/maket_layout/layout_settings/ItemGroupingComponent.vue'
import ShowGroupComponent from '@/components/maket/maket_layout/layout_settings/ShowGroupComponent.vue'
import ContentFrameComponent from '@/components/maket/maket_layout/layout_content/ContentFrameComponent.vue'
import { formatList } from '@/components/maket/maket_layout/layout_content/formatListData.js'
import { defaultGroupLayoutData } from '@/components/maket/maket_layout/layout_settings/defaultGroupLayoutData.js'
import { submitForm } from '@/components/services/submitForm.js'

export default {
  name: 'MaketLayoutComponent',
  computed: {
    formatList() {
      return formatList
    }
  },
  components: {
    ContentFrameComponent,
    ShowGroupComponent,
    ItemGroupingComponent,
    MaketContentTableComponent,
    MaketFooterComponent, MaketHeaderComponent, TechDataComponent
  },
  inject: ['appUrl', 'tokenName'],
  data() {
    return {
      orderId: null,
      maketId: null,
      maketData: null,
      showSort: false,
      sourceGroupName: null,
      showContent: false,
      itemGroupsKeys: null
    }
  },
  methods: {
    async getMaketData() {
      const maketUrl = `${this.appUrl}maket_info/${this.maketId}/${this.orderId}`
      this.maketData = await fetchData(maketUrl, this.tokenName)
    },
    async saveMaket() {
      const saveUrl = `${this.appUrl}maket_save`
      const formData = {
        'order_id': this.orderId,
        'maket_id': this.maketId,
        'item_data': this.maketData['itemGroups'],
        'tech_info': this.maketData['techInfo'],
        'group_layout': this.maketData['groupLayoutData'],
        'before_footer': this.maketData['beforeFooter']
      }
      const response = await submitForm(saveUrl, this.tokenName, formData)
      this.maketId = response.toString()
    },
    contentShow() {
      this.showContent = !this.showContent
    },
    sortShow() {
      this.showSort = !this.showSort
    },
    handleItemDrag(element) {
      this.sourceGroupName = element.groupKey
    },
    handleItemDrop(element) {
      this.draggingItem = element.item
      const targetGroupName = element.groupKey
      const targetGroup = this.maketData['itemGroups'][targetGroupName]
      targetGroup.unshift(this.draggingItem.item)
      targetGroup.sort((a, b) => a.article.localeCompare(b.article))
      const sourceGroup = this.maketData['itemGroups'][this.sourceGroupName]
      const itemIndex = sourceGroup.findIndex(el => el.id === element.item.item.id)
      sourceGroup.splice(itemIndex, 1)
      sourceGroup.sort((a, b) => a.article.localeCompare(b.article))
      this.sourceGroupName = null
      this.draggingItem = null
    },
    toggleCheckGroup(group) {
      this.maketData['groupLayoutData'][group]['show'] = !this.maketData['groupLayoutData'][group]['show']
    },
    windowClose() {
      window.close()
    },
    windowPrint() {
      window.print()
    },
    techInfoChanged(currentTechInfo) {
      this.maketData['techInfo'] = currentTechInfo
    },
    beforeFooterAdded(number) {
      this.maketData['beforeFooter'] = number
    }
  },
  created() {
    (async () => {
      const urlParams = new URLSearchParams(window.location.search)
      this.maketId = urlParams.get('maketId')
      this.orderId = urlParams.get('orderId')
      await this.getMaketData()
      this.itemGroupsKeys = Object.keys(this.maketData['itemGroups'])
      // if (!this.maketData['techInfo']) {
      //   this.maketData['techInfo'] = {}
      //   Object.keys(defaultTechInfo).forEach(key => {
      //     this.maketData['techInfo'][key] = defaultTechInfo[key]
      //   })
      // }
      if (!this.maketData['groupLayoutData']) {
        this.maketData['groupLayoutData'] = {}
        Object.keys(this.maketData['itemGroups']).forEach(group => {
          this.maketData['groupLayoutData'][group] = {}
          Object.keys(defaultGroupLayoutData).forEach(key => {
            this.maketData['groupLayoutData'][group][key] = defaultGroupLayoutData[key]
          })

        })
      }
      // if (!this.maketData['beforeFooter']) {
      //   this.maketData['beforeFooter'] = 0
      // }
    })()
  }
}
</script>

<template>
  <TechDataComponent
    v-if="maketData"
    :maket-id="maketId"
    :order-id="orderId"
    :format-list="formatList"
    :tech-info="maketData['techInfo']"
    @show-sort="sortShow"
    @window-print="windowPrint"
    @window-close="windowClose"
    @show-content="contentShow"
    @tech-info-changed="techInfoChanged"
    @save-maket="saveMaket"
  />
  <ItemGroupingComponent
    v-if="showSort"
    :item-group="maketData['itemGroups']"
    @item-drag="handleItemDrag"
    @item-drop="handleItemDrop"
    @close-sort="showSort=false"
  />
  <ShowGroupComponent
    v-if="showContent"
    :show-group="maketData['groupLayoutData']"
    :item-group="maketData['itemGroups']"
    @close-content="showContent=false"
    @toggle-check="toggleCheckGroup"
  />
  <component
    :is="formatList[maketData['techInfo']['formatSelected']][1]"
    v-if="maketData && maketData['techInfo'] && maketData['techInfo']['frameShow']"
  />
  <div class="maket-layout__print"
       v-if="maketData && maketData['techInfo']"
       :class="formatList[maketData['techInfo']['formatSelected']][3] + ' ' + formatList[maketData['techInfo']['formatSelected']][2]"
  >
    <div class="maket-layout__top"
    >
      <MaketHeaderComponent
        v-if="maketData"
        :header-info="maketData['headerInfo']"
        class="maket-layout__content"
      />
      <MaketContentTableComponent
        v-if="maketData['groupLayoutData'] && maketData['techInfo']['tableShow']"
        :table-content="maketData['itemGroups']"
        :show-group="maketData['groupLayoutData']"
        class="maket-layout__content"
      />
    </div>
    <ContentFrameComponent
      v-for="group in itemGroupsKeys"
      v-show="maketData['groupLayoutData'][group]['show'] && maketData['techInfo']['pictureShow']"
      :key="group.id"
      :ref="'group_' + group"
      class="maket-layout__content"
      :group-data="maketData['itemGroups'][group]"
      :group-name="group"
      :group-pattern-name="maketData['groupPatterns'][group]"
      :group-images="maketData['groupImages'][group]"
      :group-layout-data="maketData['groupLayoutData'][group]"
    />
    <MaketFooterComponent
      v-if="maketData"
      :footer-info="maketData['footerInfo']"
      :rows-before="maketData['beforeFooter']"
      @rows-added="beforeFooterAdded"
    />
  </div>
</template>

<style lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

* {
  font-family: 'Arial', sans-serif;
}

.btn-sm {
  color: white;
  padding: 1px 8px;
  @include brd-standard;
  background-color: $colorPrimary500;
  transition: background-color 0.3s ease-out;
  cursor: pointer;
  z-index: 5;

  &:hover {
    color: $colorPrimary500;
    background-color: white;
  }

  &:hover .tooltip-text {
    visibility: visible;
  }
}

</style>

<style scoped lang="scss">

.maket-layout {

  &__top {
    padding: 0 16px 8px 16px;
  }

  &__print {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    //max-height: 297mm;
    //max-width: fit-content;
    //gap: 16px;
  }

  &__content {
    margin-top: 16px;
    width: 100%;
    padding: 16px 16px 8px 16px;
  }
}

.width {
  &__a4 {
    width: 210mm;
  }

  &__a3-v {
    width: 297mm;
  }

  &__a3-h {
    width: 210mm;
  }

  &__a3-h1 {
    width: 420mm;
  }
}

.height {
  &__a4 {
    max-height: 594mm;
  }

  &__a3-v {
    max-height: 420mm;
  }

  &__a3-h {
    max-height: 594mm;
  }
}


</style>
