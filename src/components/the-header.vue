<template>
  <header class="app-header">
    <div @click="router.push('/')" class="logo">
      <img src="/assets/images/logo.png" alt="logo" />
      <h1>Loot Dragon</h1>
    </div>
    <button class="icon" @click="ModalController.open(SettingsModal)">
      <i class="fas fa-cog"></i>
    </button>
  </header>
</template>

<script setup lang="ts">
import SettingsModal from '@/components/modals/settings-modal.vue';
import { ModalController } from '@/controllers/modal-controller';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style lang="scss">
header.app-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: var(--dark);
  padding: 1.2rem;
  border-bottom: 1px solid var(--shadow);

  h1,
  button.icon {
    color: var(--primary-color);
  }

  > .logo {
    display: flex;
    align-items: center;
    color: var(--primary-color);
    cursor: pointer;

    > h1 {
      font-size: 1.6rem;
      font-weight: lighter;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    > img {
      height: 4rem;
      margin-right: 0.8rem;
    }
  }
}
</style>
