<template>
  <div class="copy-text-container">
    <p v-if="!!props.label">{{ props.label }}</p>
    <div class="copy-text">
      <input type="text" :value="text" readonly />
      <button class="text" @click="copyText">
        <i class="fas" :class="justClicked ? 'fa-check' : 'fa-copy'"></i>
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
    > input {
      width: 100%;
      padding-right: 2.8rem;
      padding-left: 0.8rem;
    }
    > button {
      position: absolute;
      right: 0.8rem;
      color: #222;
    }
  }
}
</style>
