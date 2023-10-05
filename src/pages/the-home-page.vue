<template>
  <div class="home-container">
    <div class="wallpaper"></div>
    <div class="home">
      <h1>Loot Dragon</h1>
      <p class="muted">Pathfinder 2E Items & Loot</p>
      <div class="actions">
        <button class="tile" @click="router.push({ name: 'items' })">
          <img src="/assets/images/warehouse.jpg" />
          <div class="tile__content">
            <h3>Pathfinder 2E<br />Items</h3>
          </div>
        </button>
        <button class="tile" @click="router.push({ name: 'treasures' })">
          <img src="/assets/images/treasure.jpg" />
          <div class="tile__content">
            <h3>Treasures</h3>
          </div>
        </button>
        <button
          v-if="!user"
          class="tile"
          @click="ModalController.open(RegisterModal)"
        >
          <img src="/assets/images/tavern.jpg" />
          <div class="tile__content">
            <h3>Sign up</h3>
          </div>
        </button>
        <button v-else class="tile" @click="ModalController.open(AccountModal)">
          <img src="/assets/images/bazaar.jpg" />
          <div class="tile__content">
            <h3>My Account</h3>
          </div>
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
    </div>
    <div class="daily-item">
      <div class="header">
        <i class="fas fa-dice-d20"></i>
        <p>Today's Random Item</p>
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
@mixin border-squares() {
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  border-bottom-left-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
}

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
    background-color: var(--dark-translucent);
    display: flex;
    flex-direction: column;
    align-items: center;

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

button.tile {
  background-color: transparent;
  border: 1px solid var(--primary-color);
  width: 20rem;
  height: max-content;
  max-height: 32rem;
  overflow: hidden;
  padding: 0;
  margin: 0;
  border-radius: 0;
  position: relative;

  @include border-squares();

  * {
    color: var(--primary-color);
  }

  > img {
    filter: brightness(0.6);
    height: 100%;
    transition: filter 0.2s ease-in-out;
  }

  &:hover {
    > img {
      filter: brightness(0.8);
    }

    > .tile__content {
      > * {
        filter: drop-shadow(0 0 5px #000000);
      }
    }
  }

  > .tile__content {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;

    h3 {
      text-transform: uppercase;
      font-size: 1.6rem;
    }

    > * {
      transition: filter 0.4s ease-in-out;
    }

    > i {
      font-size: 2rem;
    }
  }
}

@media (max-width: 768px) {
  .actions {
    width: 100% !important;

    button.tile {
      height: 8rem;
      width: 100%;

      > img {
        width: 100%;
        height: initial;
        filter: brightness(0.6);
      }
    }
  }
}
</style>
