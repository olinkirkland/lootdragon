<template>
  <card>
    <div class="login-container">
      <p>login page</p>
      <input type="text" placeholder="username" />
      <input type="password" placeholder="password" />
      <button @click="router.push({ name: 'library' })">login</button>
      <button @click="router.push({ name: 'home' })">home</button>
    </div>
  </card>
</template>

<script setup lang="ts">
import router from '@/router';
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
}
</style>
