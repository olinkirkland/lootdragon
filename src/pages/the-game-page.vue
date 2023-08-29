<template>
  <div class="game-container" v-if="true">
    <header class="page-header">
      <div class="actions-container">
        <p>{{ gameId }}</p>
      </div>
    </header>
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
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const gameId = computed(() => {
  return route.params.id;
});

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
    gap: 0.8rem;
  }
}

@media (max-width: 768px) {
}
</style>
