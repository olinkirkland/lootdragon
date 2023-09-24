<template>
  <div class="home-container">
    <div class="wallpaper"></div>
    <div class="home">
      <img src="/assets/images/logo.webp" id="logo" alt="logo" />
      <h1>Loot Dragon</h1>
      <div class="actions">
        <button class="primary" @click="router.push({ name: 'items' })">
          <i class="fas fa-box-open"></i>
          <span>Items</span>
        </button>
        <!-- <button
          v-if="user"
          class="primary"
          @click="router.push({ name: 'collections' })"
        >
          <i class="fas fa-boxes"></i>
          <span>My Collections</span>
        </button> -->
      </div>
      <div class="sign-up-box" v-if="!user">
        <p>Sign up for a free account to unlock additional features.</p>
        <div class="flex">
          <button class="primary" @click="ModalController.open(RegisterModal)">
            <span>Sign up</span>
          </button>
          <button
            class="text"
            @click="ModalController.open(AboutRegisterModal)"
          >
            <span class="primary">Learn more</span>
          </button>
        </div>
      </div>
    </div>
    <div class="daily-item">
      <div class="header">
        <i class="fas fa-calendar-day"></i>
        <p>Item of the Day</p>
      </div>
      <div class="content">
        <button
          @click="ModalController.open(ItemModal, { item: dailyItem })"
          class="text primary"
        >
          <span>{{ dailyItem.name.text }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AboutRegisterModal from '@/components/modals/about-register-modal.vue';
import ItemModal from '@/components/modals/item-modal.vue';
import RegisterModal from '@/components/modals/register-modal.vue';
import { ModalController } from '@/controllers/modal-controller';
import router from '@/router';
import { useItemsStore } from '@/stores/itemsStore';
import { useUserStore } from '@/stores/userStore';
import seedrandom from 'seedrandom';
import { computed } from 'vue';

const dailyItem = computed(() => {
  const date = new Date();
  const seed = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
  const rng = seedrandom(seed);
  const randomNumber = rng;
  return useItemsStore().items[
    Math.floor(randomNumber() * useItemsStore().items.length)
  ];
});

const user = computed(() => {
  return useUserStore().user;
});
</script>

<style scoped lang="scss">
.home-container {
  width: 100%;
  height: 100vh;
  max-height: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  position: relative;
  overflow: hidden;
  justify-content: center;
  align-items: center;

  > .wallpaper {
    background: url('/assets/images/wallpaper.webp');
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
      font-size: 4rem;
      font-weight: normal;
      font-family: 'Croissant One';
      color: var(--primary-color);
    }

    .actions {
      display: flex;
      width: fit-content;
      padding: 2rem;
      gap: 0.8rem;
    }
  }

  > .daily-item {
    bottom: 0.4rem;
    width: 100%;
    padding: 1.2rem;
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

.sign-up-box {
  border: 1px solid var(--primary-color);
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
}

@media (max-width: 768px) {
  .actions {
    flex-direction: column;
    align-items: center;
  }

  #logo {
    max-width: 16rem !important;
  }

  .home-container {
    gap: 0;
  }
  .home {
    border: none !important;
    flex: 1;
    width: 100%;
  }

  .daily-item {
    position: static !important;
    bottom: unset;
    background-color: var(--dark-translucent) !important;
  }
}
</style>
