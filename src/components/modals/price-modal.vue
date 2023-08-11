<template>
  <div class="modal">
    <header>
      <h1>Coins & Currency</h1>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
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
      <p>Characters begin play with 15 gp (or 150 sp) to spend on equipment.</p>
      <p>
        Platinum pieces are ignored in this item browser for the sake of
        readability.
      </p>
    </section>
    <section class="coin-legend-container">
      <span class="coin-legend">
        <span>
          <img class="coin" src="@/assets/img/copper.png" />
          <span>10 =</span>
          <img class="coin" src="@/assets/img/silver.png" />
          <span>1</span>
        </span>
        <span>
          <img class="coin" src="@/assets/img/silver.png" />
          <span>10 =</span>
          <img class="coin" src="@/assets/img/gold.png" />
          <span>1</span>
        </span>
      </span>
    </section>
    <section>
      <p>You can read more about this on the Archives of Nethys page.</p>
      <a href="https://2e.aonprd.com/Rules.aspx?ID=25" target="_blank">
        <span>Archives of Nethys: Coins and Currency</span>
      </a>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
</script>

<style scoped lang="scss">
.modal {
  background-color: white;
  width: 40rem;
  height: 40rem;
  border: 1px solid black;

  header {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px dashed #222;
    padding: 1.2rem;

    h1 {
      color: #222;
    }

    button.icon {
      margin-top: 1.2rem;
      margin-right: 1.2rem;
    }
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.2rem;
  }
}

.coin-legend {
  display: flex;
  align-items: center;
  font-size: 2.4rem;
  gap: 1.2rem;

  img {
    height: 2.4rem;
  }

  > span {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 1.2rem 1.6rem;
    background-color: #fafafa;
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
