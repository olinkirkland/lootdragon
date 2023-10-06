<template>
  <button class="tile">
    <img :src="props.image" />
    <div class="tile__content">
      <h3>{{ props.label }}</h3>
      <div class="overlay-squares">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  image: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
});
</script>

<style scoped lang="scss">
button.tile {
  background-color: transparent;
  border: 1px solid var(--surface-color-3);
  width: 20rem;
  height: 32rem;
  overflow: hidden;
  padding: 0;
  margin: 0;
  border-radius: 0;
  position: relative;

  * {
    color: var(--surface-color);
  }

  > img {
    filter: brightness(1);
    height: 100%;
    transition: filter 0.2s ease-in-out;
  }

  .overlay-squares {
    width: 100%;
    height: 100%;
    position: absolute;

    > div {
      position: absolute;
      width: 1.4rem;
      height: 1.4rem;
      padding: 0.2rem;
      margin: 0.4rem;
      border: 1px solid var(--surface-color-3);

      &::after {
        content: '';
        display: block;
        background-color: var(--surface-color-3);
        width: 100%;
        height: 100%;
      }
    }

    > div:nth-child(1) {
      top: 0;
      left: 0;
    }

    > div:nth-child(2) {
      top: 0;
      right: 0;
    }

    > div:nth-child(3) {
      bottom: 0;
      left: 0;
    }

    > div:nth-child(4) {
      bottom: 0;
      right: 0;
    }
  }

  &:hover {
    > img {
      filter: brightness(0.8);
    }

    > .tile__content {
      > * {
        filter: drop-shadow(0 0 5px #000000);
      }
    }
  }

  > .tile__content {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    padding: 1rem;

    h3 {
      display: block;
      text-transform: uppercase;
      font-size: 1.8rem;
      white-space: normal;
      width: 100%;
      color: var(--light-color);
    }

    > * {
      transition: filter 0.4s ease-in-out;
    }

    > i {
      font-size: 2rem;
    }
  }
}

@media (max-width: 768px) {
  button.tile {
    height: 8rem;
    width: 100%;

    > img {
      width: 100%;
      height: initial;
      filter: brightness(1);
    }
  }
}
</style>
