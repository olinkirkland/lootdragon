<template>
  <div class="library-container">
    <p>{{ filteredItems.length }} items</p>
    <ul class="rarities-filter">
      <li v-for="rarity in uniqueRarities" :key="rarity">
        <input
          :id="rarity"
          type="checkbox"
          :value="rarity"
          v-model="filteredRarities"
        />
        <label :for="rarity"
          >{{ rarity }} ({{
            items.filter((item) => item.rarity === rarity).length
          }})</label
        >
      </li>
    </ul>

    <ul>
      <li v-for="item in filteredItems" :key="item.id">
        <item-card :item="item" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import equipmentJson from '@/assets/equipment.json';
import ItemCard from '@/components/item-card.vue';
import { Item } from '@/types';
import { ref } from 'vue';
import { computed } from 'vue';

const items = ref<Item[]>([]);
items.value = equipmentJson as Item[];

const filteredRarities = ref<string[]>([
  'Common',
  'Uncommon',
  'Rare',
  'Unique'
]);

const filteredItems = computed(() => {
  return items.value.filter((item) =>
    filteredRarities.value.includes(item.rarity)
  );
});

const uniqueRarities = Array.from(
  new Set(items.value.map((item) => item.rarity))
);
</script>

<style scoped lang="scss">
.library-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  padding: 2rem;

  > ul.rarities-filter {
    gap: 1.2rem;
    > li {
      display: flex;
      align-items: center;
      gap: 0.4rem;

      > input,
      label {
        cursor: pointer;
      }

      > input {
        width: 1.6rem;
        height: 1.6rem;
      }
    }
  }

  > ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }
}
</style>
