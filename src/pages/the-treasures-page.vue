<template>
  <div class="treasures-container">
    <h1>Treasures</h1>
    <h2>Page not found.</h2>
    <div class="actions">
      <button class="primary" @click="router.push({ name: 'home' })">
        <i class="fas fa-home"></i>
        <span>Back to Home</span>
      </button>
    </div>
    <p>
      The page you are looking for does not exist. It may have been moved or
      deleted.
    </p>
    <p>Or maybe it never existed to begin with.</p>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Allura&display=swap');
.treasures-container {
  width: 100%;
  height: 100vh;
  max-height: -webkit-fill-available;
  background-color: #222;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;

  > h1 {
    font-size: 1.6rem;
    font-weight: lighter;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #fab44d;
  }

  > h2 {
    color: #fab44d;
  }

  .actions {
    display: flex;
    width: fit-content;
    padding: 2rem;
    gap: 0.8rem;
  }

  > p {
    margin: 0 4rem;
    max-width: 64rem;
    color: #fab44d;
    opacity: 0.8;
    font-size: 1.4rem;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .actions {
    flex-direction: column;
  }
}
</style>
