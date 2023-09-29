<template>
  <div class="modal">
    <header>
      <h2>Settings</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section>
        <h3>Display</h3>
        <p>Customize how the app appears.</p>

        <!-- Theme -->
        <div class="checkbox-group">
          <input
            type="checkbox"
            id="darkTheme"
            v-model="settingsStore.darkTheme"
          />
          <label for="darkTheme">
            <p><strong>Dark Theme</strong></p>
            <p>Use a dark theme instead of a light theme.</p>
          </label>
        </div>

        <!-- Large Number Abbreviation -->
        <div class="checkbox-group">
          <input
            type="checkbox"
            id="largeNumberAbbreviation"
            v-model="settingsStore.largeNumberAbbreviation"
          />
          <label for="largeNumberAbbreviation">
            <p><strong> Large Number Abbreviation </strong></p>
            <p>
              Display large numbers such as 4,000 and 20,000 as 4K and 20K to
              increase legibility.
            </p>
          </label>
        </div>
      </section>
      <section>
        <h3>Source Bindings</h3>
        <p>
          If you own PDFs of source material from Paizo, you can set paths to
          them here, and the links to the Archives of Nethys sources page will
          be replaced with links to your PDF opened to the relevant page.
        </p>
        <p>
          <em>
            This feature requires a browser extension and will probably not work
            on mobile devices.
          </em>
        </p>
        <button @click="ModalController.open(SourceBindingsModal)">
          <i class="fas fa-edit"></i>
          <span>Edit Source Bindings</span>
        </button>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
import { useSettingsStore } from '@/stores/settingsStore';
import SourceBindingsModal from './source-bindings-modal.vue';

const settingsStore = useSettingsStore();
</script>

<style scoped lang="scss"></style>
