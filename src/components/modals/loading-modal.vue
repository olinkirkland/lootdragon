<template>
  <div class="modal">
    <section>
      <img src="/assets/images/logo.webp" alt="logo" />
      <p class="loading-text">
        <span>Loading</span>
        <i class="fas fa-spinner fa-spin"></i>
      </p>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.modal {
  width: fit-content;
  height: fit-content;
  min-width: 0;
  min-height: 0;
  padding: 2rem 4rem;
  background-color: var(--surface-color);
  border-color: var(--primary-color);

  section {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.2rem;

    > img {
      width: 24rem;
      height: 24rem;
    }

    p.loading-text {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      gap: 0.8rem;
      text-transform: uppercase;
      color: var(--primary-color);
    }

    &:not(:last-child) {
      border-bottom: 1px solid var(--primary-color);
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
