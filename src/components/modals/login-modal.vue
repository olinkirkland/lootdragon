<template>
  <div class="modal">
    <header>
      <h2>Log in</h2>
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
          </div>
          <div class="form-group">
            <button type="submit">
              <span>Log in</span>
            </button>
          </div>
        </form>
      </section>
      <section>
        <p>Dont have an account?</p>
        <button @click="ModalController.open(RegisterModal)">
          <i class="fas fa-sign-in-alt"></i>
          <span>Sign up</span>
        </button>
      </section>
      <section>
        <p>Forgot your password?</p>
        <button>
          <i class="fas fa-key"></i>
          <span>Reset Password</span>
        </button>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
import RegisterModal from './register-modal.vue';
import { ref } from 'vue';
import { login } from '@/controllers/connection';
const username = ref('');
const password = ref('');

function loginUser() {
  login(username.value, password.value);
}
</script>

<style scoped lang="scss"></style>
