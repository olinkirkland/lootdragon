<template>
  <div class="library-container">
    <p>{{ items.length }} items</p>
    <ul>
      <li v-for="item in items" :key="item.id">
        <a
          :href="'https://2e.aonprd.com' + item.name.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <price-display :value="item.price" />
          <span>{{ item.slug }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import equipmentJson from '@/assets/equipment.json';
import { Item } from '@/types';
import PriceDisplay from '@/components/price.vue';

// items are in @/assets/equipment.json
const items = ref<Item[]>([]);
items.value = equipmentJson;
</script>

<style scoped lang="scss">
.library-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  padding: 2rem;

  > ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
}
</style>
