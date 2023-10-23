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
        <p>Sort filter by:</p>
        <button-group v-model="useSettingsStore().filterSortings.traits">
          <button value="alpha">
            <i class="fas fa-sort-alpha-up"></i>
            <span>Alphabetical</span>
          </button>
          <button value="numeric">
            <i class="fas fa-sort-numeric-down-alt"></i>
            <span>Quantity</span>
          </button>
        </button-group>
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
import { useSettingsStore } from '@/stores/settingsStore';
</script>

<style scoped lang="scss"></style>
