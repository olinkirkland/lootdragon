<template>
  <div class="treasures-container">
    <header class="page-header">
      <div class="treasures-content"></div>
    </header>
    <footer class="page-footer"></footer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Allura&display=swap');
.treasures-container {
  width: 100%;
  height: 100vh;
  max-height: -webkit-fill-available;
  background-color: #222;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;

  > h1 {
    font-size: 1.6rem;
    font-weight: lighter;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-color);
  }

  > h2 {
    color: var(--text-color);
  }

  .actions {
    display: flex;
    width: fit-content;
    padding: 2rem;
    gap: 0.8rem;
  }

  > p {
    margin: 0 4rem;
    max-width: 64rem;
    color: var(--text-color);
    opacity: 0.8;
    font-size: 1.4rem;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .actions {
    flex-direction: column;
  }
}
</style>
