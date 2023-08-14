<template>
  <div class="modal">
    <header>
      <h2>Levels</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section>
        <p>A level is a number that measures something's overall power.</p>
        <p>
          An item's level, usually within the range of 0 to 20 but sometimes
          higher, indicates its power and suitability as treasure.
        </p>
      </section>
      <section>
        <p>You can read more about levels on the Archives of Nethys page.</p>
        <a href="https://2e.aonprd.com/Rules.aspx?ID=31" target="_blank">
          <span>Archives of Nethys: Levels</span>
        </a>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
</script>

<style scoped lang="scss">
.modal {
  background-color: white;
  min-width: 40%;
  max-width: 64rem;
  min-height: 40%;
  max-height: 64rem;
  border: 1px solid black;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px dashed #222;
    padding: 1.2rem;

    h1 {
      color: #222;
    }
  }

  .modal__content {
    overflow-y: scroll;
    flex: 1;
  }

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
