<template>
  <div
    class="collection-card collection-card--empty"
    v-if="!props.collectionId || !collection"
  >
    <p>
      <i class="fas fa-spinner fa-spin"></i>
    </p>
  </div>

  <div class="collection-card" :class="{ busy: isBusy }" v-else>
    <h2>{{ collection.name }}</h2>
    <p class="muted">
      <span>Last updated: </span
      ><span>{{ new Date(collection.lastUpdated).toLocaleDateString() }}</span>
    </p>
    <div class="flex wrap">
      <button
        @click="
          router.push({
            name: 'collection',
            params: { id: props.collectionId }
          })
        "
      >
        <span>View</span>
      </button>
      <button @click="tryDeleteCollection()">
        <i class="fas fa-trash"></i>
        <span>Delete</span>
      </button>
      <button @click="tryCloneCollection()">
        <i class="fas fa-copy"></i>
        <span>Clone</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import server, {
  cloneCollection,
  deleteCollection
} from '@/controllers/connection';
import { ModalController } from '@/controllers/modal-controller';
import { Collection } from '@/types';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import ConfirmModal from './modals/confirm-modal.vue';

const props = defineProps({
  collectionId: {
    type: String
  }
});

const collection = ref<Collection | null>(null);

onMounted(() => {
  if (!props.collectionId) return;
  server.get('collection/' + props.collectionId).then((response) => {
    collection.value = response.data as Collection;
  });
});

const isBusy = ref(false);
const router = useRouter();

async function tryDeleteCollection() {
  if (!props.collectionId) return;
  ModalController.open(ConfirmModal, {
    title: 'Delete Collection',
    message: 'Are you sure you want to delete this collection?',
    confirmText: 'Yes, delete it',
    confirmCallback: async () => {
      ModalController.close();
      isBusy.value = true;
      await deleteCollection(props.collectionId!);
      isBusy.value = false;
    }
  });
}

async function tryCloneCollection() {
  if (!props.collectionId) return;
  isBusy.value = true;
  await cloneCollection(props.collectionId!);
  isBusy.value = false;
}
</script>

<style scoped lang="scss">
.collection-card {
  position: relative;
  padding: 0.8rem;
  border: 1px solid var(--surface-color-2);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  &--empty {
    justify-content: center;
    align-items: center;
  }
}
</style>
