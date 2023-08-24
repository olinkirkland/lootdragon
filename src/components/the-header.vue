<template>
  <header class="app-header">
    <div @click="router.push('/')" class="logo">
      <img src="/assets/images/logo.png" alt="logo" />
      <h1>Loot Dragon</h1>
      <span v-if="nav" class="nav-headline">
        {{ nav }}
      </span>
    </div>
    <div class="flex">
      <button v-if="isLocalHost" class="icon" @click="toggleBaseUrlAndReload">
        <i
          :class="
            BASE_URL === PROD_BASE_URL
              ? 'fas fa-satellite-dish'
              : 'fas fa-laptop'
          "
        ></i>
      </button>
      <button
        v-if="!!user"
        class="icon"
        @click="ModalController.open(AccountModal)"
      >
        <i class="fas fa-user-circle"></i>
      </button>
      <button class="icon" @click="ModalController.open(MenuModal)">
        <i class="fas fa-bars"></i>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import {
  BASE_URL,
  DEV_BASE_URL,
  PROD_BASE_URL
} from '@/controllers/connection';
import { ModalController } from '@/controllers/modal-controller';
import { useNavStore } from '@/stores/navStore';
import { useUserStore } from '@/stores/userStore';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import AccountModal from './modals/account-modal.vue';
import MenuModal from './modals/menu-modal.vue';

const router = useRouter();
const user = computed(() => {
  return useUserStore().user || null;
});

const nav = computed(() => {
  return useNavStore().nav || null;
});

const isLocalHost = window.location.hostname === 'localhost';

function toggleBaseUrlAndReload() {
  localStorage.setItem(
    'baseUrl',
    BASE_URL === PROD_BASE_URL ? DEV_BASE_URL : PROD_BASE_URL
  );
  location.reload();
}
</script>

<style lang="scss" scoped>
header.app-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--dark);
  min-height: 6.4rem !important;
  padding: 0 1.4rem;
  border-bottom: 1px solid var(--dark-translucent);

  h1,
  button.icon {
    color: var(--primary-color);
  }
  > .logo {
    display: flex;
    align-items: center;
    color: var(--primary-color);
    position: relative;
    cursor: pointer;

    > h1 {
      font-family: 'Aloevera' !important;
      font-size: 2.4rem;
      font-weight: normal;
    }

    > span.nav-headline {
      z-index: 1;
      font-weight: bold;
      position: absolute;
      transform: rotate(-5deg);
      top: 2.6rem;
      left: -0.4rem;
      text-transform: uppercase;
      padding: 0.4rem 0.6rem;
      font-size: 1.2rem;
      background-color: var(--surface-color);
      box-shadow: 0 0 0.4rem var(--shadow);
      pointer-events: none;
    }

    > img {
      height: 3.2rem;
      margin-right: 2.4rem;
      z-index: 2;
    }
  }
}
</style>
