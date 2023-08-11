<template>
  <card>
    <div class="home-container">
      <!-- <p>home page</p> -->
      <!-- <button @click="router.push({ name: 'register' })">register</button> -->
      <!-- <button @click="router.push({ name: 'login' })">login</button> -->
      <button @click="openModal">Open Modal</button>
    </div>
  </card>
</template>

<script setup lang="ts">
import TestModal from '@/components/modals/test-modal.vue';
import { ModalController } from '@/controllers/modal-controller';

function openModal() {
  ModalController.open(TestModal, { title: 'Hello world' });
}
</script>

<style scoped lang="scss">
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
}
</style>
