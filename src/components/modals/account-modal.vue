<template>
  <div class="modal">
    <header>
      <h2>{{ user?.username }}'s Account</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section>
        <p>
          Hi,
          <span class="primary">{{ user?.username }}</span
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
      <section></section>
      <section>
        <p>Click below to delete your account. This action is irreversible.</p>
        <button class="text" @click="ModalController.open(DeleteAccountModal)">
          <span>Delete Account</span>
        </button>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { logout } from '@/controllers/connection';
import { ModalController } from '@/controllers/modal-controller';
import { useUserStore } from '@/stores/userStore';
import { computed } from 'vue';
import ConfirmModal from './confirm-modal.vue';
import DeleteAccountModal from './delete-account-modal.vue';
import ResetPasswordModal from './reset-password-modal.vue';

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
</script>

<style scoped lang="scss"></style>
