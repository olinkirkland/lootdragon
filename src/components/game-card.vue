<template>
  <div class="game-card game-card--empty" v-if="!game">
    <p>
      <i class="fas fa-spinner fa-spin"></i>
    </p>
  </div>

  <div class="game-card" :class="{ busy: isBusy }" v-else>
    <h2>{{ game.name }}</h2>
    <pre>{{ JSON.stringify(game, null, 2) }}</pre>
    <div class="flex">
      <button @click="router.push({ name: 'game', params: { id: game.id } })">
        <span>View Game</span>
      </button>
      <button @click="tryDeleteGame(game.id)">
        <i class="fas fa-trash"></i>
        <span>Delete Game</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { deleteGame, fetchMe } from '@/controllers/connection';
import { ModalController } from '@/controllers/modal-controller';
import { useGamesStore } from '@/stores/gamesStore';
import { Game } from '@/types';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import ConfirmModal from './modals/confirm-modal.vue';

const props = defineProps({
  gameId: {
    type: String
  }
});

const isBusy = ref(false);
const router = useRouter();

const games = computed(() => {
  return useGamesStore().games || [];
});

const game = computed(() => {
  return games.value.find((game: Game) => game.id === props.gameId) || null;
});

async function tryDeleteGame(gameId: string) {
  ModalController.open(ConfirmModal, {
    title: 'Delete Game',
    message: 'Are you sure you want to delete this game?',
    confirmText: 'Yes, delete it',
    confirmCallback: async () => {
      ModalController.close();
      isBusy.value = true;
      await deleteGame(gameId);
      await fetchMe();
      isBusy.value = false;
    }
  });
}
</script>

<style scoped lang="scss">
.game-card {
  position: relative;
  padding: 0.8rem;
  border: 1px solid var(--surface-color-2);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  min-height: 20rem;

  &--empty {
    justify-content: center;
    align-items: center;
  }

  > pre {
    width: 100%;
  }
}
</style>
