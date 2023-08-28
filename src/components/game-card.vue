<template>
  <div class="game-card game-card--empty" v-if="!game">
    <p>
      <i class="fas fa-spinner fa-spin"></i>
    </p>
  </div>

  <div class="game-card" :class="{ busy: isBusy }" v-else>
    <pre>{{ JSON.stringify(game, null, 2) }}</pre>
    <button @click="tryDeleteGame(game.id)">
      <i class="fas fa-trash"></i>
      <span> Delete Game </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { deleteGame, fetchMe } from '@/controllers/connection';
import { useGamesStore } from '@/stores/gamesStore';
import { Game } from '@/types';
import { computed, ref } from 'vue';

const props = defineProps({
  gameId: {
    type: String
  }
});

const isBusy = ref(false);

const games = computed(() => {
  return useGamesStore().games || [];
});

const game = computed(() => {
  return games.value.find((game: Game) => game.id === props.gameId) || null;
});

async function tryDeleteGame(gameId: string) {
  isBusy.value = true;
  const response = await deleteGame(gameId);
  console.log(response);
  await fetchMe();
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
