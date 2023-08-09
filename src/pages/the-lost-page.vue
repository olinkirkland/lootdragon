<template>
  <card>
    <div class="lost-container">
      <p>404: Page not found</p>
      <button @click="goToHomePage">home</button>
    </div>
  </card>
</template>

<script setup lang="ts">
import router from '@/router';

function goToHomePage() {
  router.push({ name: 'home' });
}
</script>

<style scoped lang="scss">
.lost-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
}
</style>
@/router/router