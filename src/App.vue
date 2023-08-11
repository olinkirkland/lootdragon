<template>
  <div class="app-container">
    <router-view name="app"></router-view>
    <div class="page-container">
      <router-view name="page"></router-view>
    </div>
  </div>
  <modal-container />
</template>

<script setup lang="ts">
import ModalContainer from './components/modal-container.vue';
</script>

<style lang="scss">
@import './assets/css/styles.css';
@import './assets/css/buttons.css';
@import './assets/css/modals.css';

.app-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
