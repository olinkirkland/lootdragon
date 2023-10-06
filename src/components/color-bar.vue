<template>
  <div class="color-bar">
    <div
      v-for="(color, index) in props.colors"
      :key="index"
      class="color-rectangle"
      :style="{ backgroundColor: color }"
    ></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  colors: string[];
}>();
</script>

<style>
.color-bar {
  display: flex;
  align-items: center;
}

.color-rectangle {
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  border: 2px solid var(--surface-color);
  &:not(:last-child) {
    margin-right: -0.6rem;
  }
}
</style>
