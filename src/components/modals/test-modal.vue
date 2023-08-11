<template>
  <div class="modal">
    <header>
      <h1>{{ props.title }}</h1>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <section>
      <p>Props</p>
      <pre>{{ props }}</pre>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';

const props = defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<style scoped lang="scss">
.modal {
  background-color: white;
  width: 40rem;
  height: 40rem;
  padding: 2rem;
  border: 1px solid black;

  header {
    display: flex;
    justify-content: space-between;
    h1 {
      color: black;
    }
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
}
</style>
