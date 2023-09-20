<template>
  <div class="collections-container" v-if="user">
    <header class="page-header">
      <div class="actions-container">
        <button @click="tryCreateCollection" :disabled="busyCreating">
          <i class="fas fa-plus"></i>
          <span> Create Collection </span>
        </button>
      </div>
    </header>
    <ul>
      <li v-for="collectionId in user.collections" :key="collectionId">
        <pre>{{ collectionId }}</pre>
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
import LoginModal from '@/components/modals/login-modal.vue';
import { ModalController } from '@/controllers/modal-controller';
import { useUserStore } from '@/stores/userStore';
import { computed, ref } from 'vue';

const user = computed(() => {
  return useUserStore().user || null;
});

const busyCreating = ref(false);

async function tryCreateCollection() {
  busyCreating.value = true;
  // const response = await createGame();
  // if (response) {
  //   ModalController.open(ConfirmModal, {
  //     title: 'Error Creating Game',
  //     text: `Code: ${response}`,
  //     confirmText: 'Ok',
  //     cancelText: null
  //   });
  // }
  // await fetchMe();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  busyCreating.value = false;
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
    padding: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
    padding: 0.8rem;
    width: 100%;

    > li {
      overflow: hidden;
    }
  }
}

@media (max-width: 768px) {
  .collections-container {
    ul {
      grid-template-columns: 1fr;
    }
  }
}
</style>
