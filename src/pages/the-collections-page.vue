<template>
  <div class="collections-container" v-if="user">
    <header class="page-header">
      <div class="actions-container">
        <button @click="tryCreateCollection" :disabled="isBusyCreating">
          <i class="fas fa-plus"></i>
          <span>Create New Collection ({{ user.collections.length }})</span>
        </button>
      </div>
    </header>
    <ul>
      <li v-for="collectionId in user.collections" :key="collectionId">
        <collection-card :collectionId="collectionId"></collection-card>
      </li>
    </ul>
  </div>
  <div class="collections-container collections-container--no-user" v-else>
    <p>Not logged in.</p>
    <button @click="ModalController.open(LoginModal)">
      <i class="fas fa-sign-in-alt"></i>
      <span>Login</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import CollectionCard from '@/components/collection-card.vue';
import LoginModal from '@/components/modals/login-modal.vue';
import { createCollection, fetchMe } from '@/controllers/connection';
import { ModalController } from '@/controllers/modal-controller';
import { useUserStore } from '@/stores/userStore';
import { computed, ref } from 'vue';
import ConfirmModal from '../components/modals/confirm-modal.vue';

const user = computed(() => {
  return useUserStore().user || null;
});

const isBusyCreating = ref(false);

async function tryCreateCollection() {
  isBusyCreating.value = true;
  const response = await createCollection();
  if (response) {
    ModalController.open(ConfirmModal, {
      title: 'Error Creating Collection',
      text: `Code: ${response}`,
      confirmText: 'Ok',
      cancelText: null
    });
  }
  await fetchMe();
  isBusyCreating.value = false;
}
</script>

<style scoped lang="scss">
.collections-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  max-height: -webkit-fill-available;
  overflow: hidden;
  background-color: var(--surface-color);

  &--no-user {
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
  }

  .actions-container {
    padding: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 0.8rem;
    width: 100%;
    overflow-y: auto;
  }
}
</style>
