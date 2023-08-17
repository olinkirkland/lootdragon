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

<style scoped lang="scss"></style>
