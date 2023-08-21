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
        <p>
          Hi,
          <strong>{{ user?.username }}</strong>
          !
        </p>
      </section>
      <section></section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
import { useUserStore } from '@/stores/userStore';
import { User } from '@/types';
import { ref } from 'vue';

const user = ref<null | User>(useUserStore().user);
</script>

<style scoped lang="scss"></style>
