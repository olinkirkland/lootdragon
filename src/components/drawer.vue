<template>
  <div class="drawer">
    <div class="drawer__knob" @click="isOpen = !isOpen">
      <p>{{ props.title }}</p>
      <button class="icon">
        <i class="fas" :class="`fa-chevron-${isOpen ? 'up' : 'down'}`"></i>
      </button>
    </div>
    <slot v-if="isOpen"></slot>
    <div class="drawer__bottom"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);

const props = defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<style scoped lang="scss">
.drawer > .drawer__knob {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding-left: 1.2rem;
  align-items: center;
  min-height: initial;
  background-color: var(--surface-color-2);
}

.drawer > .drawer__bottom {
  width: 100%;
  border-bottom: 2px dashed var(--surface-color-2);
}
</style>
