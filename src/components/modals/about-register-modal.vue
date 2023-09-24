<template>
  <div class="modal">
    <header>
      <h2>What is a Loot Dragon Account?</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section>
        <p>
          A Loot Dragon account is free and unlocks additional features on the
          site.
        </p>
        <p>
          You don't need an Email to sign up for an account, just choose a
          username and a password you can remember.
        </p>
      </section>
      <section>
        <p>Features for registered users:</p>
        <ul class="features">
          <li>
            <p>
              <strong>Favorites: </strong>
              <span>Mark items as favorites (and filter)</span>
            </p>
          </li>
          <li>
            <p>
              <strong>Collections: </strong>
              <span>Create and share collections of items</span>
            </p>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
</script>

<style scoped lang="scss">
.coin-legend-container {
  border: 1px solid var(--surface-color-3);
  padding: 1rem;
  margin: 2rem auto 0 auto;
  width: fit-content;
  background-color: var(--surface-color-2);
}
.coin-legend {
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  gap: 1.2rem;
  flex-wrap: wrap;

  img {
    height: 2.4rem;
  }

  > span {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  > span:not(.coin-legend__diagram) {
    color: var(--text-color-3);
  }
}

ul.features > li {
  margin-left: 2.4rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  &::before {
    content: '•';
    color: var(--text-color-3);
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
