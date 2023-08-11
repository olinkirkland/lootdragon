<template>
  <card>
    <div class="home-container">
      <!-- <p>home page</p> -->
      <!-- <button @click="router.push({ name: 'register' })">register</button> -->
      <!-- <button @click="router.push({ name: 'login' })">login</button> -->
      <!-- <button @click="openModal">Open Modal</button> -->
      <button @click="router.push({ name: 'item-browser' })">
        <i class="fas fa-scroll"></i>
        <span>Item Browser</span>
      </button>
    </div>
  </card>
</template>

<script setup lang="ts">
import router from '@/router';
</script>

<style scoped lang="scss">
.home-container {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
</style>
