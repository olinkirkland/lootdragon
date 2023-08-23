<template>
  <div
    v-if="!!currentModal"
    class="modal-container"
    :class="{ dark: settingsStore.darkTheme }"
  >
    <div class="modal-container__background"></div>
    <component :is="currentModal" v-bind="currentModalOptions" />
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
import { useSettingsStore } from '@/stores/settingsStore';
import { ComponentOptions, shallowRef } from 'vue';

const settingsStore = useSettingsStore();

const currentModal = shallowRef<ComponentOptions | null>(null);
const currentModalOptions = shallowRef<Record<string, unknown> | null>(null);

ModalController.getInstance().addEventListener(({ modal, options }) => {
  // Close
  if (!modal) return (currentModal.value = null);

  // Open
  currentModal.value = { ...modal };
  currentModalOptions.value = { ...options };
});
</script>

<style scoped lang="scss">
.modal-container {
  width: 100%;
  height: 100vh;
  height: -webkit-fill-available;
  position: absolute;
  top: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 99;

  > .modal-container__background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: -1;
  }
}
</style>
