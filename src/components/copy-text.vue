<template>
  <div class="copy-text-container">
    <p v-if="!!props.label">{{ props.label }}</p>
    <div class="flex">
      <div class="copy-text">
        <input type="text" :value="text" readonly />
        <div class="buttons">
          <button class="icon" @click="copyText">
            <i class="fas" :class="justClicked ? 'fa-check' : 'fa-copy'"></i>
          </button>
          <button v-if="props.link" class="icon" @click="navigateToLink">
            <i class="fas fa-external-link-alt"></i>
          </button>
        </div>
      </div>
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
  },
  link: {
    type: Boolean,
    required: false,
    default: false
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

function navigateToLink() {
  window.open(props.text, '_blank');
}
</script>

<style scoped lang="scss">
.copy-text-container {
  > p {
    margin-bottom: 0.2rem;
    font-size: 1.2rem;
    opacity: 0.6;
  }
  .copy-text {
    flex: 1;
    display: flex;
    position: relative;
    align-items: center;
    overflow: hidden;

    > input {
      width: 100%;
    }
    > .buttons {
      padding-left: 0.8rem;
      display: flex;
    }
  }
}
</style>
