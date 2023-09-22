<template>
  <div class="collection-container" v-if="!!collection && !isBusy">
    <header class="page-header">
      <div class="actions-container">
        <p>{{ collection?.name }}</p>
      </div>
    </header>
    <div class="collection-content">
      <!-- <button @click="updatecollectionData">Refresh</button> -->
      <div>
        <p v-if="isOwner" class="owner-text">
          <i class="fas fa-crown"></i>
          You are the <span class="primary">owner</span> of this collection.
        </p>
        <p class="item-count">
          <span class="muted">This collection has </span>
          <span class="primary">{{ collection?.itemsAndQuantity.length }}</span>
          <span class="muted"> items.</span>
        </p>
      </div>

      <drawer v-if="isOwner" title="Collection Settings">
        <section>
          <p class="muted">Choose a new name for your collection.</p>
          <button
            @click="
              ModalController.open(InputModal, {
                text: 'Enter a new name for the collection:',
                placeholder: collection?.name,
                confirmCallback: (newName: string) => {
                  server
                    .put('/collection/' + collectionId + '/name', {
                      name: newName
                    })
                    .then((response) => {
                      collection!.name = response.data.name;
                    });
                  ModalController.close();
                }
              })
            "
          >
            <i class="fas fa-edit"></i>
            <span>Change Name</span>
          </button>
          <p>
            <span class="muted">This is a </span>
            <span class="primary">{{
              collection?.isPublic ? 'public' : 'private'
            }}</span>
            <span class="muted"> collection. </span>
            <span class="primary">{{
              collection?.isPublic ? 'Anyone' : 'Only you'
            }}</span>
            <span class="muted"> can view it.</span>
          </p>
          <button @click="changeIsPublic">
            <span>{{
              collection.isPublic ? 'Make Private' : 'Make Public'
            }}</span>
          </button>

          <p class="muted">
            <span>Delete this collection. This action is irreversible.</span>
          </p>
          <button @click="tryDeleteCollection()">
            <i class="fas fa-trash"></i>
            <span>Delete</span>
          </button>
        </section>
      </drawer>

      <div
        class="item-list-container"
        :class="{ 'table-view': settingsStore.tableMode }"
      >
        <ul class="item-list">
          <li
            v-for="itemAndQuantity in itemsAndQuantity"
            :key="itemAndQuantity.item.id"
          >
            <pre>
              {{ itemAndQuantity }}
            </pre>
          </li>
        </ul>
      </div>

      <!-- <pre>{{ collection }}</pre> -->
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
import Drawer from '@/components/drawer.vue';
import ConfirmModal from '@/components/modals/confirm-modal.vue';
import InputModal from '@/components/modals/input-modal.vue';
import server, { deleteCollection } from '@/controllers/connection';
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

const itemsAndQuantity = computed(() => {
  return (collection.value?.itemsAndQuantity ?? []).map((itemAndQuantity) => {
    const item = useItemsStore().items.find((i) => i.id === itemAndQuantity.id);
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

function changeIsPublic() {
  server
    .put('/collection/' + collectionId.value + '/public', {
      isPublic: !collection.value?.isPublic
    })
    .then((response) => {
      collection.value!.isPublic = response.data.isPublic;
    });
}

async function tryDeleteCollection() {
  ModalController.open(ConfirmModal, {
    title: 'Delete Collection',
    message: 'Are you sure you want to delete this collection?',
    confirmText: 'Yes, delete it',
    confirmCallback: async () => {
      ModalController.close();
      isBusy.value = true;
      await deleteCollection(collection.value?.collectionId!);
      isBusy.value = false;
      router.push({ name: 'collections' });
    }
  });
}

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
    padding: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
  }

  > .collection-content {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 0.8rem;
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

.owner-text {
  text-align: center;
  > i {
    margin-right: 0.4rem;
    color: var(--primary-color);
  }
}

.loading-text {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 0.8rem;
}

.item-count {
  text-align: center;
}

.item-list-container {
  flex: 1;
  overflow-y: auto;
  border: 1px solid var(--surface-color-2);
}
</style>
