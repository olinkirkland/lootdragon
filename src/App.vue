<template>
  <div class="app-container" :class="themeClass">
    <the-header />
    <router-view name="app"></router-view>
    <div class="page-container">
      <router-view name="page"></router-view>
    </div>
  </div>
  <modal-container :class="themeClass"/>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ModalContainer from './components/modal-container.vue';
import TheHeader from './components/the-header.vue';
import themes from './data/themes.json';
import { useSettingsStore } from './stores/settingsStore';

const settingsStore = useSettingsStore();

const themeClass = computed(() => {
  const theme = themes.find((t) => t.id === settingsStore.theme);
  return theme?.styleClass || themes[0].styleClass;
});
</script>

<style lang="scss">
@import './assets/css/styles.css';
@import './assets/css/buttons.css';
@import './assets/css/modals.css';

.app-container {
  width: 100%;
  height: 100vh;
  max-height: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
