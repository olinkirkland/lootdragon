<template>
  <div class="modal">
    <header>
      <h2>Sources</h2>
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
</style>
