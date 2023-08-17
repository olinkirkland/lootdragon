<template>
  <div class="modal">
    <header>
      <h2>Item Categories</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section>
        <p>
          Item categories play an important role in organizing and defining the
          diverse range of items available within the game world.
        </p>
        <p>
          These categories provide a structured framework that helps describe
          the unique properties, uses, and rules associated with different types
          of equipment, consumables, and treasures.
        </p>
      </section>
      <section>
        <p>
          You can find more details about item categories on the Archives of
          Nethys Equipment page.
        </p>
        <a href="https://2e.aonprd.com/Equipment.aspx" target="_blank">
          <span>Archives of Nethys: Equipment</span>
        </a>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
</script>

<style scoped lang="scss"></style>
