<template>
  <div class="modal" :class="{ busy: isBusy }">
    <header>
      <h2>Delete Account</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section>
        <p>
          Confirm that you want to delete your account by entering your password
          below.
        </p>
        <form @submit.prevent="deleteUserAccount">
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              v-model="password"
            />
            <badge ref="badgeRef">
              {{ errorMessage }}
            </badge>
          </div>
          <div class="form-group">
            <button type="submit" class="danger">
              <span>I'm sure. Delete my account</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { deleteAccount } from '@/controllers/connection';
import { ModalController } from '@/controllers/modal-controller';
import { ref } from 'vue';
import Badge from '../badge.vue';
import LoadingModal from './loading-modal.vue';

const password = ref('');
const badgeRef = ref<InstanceType<typeof Badge> | null>(null);
const errorMessage = ref('');
const isBusy = ref(false);

async function deleteUserAccount() {
  isBusy.value = true;
  badgeRef.value?.hide();

  const error = await deleteAccount(password.value);
  isBusy.value = false;
  if (!!error) {
    let message = `An error occurred. (${error})`;
    switch (error) {
      case 401:
        message = 'Invalid password.';
        break;
    }
    errorMessage.value = message;
    badgeRef.value?.show();
    return;
  }

  // The user has been deleted
  // so we can close the modal.
  ModalController.open(LoadingModal);
  location.reload();
}
</script>

<style scoped lang="scss"></style>
