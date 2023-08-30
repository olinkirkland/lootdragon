<template>
  <div class="game-container" v-if="true" :class="{ busy: isBusy }">
    <header class="page-header">
      <div class="actions-container">
        <p>{{ gameId }}</p>
      </div>
    </header>
    <div class="game-content">
      <button @click="updateGameData">Refresh</button>
      <div class="game-owner" v-if="isGameOwner">
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
                console.log(newName);
              }
            })
          "
        >
          <i class="fas fa-edit"></i>
          <span>Change Name</span>
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
import { fetchGame } from '@/controllers/connection';
import { ModalController } from '@/controllers/modal-controller';
import { connectToWebSocket } from '@/controllers/socket-client';
import { useUserStore } from '@/stores/userStore';
import { Game } from '@/types';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const gameId = computed(() => {
  return route.params.id as string;
});

const game = ref(null as Game | null);
const isBusy = ref(false);
const user = computed(() => {
  return useUserStore().user || null;
});
const isGameOwner = computed(() => {
  return game.value?.owner === user.value?.id;
});

async function updateGameData() {
  isBusy.value = true;
  await fetchGame(gameId.value).then((res) => {
    console.log(gameId.value);
    if (res) game.value = res;
  });
  isBusy.value = false;
}

connectToWebSocket();

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

    .game-owner {
      border: 1px solid var(--surface-color-2);
      padding: 1.2rem;

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
