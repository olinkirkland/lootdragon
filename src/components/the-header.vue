<template>
  <header class="app-header">
    <div @click="router.push('/')" class="logo">
      <img
        :src="`/assets/images/logo-${useSettingsStore().theme}.png`"
        alt="logo"
      />
      <h1>Loot Dragon</h1>
      <span v-if="nav && nav !== 'home'" class="nav">
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
import { useSettingsStore } from '@/stores/settingsStore';

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
  background-color: var(--surface-color);
  min-height: 6.4rem !important;
  padding: 0 1.4rem 0 2rem;
  border-bottom: 1px solid var(--surface-color-3);

  h1,
  button.icon {
    color: var(--text-color);
  }
  > .logo {
    display: flex;
    align-items: center;
    color: var(--text-color);
    position: relative;
    cursor: pointer;

    > h1 {
      font-family: 'Croissant One' !important;
      font-size: 2.4rem;
      font-weight: normal;
      z-index: 2;
    }

    > span.nav {
      white-space: nowrap;
      max-width: 12rem;
      flex: 1;
      text-overflow: ellipsis;
      overflow: hidden;

      z-index: 1;
      font-weight: bold;
      text-transform: uppercase;
      margin-left: 0.4rem;
      font-size: 1.2rem;
      opacity: 0.6;
      color: var(--text-color);
      box-shadow: var(--shadow);
      pointer-events: none;
      &::before {
        content: '|';
        margin-right: 0.2rem;
      }
    }

    > img {
      height: 3.2rem;
      margin-right: 0.8rem;
      z-index: 2;
    }
  }
}

// Phone
@media (max-width: 768px) {
  .logo > span.nav {
    display: none;
  }
}
</style>
