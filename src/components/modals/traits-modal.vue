<template>
  <div class="modal">
    <header>
      <h2>Traits</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section>
        <p>
          A trait is a keyword that conveys additional information about a rules
          element, such as a school of magic or rarity. Often, a trait indicates
          how other rules interact with an ability, creature, item, or another
          rules element that has that trait.
        </p>
        <p>
          Common traits include magical, consumable, alchemical, transmutation,
          and evocation.
        </p>
      </section>
      <section>
        <p>You can read more about traits on the Archives of Nethys page.</p>
        <a href="https://2e.aonprd.com/Traits.aspx" target="_blank">
          <span>Archives of Nethys: Traits</span>
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
