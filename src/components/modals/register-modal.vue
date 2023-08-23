<template>
  <div class="modal" :class="{ busy: isBusy }">
    <header>
      <h2>Sign up</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section>
        <form @submit.prevent="registerUser">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              placeholder="Username"
              id="username"
              v-model="username"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              v-model="password"
            />
          </div>
          <div class="form-group">
            <label for="confirm-password">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              id="confirm-password"
              v-model="confirmPassword"
            />
            <badge ref="badgeRef">
              {{ errorMessage }}
            </badge>
          </div>

          <div class="form-group">
            <button type="submit">
              <span>Sign up</span>
            </button>
          </div>
        </form>
      </section>
      <section>
        <p>Already have an account?</p>
        <button @click="ModalController.open(LoginModal)">
          <i class="fas fa-sign-in-alt"></i>
          <span>Log in</span>
        </button>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { register } from '@/controllers/connection';
import { ModalController } from '@/controllers/modal-controller';
import { ref } from 'vue';
import Badge from '../badge.vue';
import LoginModal from './login-modal.vue';

const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const badgeRef = ref<InstanceType<typeof Badge> | null>(null);
const errorMessage = ref('');
const isBusy = ref(false);

async function registerUser() {
  isBusy.value = true;
  badgeRef.value?.hide();
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.';
    badgeRef.value?.show();
    return;
  }

  const error = await register(username.value, password.value);
  isBusy.value = false;
  if (!!error) {
    let message = `An error occurred. (${error})`;
    switch (error) {
      case 409:
        message = 'Username already exists.';
        break;
    }
    errorMessage.value = message;
    badgeRef.value?.show();
    return;
  }

  // The user has been registered successfully and logged in (automatically)
  // so we can close the modal.
  ModalController.close();
}
</script>

<style scoped lang="scss">
.busy {
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;

    opacity: 0.8;
    background-color: var(--surface-color);
  }
}
</style>
