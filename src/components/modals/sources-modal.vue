<template>
  <div class="modal">
    <header>
      <h1>Sources</h1>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section>
        <p>
          Paizo sources refer to the official material published by Paizo Inc.
          for the Pathfinder Roleplaying Game, including rulebooks, adventure
          paths, and supplementary content. These sources provide the foundation
          for the Pathfinder game system, offering a wide range of character
          options, spells, feats, and rich lore for players and Game Masters.
        </p>
        <p>
          If you're looking to explore and access these valuable resources, you
          can find them conveniently organized and easily accessible on the
          Archives of Nethys, a comprehensive online database dedicated to
          Pathfinder content.
        </p>
      </section>
      <section>
        <p>You can read more about sources on the Archives of Nethys page.</p>
        <a href="https://2e.aonprd.com/Sources.aspx" target="_blank">
          <span>Archives of Nethys: Sources</span>
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
