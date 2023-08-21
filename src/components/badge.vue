<template>
  <div class="badge" v-if="isShown">
    <p>
      <slot></slot>
    </p>
    <button class="icon" @click="isShown = false">
      <i class="fas fa-times"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: true
  }
});

const isShown = ref(props.show);
function validate() {
  isShown.value = props.show;
}

defineExpose({
  validate
});
</script>

<style scoped lang="scss">
.badge {
  display: flex;
  background-color: rgba(244, 67, 54, 0.8);
  align-items: center;
  border-radius: 5px;

  > p {
    color: var(--surface-color);
    flex: 1;
    margin-left: 1.2rem;
  }
  button {
    color: var(--surface-color);
    align-self: flex-start;
  }
}
</style>
