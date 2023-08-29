<template>
  <div class="game-container" v-if="true">
    <header class="page-header">
      <div class="actions-container">
        <p>{{ gameId }}</p>
      </div>
    </header>
    <div class="game-content">
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
import { fetchGame } from '@/controllers/connection';
import { connectToWebSocket } from '@/controllers/socket-client';
import { Game } from '@/types';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const gameId = computed(() => {
  return route.params.id as string;
});

const game = ref(null as Game | null);

function updateGameData() {
  fetchGame(gameId.value).then((res) => {
    console.log(gameId.value);
    if (res) game.value = res;
  });
}

connectToWebSocket();

// const user = computed(() => {
//   return useUserStore().user || null;
// });

const router = useRouter();
</script>

<style scoped lang="scss">
.game-container {
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
    padding: 0.8rem;
  }
}

@media (max-width: 768px) {
}
</style>
