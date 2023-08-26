<template>
  <div class="shops-container">
    <header class="page-header">
      <div class="brand">
        <div @click="router.push('/')" class="logo">
          <img src="/assets/images/logo.png" alt="logo" />
          <h1>Loot Dragon</h1>
        </div>
      </div>
      <copy-text
        :text="JSON.stringify(categories)"
        :label="`Categories (${categories.length})`"
      />
    </header>
  </div>
</template>

<script lang="ts" setup>
import CopyText from '@/components/copy-text.vue';
import { useItemsStore } from '@/stores/itemsStore';
import { Item } from '@/types';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const items = ref<Item[]>(useItemsStore().items);

// Unique categories
const categories = computed(() =>
  items.value
    .map((item) => item.itemSubcategory)
    .filter((value, index, self) => self.indexOf(value) === index)
);
</script>

<style scoped lang="scss">
.shops-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  max-height: -webkit-fill-available;
  overflow: hidden;
}
</style>
