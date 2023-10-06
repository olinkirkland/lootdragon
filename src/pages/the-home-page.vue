<template>
  <div class="home-container">
    <div class="home">
      <!-- <h1>Loot Dragon</h1> -->
      <!-- <p class="muted">Pathfinder 2E Items & Loot</p> -->
      <div class="actions">
        <home-button-tile
          label="Pathfinder 2E Items"
          image="/assets/images/warehouse.jpg"
          @click="router.push({ name: 'items' })"
        />
        <!-- <home-button-tile
          label="Treasures"
          image="/assets/images/treasure.jpg"
          @click="router.push({ name: 'treasures' })"
        /> -->
        <home-button-tile
          v-if="!user"
          label="Sign up"
          image="/assets/images/tavern.jpg"
          @click="ModalController.open(RegisterModal)"
        />
        <home-button-tile
          v-else
          label="My Account"
          image="/assets/images/bazaar.jpg"
          @click="ModalController.open(AccountModal)"
        />
      </div>
    </div>
    <div class="daily-item">
      <div class="header">
        <i class="fas fa-dice-d20"></i>
        <p>Today's Random Item</p>
      </div>
      <div class="content">
        <button
          @click="ModalController.open(ItemModal, { item: dailyItem })"
          class="text"
        >
          <span>{{ dailyItem.name.text }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeButtonTile from '@/components/home-button-tile.vue';
import AccountModal from '@/components/modals/account-modal.vue';
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
  position: relative;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  background-color: var(--surface-color);

  .home {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;

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
    width: 100%;
    padding: 1.2rem;
    background-color: var(--surface-color);
    border-top: 1px solid var(--surface-color-2);
    display: flex;
    flex-direction: column;
    align-items: center;

    > .header {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      color: var(--text-color);
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
    background-color: var(--surface-color);
  }

  .actions {
    width: 100% !important;
  }
}
</style>
