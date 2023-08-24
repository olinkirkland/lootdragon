<template>
  <div class="games-container">
    <header class="page-header">
      <div class="actions-container">
        <button @click="createGame">
          <span> Create Game </span>
        </button>
      </div>
    </header>
    <pre>{{ JSON.stringify(user?.games, null, 2) }}</pre>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { computed } from 'vue';
import { createGame } from '@/controllers/connection';

// const settingsStore = useSettingsStore();
const user = computed(() => {
  return useUserStore().user || null;
});
</script>

<style scoped lang="scss">
.games-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  height: -webkit-fill-available;
  overflow: hidden;
  background-color: var(--surface-color);

  .actions-container {
    padding: 0.8rem;
  }
}
</style>
