<template>
  <div class="collection-container" v-if="!!collection && !isBusy">
    <header class="page-header">
      <div class="actions-container">
        <p>{{ collection?.name }}</p>
      </div>
    </header>
    <div class="collection-content">
      <!-- <button @click="updatecollectionData">Refresh</button> -->
      <div class="collection-controls" v-if="isOwner">
        <p>
          <i class="fas fa-crown"></i>
          You are the <span class="primary">owner</span> of this collection.
        </p>
        <div class="collection-controls__actions">
          <div class="checkbox-group">
            <input
              type="checkbox"
              id="isPublicCheckbox"
              :checked="collection?.isPublic"
              @change="changeIsPublic"
            />
            <label for="isPublicCheckbox">Public Collection</label>
          </div>
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
        </div>
      </div>
      <pre>{{ collection }}</pre>
    </div>
  </div>
  <div
    class="collection-container collection-container--not-found"
    v-else-if="!isBusy"
  >
    <p>
      <span> Collection not found.</span>
      <span class="muted"> It's either private or doesn't exist.</span>
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
import InputModal from '@/components/modals/input-modal.vue';
import server from '@/controllers/connection';
import { ModalController } from '@/controllers/modal-controller';
import { useUserStore } from '@/stores/userStore';
import { Collection } from '@/types';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const isBusy = ref(true);
const route = useRoute();
const collectionId = computed(() => {
  return route.params.id as string;
});

const collection = ref<Collection | null>(null);

onMounted(() => {
  updateCollection();
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

function changeIsPublic(event: any) {
  server
    .put('/collection/' + collectionId.value + '/public', {
      isPublic: event.target.checked
    })
    .then((response) => {
      collection.value!.isPublic = response.data.isPublic;
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

  .collection-content {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 0.8rem;

    .collection-controls {
      border: 1px solid var(--surface-color-2);
      padding: 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;

      > p {
        i {
          margin-right: 0.6rem;
          color: var(--primary-color);
        }
        margin-bottom: 0.4rem;
      }

      > .collection-controls__actions {
        display: flex;
        align-items: center;
        gap: 1.2rem;
      }
    }
  }
}

.loading-text {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 0.8rem;
}
</style>
