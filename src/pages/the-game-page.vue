<template>
  <div class="game-container" v-if="true" :class="{ busy: isBusy }">
    <header class="page-header">
      <div class="actions-container">
        <p>{{ game?.name }}</p>
      </div>
    </header>
    <div class="game-content">
      <!-- <button @click="updateGameData">Refresh</button> -->
      <div class="game-controls" v-if="isGameOwner">
        <p>
          <i class="fas fa-crown"></i>
          You are the <span class="primary">owner</span> of this game.
        </p>
        <button
          @click="
            ModalController.open(InputModal, {
              text: 'Enter a new name for the game:',
              placeholder: game?.name,
              confirmCallback: (newName: string) => {
                server.patch('/game/' + gameId, {
                  property: 'name',
                  value: newName
                });
                ModalController.close();
              }
            })
          "
        >
          <i class="fas fa-edit"></i>
          <span>Change Name</span>
        </button>
        <button @click="ModalController.open(ManagePlayersModal, { gameId })">
          <i class="fas fa-users"></i>
          <span>Manage Characters</span>
        </button>
      </div>
      <pre>{{ game }}</pre>
    </div>
  </div>
  <div class="game-container game-container--not-found" v-else>
    <p>Game not found</p>
    <button @click="router.push({ name: 'games' })">
      <i class="fas fa-arrow-left"></i>
      <span>Back to Games</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import InputModal from '@/components/modals/input-modal.vue';
import ManagePlayersModal from '@/components/modals/manage-players-modal.vue';
import server, { fetchGame } from '@/controllers/connection';
import { ModalController } from '@/controllers/modal-controller';
import {
  connectToWebSocket,
  disconnectFromWebSocket
} from '@/controllers/socket-client';
import { useUserStore } from '@/stores/userStore';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGamesStore } from '../stores/gamesStore';

const isBusy = ref(false);
const route = useRoute();
const gameId = computed(() => {
  return route.params.id as string;
});

const game = useGamesStore().getGameById(gameId.value);

const user = computed(() => {
  return useUserStore().user || null;
});
const isGameOwner = computed(() => {
  if (!game.value || !user.value) return false;
  return game.value?.owner === user.value?.id;
});

onMounted(() => {
  fetchGame(gameId.value).then(() => {
    connectToWebSocket({ gameId: gameId.value });
  });
});

onUnmounted(() => {
  disconnectFromWebSocket();
});

// const user = computed(() => {
//   return useUserStore().user || null;
// });

const router = useRouter();
</script>

<style scoped lang="scss">
.game-container {
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

  .game-content {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 0.8rem;

    .game-controls {
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
    }
  }
}

@media (max-width: 768px) {
}
</style>
