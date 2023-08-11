<template>
  <div class="app-container">
    <div class="page-container">
      <router-view name="app"></router-view>
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
</style>
