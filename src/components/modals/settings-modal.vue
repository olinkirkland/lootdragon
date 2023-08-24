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

        <!-- Table Mode -->
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

        <!-- Obvious Rarity -->
        <div class="checkbox-group">
          <input
            type="checkbox"
            id="obviousRarity"
            v-model="settingsStore.obviousRarity"
          />
          <label for="obviousRarity">
            <p><strong>High Visibility Rarity</strong></p>
            <p>
              Display the rarity of each item in a more obvious way, by adding a
              colored background to the item card instead of a small icon.
            </p>
          </label>
        </div>
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
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
import { useSettingsStore } from '@/stores/settingsStore';

const settingsStore = useSettingsStore();
</script>

<style scoped lang="scss"></style>
