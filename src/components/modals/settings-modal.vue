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
        <div class="checkbox-group">
          <input
            type="checkbox"
            id="tableMode"
            v-model="settingsStore.tableMode"
          />
          <label for="tableMode">
            <p><strong>Table Mode</strong></p>
            <p>
              In desktop view, display the data in a table instead of in the
              wrap view. In mobile view, align the width of the price column.
            </p>
          </label>
        </div>
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
        <!-- Obvious Rarity -->
      </section>
      <section>
        <h3>Filters</h3>
        <!-- Save filter choices locally -->
        <div class="checkbox-group">
          <input
            type="checkbox"
            id="saveFilterChoices"
            v-model="settingsStore.saveFilterChoices"
          />
          <label for="saveFilterChoices">
            <p><strong>Save Filter Choices</strong></p>
            <p>
              Save the filter choices you make so that they are automatically
              applied when you return to the site.
            </p>
          </label>
        </div>
        <button @click="props.resetFiltersFunc">
          <i class="fas fa-sync-alt"></i>
          <span>Reset Filters</span>
        </button>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
import { useSettingsStore } from '@/stores/settingsStore';

const settingsStore = useSettingsStore();

const props = defineProps({
  resetFiltersFunc: {
    type: Function,
    required: true
  }
});
</script>

<style scoped lang="scss">
.modal {
  section {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.2rem;

    &:not(:last-child) {
      border-bottom: 1px solid #ddd;
    }
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
