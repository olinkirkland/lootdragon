<template>
  <div class="modal">
    <header>
      <h2>Rarity</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section>
        <p>
          The rarity system is a powerful tool that helps you and your group
          customize your story, your characters, and your world to better match
          your game's themes and setting. You can also use it to keep the
          complexity of your game low by limiting access to unusual options.
        </p>
      </section>
      <section>
        <p>Sort filter by:</p>
        <button-group v-model="useSettingsStore().filterSortings.rarity">
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
        <p>
          <strong>Common elements</strong> are prevalent enough, at least among
          adventurers, that a player is assumed to be able to access them
          provided they meet the prerequisites (if any).
        </p>
        <p>
          <strong>Uncommon elements</strong> are difficult to access, but a PC
          can usually find them eventually with enough effort, potentially by
          choosing a specific character option or spending substantial downtime
          tracking them down.
        </p>
        <p>
          <strong>Rare elements</strong> are lost secrets, ancient magic, and
          other options that PCs can access only if you specifically make them
          available.
        </p>
        <p>
          <strong>Unique elements</strong> are one of a kind. You have full
          control over whether PCs can access them. Named NPCs are unique
          creatures, though that doesn't mean their base creature type is
          unique.
        </p>
        <p>
          For instance, an orc named Graytusk is unique, but that doesn't mean
          it would be any harder for a PC encountering her to tell she's an
          orc—just to discern specific information about her.
        </p>
      </section>
      <section>
        <p>You can read more about rarity on the Archives of Nethys page.</p>
        <a href="https://2e.aonprd.com/Rules.aspx?ID=914" target="_blank">
          <span>Archives of Nethys: Rarity in Your Game</span>
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
