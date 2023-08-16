<template>
  <div class="home-container">
    <!-- <p>home page</p> -->
    <!-- <button @click="router.push({ name: 'register' })">register</button> -->
    <!-- <button @click="router.push({ name: 'login' })">login</button> -->
    <!-- <button @click="openModal">Open Modal</button> -->
    <img src="/assets/images/logo.png" id="logo" alt="logo" />
    <h1>Loot Dragon</h1>
    <div class="actions">
      <button @click="router.push({ name: 'item-browser' })">
        <i class="fas fa-box-open"></i>
        <span>Item Browser</span>
      </button>
      <button disabled>
        <i class="fas fa-store"></i>
        <span>Shop Generator</span>
      </button>
      <button disabled>
        <i class="fas fa-coins"></i>
        <span>Loot Generator</span>
      </button>
    </div>
    <p>
      An ongoing effort to streamline the process of choosing items and creating
      shops and loot for Pathfinder 2E games
    </p>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Allura&display=swap');
.home-container {
  width: 100%;
  height: 100vh;
  background-color: #222;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;

  #logo {
    width: 100%;
    max-width: 20rem;
    margin: 0 auto;
  }

  > h1 {
    font-size: 1.6rem;
    font-weight: lighter;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #fab44d;
  }

  button {
    background-color: #fab44d !important;
    color: #222 !important;
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
    color: #fab54c99;
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
