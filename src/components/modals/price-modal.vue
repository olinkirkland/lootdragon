<template>
  <div class="modal">
    <header>
      <h2>Coins & Currency</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section>
        <p>
          The most common currencies in the game are
          <strong>gold pieces</strong> (gp) and
          <strong>silver pieces</strong> (sp).
        </p>
        <p>One gold piece is worth 10 silver pieces.</p>
        <p>
          In addition, 1 silver piece is worth 10
          <strong>copper pieces</strong> (cp), and 10 gold pieces are worth 1
          platinum piece (pp).
        </p>
        <p>
          Characters begin play with 15 gp (or 150 sp) to spend on equipment.
        </p>
        <p>
          Platinum pieces are ignored in this item browser for the sake of
          readability.
        </p>
      </section>
      <div class="coin-legend-container">
        <span class="coin-legend">
          <span class="coin-legend__diagram">
            <img class="coin" :src="BASE_URL + 'assets/images/copper.png'" />
            <span>10 =</span>
            <img class="coin" :src="BASE_URL + 'assets/images/silver.png'" />
            <span>1</span>
          </span>
          <span>and</span>
          <span class="coin-legend__diagram">
            <img class="coin" :src="BASE_URL + 'assets/images/silver.png'" />
            <span>10 =</span>
            <img class="coin" :src="BASE_URL + 'assets/images/gold.png'" />
            <span>1</span>
          </span>
        </span>
      </div>
      <section>
        <p>You can read more about currency on the Archives of Nethys page.</p>
        <a href="https://2e.aonprd.com/Rules.aspx?ID=25" target="_blank">
          <span>Archives of Nethys: Coins and Currency</span>
        </a>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
import { BASE_URL } from '@/router';
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

@media (max-width: 768px) {
  .modal {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
