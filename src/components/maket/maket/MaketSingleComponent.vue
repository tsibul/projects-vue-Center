<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fetchData } from '@/components/services/fetchData.js'
import ToFilmComponent from '@/components/maket/maket/ToFilmComponent.vue'

export default {
  name: 'MaketSingleComponent',
  components: { ToFilmComponent, FontAwesomeIcon },
  inject: ['appUrl', 'tokenName'],
  emits: ['delete-alert', 'load-maket-file', 'open-files'],
  props: {
    order: Object,
    index: Number
  },
  data() {
    return {
      deleteUrl: null,
      showDeleteAlert: false,
      currentOrder: this.order,
      currentGroup: null,
      connected: null,
      showToFilm: false,
    }
  },
  methods: {
    goToMaket(event, orderId, maketId) {
      event.preventDefault()
      window.open(`http://localhost:5173/maket/layout?maketId=${maketId}&orderId=${orderId}`, '_blank')
    },
    loadMaketFile(maketId, orderId) {
      this.$emit('load-maket-file', [maketId, orderId])
    },
    handleOpenFiles() {
      this.$emit('open-files');
    },
    async maketShow(maketId) {
      const fileUrl = `${this.appUrl}maket_show/${maketId}`
      const response = await fetchData(fileUrl, this.tokenName)
      if (response) {
        window.open(fileUrl, '_blank', 'noopener')
      } else {
        alert('ошибка загрузки')
      }
    },
    async deleteMaket(maketId) {
      const deleteUrl = `maket_delete/${maketId}`
      this.$emit('delete-alert', deleteUrl)
    },
    async restoreMaket(maketId) {
      const restoreUrl = `${this.appUrl}maket_restore/${maketId}`;
      const response = await fetchData(restoreUrl, this.tokenName);
      if (response) {
        const restoredIndex = this.order.maketList.findIndex(el => el.id === Number(maketId));
        if (this.order.maketList[restoredIndex].file) {
          this.currentOrder.maketQuantity += 1;
        }
        this.currentOrder.maketList[restoredIndex].maketDeleted = false;
      }
    },
    selectFilm(group, connected){
      this.connected = connected;
      this.currentGroup = group;
      this.showToFilm = true;
    },
    filmSelected(film){
      this.currentGroup = null;
      this.showToFilm = false;
    },
    closeForm(){
      this.currentGroup = null;
      this.showToFilm = false;
    }
  }
}
</script>

