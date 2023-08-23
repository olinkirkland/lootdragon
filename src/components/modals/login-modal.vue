<template>
  <div class="modal" :class="{ busy: isBusy }">
    <header>
      <h2>Login</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section>
        <form @submit.prevent="loginUser">
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
            <badge ref="badgeRef">
              {{ errorMessage }}
            </badge>
          </div>
          <div class="form-group">
            <button type="submit">
              <span>Login</span>
            </button>
          </div>
        </form>
      </section>
      <section>
        <p>Don't have an account?</p>
        <button @click="ModalController.open(RegisterModal)">
          <i class="fas fa-sign-in-alt"></i>
          <span>Sign up</span>
        </button>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { login } from '@/controllers/connection';
import { ModalController } from '@/controllers/modal-controller';
import { ref } from 'vue';
import Badge from '../badge.vue';
import RegisterModal from './register-modal.vue';

const username = ref('');
const password = ref('');
const badgeRef = ref<InstanceType<typeof Badge> | null>(null);
const errorMessage = ref('');
const isBusy = ref(false);

async function loginUser() {
  isBusy.value = true;
  badgeRef.value?.hide();

  const error = await login(username.value, password.value);
  isBusy.value = false;
  if (!!error) {
    errorMessage.value = error;
    badgeRef.value?.show();
    return;
  }

  // The user has been logged in successfully
  // so we can close the modal.
  ModalController.close();
}
</script>

<style scoped lang="scss"></style>
