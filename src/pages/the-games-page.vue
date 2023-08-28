<template>
  <div class="games-container">
    <header class="page-header">
      <div class="actions-container">
        <button @click="tryCreateGame">
          <i class="fas fa-plus"></i>
          <span> Create Game </span>
        </button>
      </div>
    </header>
    <ul>
      <li v-for="gameId in user?.games" :key="gameId">
        <game-card :gameId="gameId" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import GameCard from '@/components/game-card.vue';
import ConfirmModal from '@/components/modals/confirm-modal.vue';
import { createGame, fetchMe } from '@/controllers/connection';
import { ModalController } from '@/controllers/modal-controller';
import { useUserStore } from '@/stores/userStore';
import { computed } from 'vue';

const user = computed(() => {
  return useUserStore().user || null;
});

async function tryCreateGame() {
  const response = await createGame();
  if (response) {
    ModalController.open(ConfirmModal, {
      title: 'Error Creating Game',
      message: 'Code:' + response,
      confirmText: 'Ok',
      cancelText: null
    });
  }
  await fetchMe();
}
</script>

<style scoped lang="scss">
.games-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  max-height: -webkit-fill-available;
  overflow: hidden;
  background-color: var(--surface-color);

  .actions-container {
    padding: 0.8rem;
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
  .games-container {
    ul {
      grid-template-columns: 1fr;
    }
  }
}
</style>