<template>
  <div
    class="maket-single"
    :class="order.deleted ? 'deleted': order.maketStatus"
  >
    <div>{{ order.orderNumber }}</div>
    <div>{{ order.orderDate }}</div>
    <div>{{ order.customerName }}</div>
    <button class="btn btn-save-inverted tooltip"
            @click="handleOpenFiles">
      <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" class="fa" />&nbsp;{{ order.maketQuantity }}&nbsp;/&nbsp;{{ order.files
      }}
      <div class="tooltip-text">связанные&nbsp;файлы макеты/файлы</div>
    </button>
    <div class="maket-single__details">
      <details v-for="maket in order.maketList"
               :key="maket.id"
      >
        <summary
          class="maket-summary"
        >
          <div
            :class="maket.maketDeleted ? 'inactive' : ''"
          >
            {{ maket.maketNumber }}
          </div>
          <button
            class="btn btn-save-inverted tooltip"
            @click="goToMaket($event, order.id, maket.id)"
          >
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            <div class="tooltip-text">открыть&nbsp;шаблон&nbsp;макета</div>
          </button>
          <button
            :disabled="!maket.file"
            :class="maket.file ? 'tooltip' : 'inactive'"
            class="btn btn-save-inverted"
            @click="maketShow(maket.id)"
          >
            <font-awesome-icon :icon="['fas', 'folder-open']" />
            <div class="tooltip-text">открыть&nbsp;файл&nbsp;макета</div>
          </button>
          <div
            :class="maket.maketDeleted ? 'inactive' : ''"
          >
            {{ maket.dateCreate }}
          </div>
          <div
            class="maket-summary__wrap"
            :class="maket.maketDeleted ? 'inactive' : ''"
          >{{ maket.comment }}
          </div>
          <div
            class="maket-summary__wrap"
            :class="maket.maketDeleted ? 'inactive' : ''"
          >{{ maket.file }}
          </div>
          <button
            class="btn btn-save-inverted tooltip"
            @click="loadMaketFile(maket.id, order.id)"
          >
            <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" />
            <div class="tooltip-text">загрузить&nbsp;макет</div>
          </button>
          <button
            v-if="!maket.maketDeleted"
            class="btn btn-close-inverted tooltip"
            @click="deleteMaket(maket.id)"
          >
            <font-awesome-icon :icon="['fas', 'x']" />
            <div class="tooltip-text">удалить</div>
          </button>
          <button
            v-else
            class="btn btn-neutral-inverted tooltip"
            @click="restoreMaket(maket.id)"
          >
            <font-awesome-icon :icon="['fas', 'check']" />
            <div class="tooltip-text">восстановить</div>
          </button>
        </summary>
        <div class="maket-single__item active">
          <div>нанесение</div>
          <div>пленки</div>
          <div></div>
          <div></div>
        </div>
        <div
          class="maket-single__item"
          v-for="(group, index) in maket.groups"
          :key="index">
          <ToFilmComponent
            :connected="connected"
            :group="currentGroup"
            v-if="showToFilm"
            @film-selected="filmSelected"
            @close-form="closeForm"
          />
          <div>{{ group.name.replaceAll('()', ' ') }}</div>
          <div></div>
          <button
            class="btn btn-save-inverted tooltip"
            @click="selectFilm(group, true)"
          >
            <font-awesome-icon :icon="['fas', 'pencil']" />
            &nbsp;
            <font-awesome-icon :icon="['fas', 'angle-right']" />
            &nbsp;
            <font-awesome-icon :icon="['fas', 'film']" />
            <div class="tooltip-text">на&nbsp;пленку</div>
          </button>
          <button
            class="btn btn-close-inverted tooltip btn-dropdown"
            @click="selectFilm(group, false)"
          >
            <font-awesome-icon :icon="['fas', 'film']" />
            &nbsp;
            <font-awesome-icon :icon="['fas', 'angle-right']" />
            &nbsp;
            <font-awesome-icon :icon="['fas', 'trash']" />
            <div class="tooltip-text">ошибка&nbsp;в&nbsp;пленке</div>
          </button>
        </div>
      </details>
    </div>
  </div>

</template>

<style scoped lang="scss">
@import "@/assets/maket/scss/vars";
@import "@/assets/maket/scss/mixins";

.maket-single {
  @include brd-standard;
  border-color: transparent;
  display: grid;
  align-items: center;
  padding: 4px 0 4px 12px;
  grid-template-columns: 1.5fr 0.6fr 3fr 0.7fr 8.5fr;
  gap: 4px;

  &__details {
    @include brd-standard;
    border-color: transparent;

  }

  &:hover {
    background-color: $colorPrimary200;
  }

  &:hover .maket-single__details {
    background-color: $colorSecondary100;
  }


  & details {
    @include brd-standard;
    border-color: transparent;

    &[open] {
      background-color: $colorPrimary50;
    }
  }

  &__item {
    position: relative;
    display: grid;
    align-items: center;
    grid-template-columns: 2fr 3.2fr 0.7fr 0.7fr;
    gap: 6px;
    padding: 4px 0 4px 12px;
    @include brd-standard;
    border-color: transparent;

    &:hover {
      background-color: $colorPrimary200;
    }
  }
}

.maket-summary {
  @include brd-standard;
  border-color: transparent;
  display: grid;
  align-items: center;
  padding: 4px 0 4px 12px;
  cursor: pointer;
  gap: 4px;
  grid-template-columns: 0.3fr 0.4fr 0.4fr 0.6fr 1fr 3fr repeat(2, 0.4fr);

  &:hover {
    background-color: $colorPrimary200;
  }

  &__wrap {
    word-break: break-all;
    white-space: pre-wrap
  }
}

.tooltip-text {
  right: 0;
  top: 2.5rem;
}

.N, .P {
  color: red;
}

.deleted {
  opacity: 0.5;
  background-color: $colorPrimary200;
}

</style>
