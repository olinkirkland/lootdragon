<template>
  <div class="modal" :class="{ busy: isBusy }">
    <header>
      <h2>Change Password</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section>
        <form @submit.prevent="resetUserPassword">
          <div class="form-group">
            <label for="password">Current Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              v-model="password"
            />
          </div>
          <div class="form-group">
            <label for="newPassword">New Password</label>
            <input
              type="password"
              placeholder="New Password"
              id="newPassword"
              v-model="newPassword"
            />
            <badge ref="badgeRef">
              {{ errorMessage }}
            </badge>
          </div>
          <div class="form-group">
            <button type="submit">
              <span>Reset Password</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { resetPassword } from '@/controllers/connection';
import { ModalController } from '@/controllers/modal-controller';
import { ref } from 'vue';
import Badge from '../badge.vue';
import ConfirmModal from './confirm-modal.vue';

const newPassword = ref('');
const password = ref('');
const badgeRef = ref<InstanceType<typeof Badge> | null>(null);
const errorMessage = ref('');
const isBusy = ref(false);

async function resetUserPassword() {
  isBusy.value = true;
  badgeRef.value?.hide();

  const error = await resetPassword(password.value, newPassword.value);
  isBusy.value = false;
  if (!!error) {
    let message = `An error occurred. (${error})`;
    switch (error) {
      case 401:
        message = 'Invalid username or password.';
        break;
    }
    errorMessage.value = message;
    badgeRef.value?.show();
    return;
  }

  // The user has successfully changed their password.
  ModalController.open(ConfirmModal, {
    title: 'Password Reset',
    text: 'Your password was successfully changed.',
    confirmText: 'OK',
    confirmCallback: () => {
      ModalController.close();
    }
  });
}
</script>

<style scoped lang="scss"></style>
