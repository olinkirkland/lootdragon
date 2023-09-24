<template>
  <div class="collection-container" v-if="!!collection && !isBusy">
    <button class="update-button" @click="updateCollection()">
      <i class="fas fa-sync"></i>
      <span>Update</span>
    </button>
    <header class="page-header">
      <div class="actions-container">
        <p>{{ collection?.name }}</p>
        <button
          v-if="!!isOwner"
          class="icon"
          @click="ModalController.open(CollectionSettingsModal, { collection })"
        >
          <i class="fas fa-cog"></i>
        </button>
      </div>
    </header>
    <div class="collection-content">
      <div class="overview">
        <p>
          <span class="primary">{{ totalItems }}</span>
          <span class="muted"> items </span>
          <span class="muted">({{ totalUniqueItems }} unique) </span>
          <span> · </span>
          <span class="primary">{{ totalBulk }}</span>
          <span class="muted"> bulk</span>
        </p>

        <price-display :value="totalValue" />
      </div>

      <div
        class="item-list-container"
        :class="{ 'table-view': settingsStore.tableMode }"
      >
        <ul class="item-list">
          <li v-for="itemAndQuantity in itemsAndQuantity">
            <collection-item-card
              :item="itemAndQuantity.item"
              :quantity="itemAndQuantity.quantity"
              :key="itemAndQuantity.item.id"
            ></collection-item-card>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div
    class="collection-container collection-container--not-found"
    v-else-if="!isBusy"
  >
    <p>
      <span>Collection not found.</span><br />
      <span class="muted">It's either private or doesn't exist.</span>
    </p>
    <button @click="router.push({ name: 'collections' })">
      <i class="fas fa-arrow-left"></i>
      <span>Back to Collections</span>
    </button>
  </div>
  <div class="collection-container collection-container--not-found" v-else>
    <p class="loading-text">
      <span>Loading</span>
      <i class="fas fa-spinner fa-spin"></i>
    </p>
  </div>
</template>

<script setup lang="ts">
import CollectionItemCard from '@/components/collection-item-card.vue';
import CollectionSettingsModal from '@/components/modals/collection-settings-modal.vue';
import PriceDisplay from '@/components/price-display.vue';
import server from '@/controllers/connection';
import { ModalController } from '@/controllers/modal-controller';
import { useItemsStore } from '@/stores/itemsStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { useUserStore } from '@/stores/userStore';
import { Collection, Item } from '@/types';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const isBusy = ref(true);
const route = useRoute();

const settingsStore = useSettingsStore();

const collectionId = computed(() => {
  return route.params.id as string;
});

const collection = ref<Collection | null>(null);

onMounted(() => {
  updateCollection();
});

const totalItems = computed(() => {
  return itemsAndQuantity.value.reduce(
    (acc, itemAndQuantity) => acc + itemAndQuantity.quantity,
    0
  );
});

const totalUniqueItems = computed(() => {
  return itemsAndQuantity.value.length;
});

const totalBulk = computed(() => {
  return itemsAndQuantity.value.reduce(
    (acc, itemAndQuantity) =>
      acc + itemAndQuantity.quantity * (+itemAndQuantity.item.bulk || 0),
    0
  );
});

const totalValue = computed(() => {
  return itemsAndQuantity.value.reduce(
    (acc, itemAndQuantity) =>
      acc + itemAndQuantity.quantity * (itemAndQuantity.item.price || 0),
    0
  );
});

const itemsAndQuantity = computed(() => {
  return (collection.value?.itemsAndQuantity ?? []).map((itemAndQuantity) => {
    const item = useItemsStore().items.find(
      (i) => i.id === itemAndQuantity.itemId
    );
    return {
      item: item!,
      quantity: itemAndQuantity.quantity
    };
  }) as { item: Item; quantity: number }[];
});

function updateCollection() {
  if (!collectionId.value) return;
  isBusy.value = true;
  server
    .get('collection/' + collectionId.value)
    .then((response) => {
      collection.value =
        response.status !== 404 ? (response.data as Collection) : null;
      isBusy.value = false;
    })
    .catch(() => {
      collection.value = null;
      isBusy.value = false;
    });
}

const user = computed(() => {
  return useUserStore().user;
});

const isOwner = computed(() => {
  if (!collection.value || !user.value) return false;
  return collection.value?.ownerId === user.value?.id;
});

const router = useRouter();
</script>

<style scoped lang="scss">
.collection-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  max-height: -webkit-fill-available;
  overflow: hidden;
  background-color: var(--surface-color);

  &--not-found {
    padding: 4rem;
    text-align: center;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
  }

  .actions-container {
    padding-left: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.8rem;
  }

  .overview {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: center;
  }

  > .collection-content {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-top: 0.8rem;
    flex: 1;
    overflow: hidden;

    section {
      border: 1px solid var(--surface-color-2);
      padding: 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
  }
}

.owner {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.loading-text {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 0.8rem;
}

.item-list-container {
  flex: 1;
  overflow-y: auto;
  border: 1px solid var(--surface-color-2);
}

:deep .price {
  width: fit-content !important;
}

.update-button {
  position: fixed;
  right: 1.2rem;
  bottom: 1.2rem;
  z-index: 99;
}
</style>
