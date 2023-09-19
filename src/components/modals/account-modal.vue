<template>
  <div class="modal">
    <header>
      <h2>My Account</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section>
        <p>
          Hi,
          <span class="primary">{{ capitalize(user?.username) }}</span
          >. This is your account overview.
        </p>
      </section>
      <section>
        <div class="flex">
          <button @click="ModalController.open(ResetPasswordModal)">
            <span>Change Password</span>
          </button>
          <button @click="logoutUser">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </section>
      <section>
        <p>Use this option to clear your list of favorite items.</p>
        <button @click="askClearFavorites">
          <i class="fas fa-trash"></i>
          <span>Clear Favorites ({{ user?.favorites.length }})</span>
        </button>
      </section>
      <section>
        <p>Click below to delete your account. This action is irreversible.</p>
        <button @click="ModalController.open(DeleteAccountModal)">
          <span>Delete Account</span>
        </button>
      </section>
      <section>
        <p class="muted">ID: {{ user?.id }}</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { clearFavorites, logout } from '@/controllers/connection';
import { ModalController } from '@/controllers/modal-controller';
import { useUserStore } from '@/stores/userStore';
import { computed } from 'vue';
import AccountModal from './account-modal.vue';
import ConfirmModal from './confirm-modal.vue';
import DeleteAccountModal from './delete-account-modal.vue';
import ResetPasswordModal from './reset-password-modal.vue';
import { capitalize } from '@/utils';

const user = computed(() => {
  return useUserStore().user;
});

function logoutUser() {
  ModalController.open(ConfirmModal, {
    title: 'Logout',
    text: 'Are you sure you want to log out?',
    confirmText: 'Logout',
    confirmCallback: () => {
      logout();
      ModalController.close();
    }
  });
}

function askClearFavorites() {
  ModalController.open(ConfirmModal, {
    title: 'Clear favorites',
    text: 'This will clear your list of favorite items. Are you sure?',
    confirmText: "Yes, I'm sure",
    confirmCallback: async () => {
      await clearFavorites();
      ModalController.open(AccountModal);
    }
  });
}
</script>

<style scoped lang="scss"></style>
