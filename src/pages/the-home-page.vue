<template>
  <div class="home-container">
    <div class="wallpaper"></div>
    <div class="home">
      <!-- <p>home page</p> -->
      <!-- <button @click="router.push({ name: 'register' })">register</button> -->
      <!-- <button @click="router.push({ name: 'login' })">login</button> -->
      <!-- <button @click="openModal">Open Modal</button> -->
      <img src="/assets/images/logo.webp" id="logo" alt="logo" />
      <h1>Loot Dragon</h1>
      <div class="actions">
        <button class="primary" @click="router.push({ name: 'items' })">
          <i class="fas fa-box-open"></i>
          <span>Item Browser</span>
        </button>
        <button class="primary" disabled>
          <i class="fas fa-store"></i>
          <span>Shop Generator</span>
        </button>
        <button class="primary" disabled>
          <i class="fas fa-coins"></i>
          <span>Loot Generator</span>
        </button>
      </div>
      <p>
        Simplifying the way you pick items, design shops, and create loot for
        Pathfinder 2E games.
      </p>
    </div>
    <div class="daily-item">
      <div class="header">
        <i class="fas fa-calendar-day"></i>
        <p>Item of the Day</p>
      </div>
      <div class="content">
        <button
          @click="router.push({ name: 'items', query: { i: dailyItem.id } })"
          class="text primary"
        >
          <span>{{ dailyItem.name.text }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { computed } from 'vue';
import seedrandom from 'seedrandom';
import { useItemsStore } from '@/stores/itemsStore';

const dailyItem = computed(() => {
  const date = new Date();
  const seed = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
  const rng = seedrandom(seed);
  const randomNumber = rng;
  return useItemsStore().items[
    Math.floor(randomNumber() * useItemsStore().items.length)
  ];
});
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Allura&display=swap');
.home-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  position: relative;
  overflow: hidden;
  justify-content: center;
  align-items: center;

  > .wallpaper {
    background: url('/assets/images/wallpaper.jpg');
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    position: absolute;
    z-index: -1;
    -webkit-filter: blur(10px);
    transform: scale(1.1);
  }

  p {
    color: var(--primary-color);
  }

  .home {
    padding: 2rem;
    border: 1px solid var(--primary-color);
    background-color: var(--dark-translucent);
    display: flex;
    flex-direction: column;
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
      color: var(--primary-color);
    }

    .actions {
      display: flex;
      width: fit-content;
      padding: 2rem;
      gap: 0.8rem;
    }

    p {
      margin: 0 4rem;
      max-width: 64rem;
      opacity: 0.8;
      font-size: 1.4rem;
      text-align: center;
    }
  }

  > .daily-item {
    bottom: 0.4rem;
    width: 100%;
    padding: 1.2rem;
    border-top: 1px dashed var(--primary-color);
    background-color: var(--dark-translucent);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 0;

    > .header {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      color: var(--primary-color);
      opacity: 0.6;
      font-size: 1.4rem;
      font-style: italic;
      margin-bottom: -0.4rem;
    }

    > .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
    }
  }
}

@media (max-width: 768px) {
  .actions {
    flex-direction: column;

    > button {
      width: 100%;
    }
  }

  .home-container {
    gap: 0;
  }
  .home {
    border: none !important;
    flex: 1;
  }

  .daily-item {
    position: static !important;
    bottom: unset;
    background-color: var(--dark-translucent) !important;
  }
}
</style>
