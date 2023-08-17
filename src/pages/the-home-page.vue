<template>
  <div class="home-container">
    <div class="home">
      <!-- <p>home page</p> -->
      <!-- <button @click="router.push({ name: 'register' })">register</button> -->
      <!-- <button @click="router.push({ name: 'login' })">login</button> -->
      <!-- <button @click="openModal">Open Modal</button> -->
      <img src="/assets/images/logo.webp" id="logo" alt="logo" />
      <h1>Loot Dragon</h1>
      <div class="actions">
        <button @click="router.push({ name: 'items' })">
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
          @click="router.push({ name: 'items', query: { id: dailyItem.id } })"
          class="text"
        >
          <span>{{ dailyItem.name.text }}</span>
        </button>
        <p>{{ dailyItem.rarity }} {{ dailyItem.itemSubcategory }}</p>
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
  background-color: #222;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  p {
    color: #fab44d;
  }

  .home {
    width: 100%;
    height: 100%;
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
      color: #fab44d;
    }

    .actions {
      display: flex;
      width: fit-content;
      padding: 2rem;
      gap: 0.8rem;

      > button {
        background-color: #fab44d !important;
        color: #222 !important;
      }
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
    border-top: 1px dashed #fab44d;
    background-color: rgb(250, 180, 77, 0.1);
    display: flex;
    gap: 0.8rem;
    flex-direction: column;
    align-items: center;
    margin-top: auto;

    > .header {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      color: #fab44d;
      opacity: 0.4;
      font-size: 1.4rem;
      font-style: italic;
    }

    > .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;

      > p {
        text-transform: uppercase;
        font-size: 1.2rem;
        letter-spacing: 1px;
        opacity: 0.4;
      }
    }
  }
}

button.text {
  color: #fab44d;
}

@media (max-width: 768px) {
  .actions {
    flex-direction: column;

    > button {
      width: 100%;
    }
  }
}
</style>
