<template>
  <div class="modal">
    <section>
      <img src="/assets/images/logo.png" alt="logo" />
      <p class="loading-text">
        Loading
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
  background-color: #222;
  border-color: #fab44d;

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
      align-items: center;
      gap: 0.8rem;
      text-transform: uppercase;
      color: #fab44d;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #dddddd;
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
