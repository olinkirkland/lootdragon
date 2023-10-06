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
        <div class="primary">
          <p><strong>Theme</strong></p>
          <div class="themes">
            <ul class="themes-list">
              <li v-for="theme in themes" :key="theme.id">
                <label :class="{ active: theme.id === settingsStore.theme }">
                  <input
                    type="radio"
                    v-model="settingsStore.theme"
                    :value="theme.id"
                  />
                  <color-bar :colors="theme.colors" />
                  <span>{{ theme.label }}</span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <!-- Large Number Abbreviation -->
        <div class="checkbox-group checkbox-group--setting">
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
import themes from '@/data/themes.json';
import { useSettingsStore } from '@/stores/settingsStore';
import ColorBar from '../color-bar.vue';
import SourceBindingsModal from './source-bindings-modal.vue';

const settingsStore = useSettingsStore();
</script>

<style scoped lang="scss">
ul.themes-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;

  > li > label {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    cursor: pointer;
    padding: 2rem;
    background-color: var(--surface-color);
    border: 1px solid var(--surface-color-2);

    > input {
      display: none;
    }

    > span {
      font-style: italic;
      text-align: center;
    }

    &:hover {
      border-color: var(--surface-color-3);
    }

    &.active {
      background-color: var(--surface-color-2);
      :deep(.color-rectangle) {
        border-color: var(--surface-color-2);
      }
    }
  }
}

@media (max-width: 768px) {
  ul.themes-list {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 0.8rem;
  }
}
</style>
