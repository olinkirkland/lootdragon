<template>
  <div class="library-container">
    <h2>Pathfinder 2E Item Browser</h2>
    <p>
      Showing <em>{{ filteredItems.length }}/{{ items.length }}</em> items
    </p>

    <div class="filters">
      <div class="filter-group">
        <p>Rarity</p>
        <ul class="filter filter--rarity">
          <li v-for="rarity in rarities" :key="rarity">
            <input
              :id="rarity"
              type="checkbox"
              :value="rarity"
              v-model="rarityFilter"
            />
            <label :for="rarity"
              >{{ rarity }} ({{
                items.filter((item) => item.rarity === rarity).length
              }})</label
            >
          </li>
        </ul>
      </div>

      <div class="filter-group">
        <p>Value</p>
        <ul class="filter filter--value">
          <li v-for="value in values" :key="value">
            <input
              :id="value"
              type="checkbox"
              :value="value"
              v-model="valueFilter"
            />
            <label :for="value"
              >{{ value }} ({{
                items.filter((item) => {
                  if (!item.price) return value === 'Unknown';
                  if (item.price < 1) return value === '0.01-0.99';
                  if (item.price < 10) return value === '1-9.99';
                  return value === '10+';
                }).length
              }})</label
            >
          </li>
        </ul>
      </div>
    </div>

    <!-- <p>{{ rarityFilter }}</p> -->

    <ul class="item-list">
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

const rarities = Array.from(new Set(items.value.map((item) => item.rarity)));
const values = ['Unknown', '0.01-0.99', '1-9.99', '10+'];

const rarityFilter = ref<string[]>(rarities);
const valueFilter = ref<string[]>(values);

const filteredItems = computed(() => {
  let sortedItems = items.value.sort((a, b) => {
    if (a.name.text < b.name.text) {
      return -1;
    }
    if (a.name.text > b.name.text) {
      return 1;
    }
    return 0;
  });

  // Filter by rarity
  sortedItems = sortedItems.filter((item) =>
    rarityFilter.value.includes(item.rarity)
  );

  // Filter by value
  sortedItems = sortedItems.filter((item) => {
    if (!item.price) return valueFilter.value.includes('Unknown');
    if (item.price < 1) return valueFilter.value.includes('0.01-0.99');
    if (item.price < 10) return valueFilter.value.includes('1-9.99');
    return valueFilter.value.includes('10+');
  });

  return sortedItems;
});
</script>

<style scoped lang="scss">
.library-container {
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  gap: 0.8rem;
  padding: 2rem;
  overflow: hidden;

  > .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;

    > .filter-group {
      padding: 0.8rem;
      border: 1px solid black;

      > p {
        color: grey;
      }
      > ul.filter {
        display: flex;
        padding: 0.4rem;
        width: fit-content;
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
    }
  }

  > ul.item-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    .library-container  .filter-group {
      width: 100%;
      > ul.filter {
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        > li {
          border: 2px dashed red !important;
        }
      }
    }
  }
}
</style>
