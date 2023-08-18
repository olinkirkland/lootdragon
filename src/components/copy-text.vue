<template>
  <div class="copy-text-container">
    <p v-if="!!props.label">{{ props.label }}</p>
    <div class="copy-text">
      <input type="text" :value="text" readonly />
      <button class="text" @click="copyText">
        <i class="fas" :class="justClicked ? 'fa-check' : 'fa-copy'"></i>
        <span v-if="justClicked">Copied!</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: false
  }
});

const justClicked = ref(false);

function copyText() {
  navigator.clipboard.writeText(props.text);
  justClicked.value = true;
  setTimeout(() => {
    justClicked.value = false;
  }, 4000);
}
</script>

<style scoped lang="scss">
.copy-text-container {
  > p {
    margin-bottom: 0.2rem;
    font-size: 1.2rem;
    opacity: 0.6;
  }
  > .copy-text {
    display: flex;
    position: relative;
    align-items: center;
    > input {
      width: 100%;
      padding-right: 2.8rem;
      padding-left: 0.8rem;
    }
    > button {
      position: absolute;
      background-color: var(--surface-color-2);
      border: 1px solid var(--surface-color-3);
      border-left: none;
      padding: 0 0.8rem;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      right: 0;
      color: var(--text-color);

      > span {
        text-decoration: none;
      }
    }
  }
}
</style>
