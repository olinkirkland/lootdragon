<template>
  <div class="modal">
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
            <badge ref="badgeRef" :show="password !== confirmPassword">
              Passwords do not match
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

function registerUser() {
  console.log('register');
  if (password.value !== confirmPassword.value) {
    badgeRef.value?.validate();
    return;
  }

  register(username.value, password.value);
}
</script>

<style scoped lang="scss"></style>
