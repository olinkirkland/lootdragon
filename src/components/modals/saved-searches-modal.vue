<template>
  <div class="modal">
    <header>
      <h2>Saved Searches</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa
          voluptatibus autem, voluptatem cupiditate animi earum eos esse! Enim,
          voluptatem alias.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
</script>

<style scoped lang="scss"></style>
