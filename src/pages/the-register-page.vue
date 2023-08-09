<template>
  <card>
    <div class="register-container">
      <p>register page</p>
      <input type="text" placeholder="username" />
      <input type="password" placeholder="password" />
      <input type="password" placeholder="confirm password" />
      <button>register</button>
      <button @click="router.push({ name: 'home' })">home</button>
    </div>
  </card>
</template>

<script setup lang="ts">
import router from '@/router';
</script>

<style scoped lang="scss">
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
}
</style>