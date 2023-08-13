<template>
  <div class="modal">
    <header>
      <h2>Rarity</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea nemo
          iusto incidunt quae asperiores rerum earum impedit, dolores et dolorum
          itaque ipsa! Delectus reprehenderit soluta repudiandae nobis amet iure
          debitis, facere, nulla doloribus temporibus molestiae consectetur sunt
          quam. Rem, culpa?
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
</script>

<style scoped lang="scss">
.modal {
  section {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.2rem;

    &:not(:last-child) {
      border-bottom: 1px solid #dddddd;
    }
  }
}

@media (max-width: 768px) {
  .modal {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
