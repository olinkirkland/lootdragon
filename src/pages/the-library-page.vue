<template>
  <div class="library-container">
    <header>
      <h2>Pathfinder 2E Item Browser</h2>

      <div v-if="showFilters" class="filters">
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
              <label :for="rarity">{{ rarity }} </label>
            </li>
          </ul>
        </div>

        <div class="filter-group">
          <p>
            <span>Value</span>

            <span class="coin-legend">
              <span>
                <img class="coin" src="@/assets/img/gold.png" />
                <span>1 =</span>
                <img class="coin" src="@/assets/img/silver.png" />
                <span>10</span>
              </span>
              <span>|</span>
              <span>
                <img class="coin" src="@/assets/img/silver.png" />
                <span>1 =</span>
                <img class="coin" src="@/assets/img/copper.png" />
                <span>10</span>
              </span>
            </span>
          </p>

          <ul class="filter filter--value">
            <li v-for="value in values" :key="value">
              <input
                :id="value"
                type="checkbox"
                :value="value"
                v-model="valueFilter"
              />
              <label :for="value">
                <span v-if="value === '0'">N/A</span>
                <span v-if="value === '0-1'">
                  <img class="coin" src="@/assets/img/copper.png" />1 -
                  <img class="coin" src="@/assets/img/silver.png" />1
                </span>
                <span v-if="value === '1-2'">
                  <img class="coin" src="@/assets/img/silver.png" />1 -
                  <img class="coin" src="@/assets/img/gold.png" />1
                </span>
                <span v-if="value === '10+'">
                  <img class="coin" src="@/assets/img/gold.png" />
                  10+
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>

      <button @click="showFilters = !showFilters" class="filters-toggle">
        {{ showFilters ? 'Hide' : 'Show' }} Filters
      </button>

      <p class="item-count">
        Showing {{ filteredItems.length }} / {{ items.length }} items
      </p>
    </header>

    <ul class="item-list">
      <item-card v-for="item in filteredItems" :key="item.id" :item="item" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import equipmentJson from '@/assets/equipment.json';
import ItemCard from '@/components/item-card.vue';
import { Item } from '@/types';
import { computed, ref } from 'vue';

const items = ref<Item[]>([]);
items.value = equipmentJson as Item[];

const showFilters = ref<boolean>(false);

const rarities = Array.from(new Set(items.value.map((item) => item.rarity)));
const values = ['0', '0-1', '1-2', '10+'];

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
    if (!item.price) return valueFilter.value.includes('0');
    if (item.price < 1) return valueFilter.value.includes('0-1');
    if (item.price < 10) return valueFilter.value.includes('1-2');
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
  padding: 2rem;
  overflow: hidden;

  > header {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: 0.8rem;

    > .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;

      > .filter-group {
        padding: 0.4rem;
        border: 1px solid black;

        > p {
          color: grey;
          margin-bottom: 0.4rem;
          width: 100%;
          display: flex;
          justify-content: space-between;
          .coin-legend {
            display: flex;
            align-items: center;
            gap: 1.2rem;
            font-size: 1.2rem;
            opacity: 0.6;

            > span {
              display: flex;
              align-items: center;
              gap: 0.2rem;
            }
          }
        }
        > ul.filter {
          display: flex;
          padding: 0.4rem;
          width: fit-content;
          gap: 1.2rem;

          label {
            > span {
              display: flex;
              align-items: center;
              gap: 0.2rem;
            }
          }

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
  }

  > ul.item-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    overflow-y: auto;
  }
}

@media (max-width: 768px) {
  .library-container {
    padding: 0;

    > header {
      padding: 1.2rem 1.2rem 0rem 1.2rem;
      .filters {
        > .filter-group {
          width: 100%;

          > p {
            // text-align: center;
          }
          > ul.filter {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, 1fr);

            > li {
            }
          }
        }
      }

      > p.item-count {
        font-size: 1.2rem;
      }
    }

    > ul.item-list {
      width: 100%;
      display: block;
    }
  }
}
</style>
