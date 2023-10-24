<template>
  <div class="modal">
    <section>
      <img
        :src="`/assets/images/logo-${useSettingsStore().theme}.png`"
        alt="logo"
      />
      <p class="loading-text">
        <span v-if="!!useNavStore().loadingText">{{
          useNavStore().loadingText
        }}</span>
        <i class="fas fa-spinner fa-spin"></i>
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useNavStore } from '@/stores/navStore';
import { useSettingsStore } from '@/stores/settingsStore';
</script>

<style scoped lang="scss">
.modal {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  min-width: 0;
  min-height: 0;
  padding: 2rem 4rem;
  background-color: var(--surface-color);
  border: none;

  section {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.2rem;
    align-items: center;
    justify-content: center;
    height: 100%;

    > img {
      width: 8rem;
      height: 8rem;
    }

    p.loading-text {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      gap: 0.8rem;
      color: var(--text-color);
    }

    &:not(:last-child) {
      border-bottom: 1px solid var(--text-color);
    }
  }
}

@media (max-width: 768px) {
  .modal {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;

    > section {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
