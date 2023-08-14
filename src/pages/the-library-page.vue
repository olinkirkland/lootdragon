<template>
  <div class="library-container">
    <header>
      <div class="spread">
        <div class="logo-container">
          <!-- <img src="/assets/images/logo.png" alt="logo" /> -->
          <h1>PF2E Item Browser</h1>
        </div>
        <!-- <button class="icon" @click="ModalController.open(SettingsModal)">
          <i class="fas fa-cog"></i>
        </button> -->
      </div>
      <div class="search-container">
        <input type="text" v-model="search" placeholder="Search..." />
        <button @click="showFilters = !showFilters" class="icon filters-toggle">
          <i class="fas fa-filter"></i>
        </button>
      </div>
      <div v-if="showFilters" class="filters">
        <!-- Rarity -->
        <filter-block
          name="Rarity"
          :items="items"
          :info-modal="RarityModal"
          :filters="rarities"
          v-model="rarityFilter"
          show-counts
        />

        <!-- Sources -->
        <filter-block
          name="Sources"
          :items="items"
          :info-modal="SourcesModal"
          :filters="sources"
          v-model="sourceFilter"
        />

        <!-- Price -->
        <filter-block
          name="Price"
          :items="items"
          :info-modal="PriceModal"
          :filters="prices"
          v-model="priceFilter"
        />

        <!-- Traits -->
        <filter-block
          name="Traits"
          :items="items"
          :info-modal="TraitsModal"
          :filters="traits"
          v-model="traitsFilter"
        />

        <!-- Category -->
        <filter-block
          name="Category"
          :items="items"
          :info-modal="CategoryModal"
          :filters="categories"
          v-model="categoryFilter"
        />

        <!-- Level -->
        <filter-block
          name="Level"
          :items="items"
          :info-modal="LevelsModal"
          :filters="levels"
          v-model="levelFilter"
        />
      </div>

      <p class="item-count">
        Showing {{ filteredItems.length }} / {{ items.length }} items
      </p>
    </header>

    <div class="item-list-container">
      <ul class="item-list">
        <item-card v-for="item in filteredItems" :key="item.id" :item="item" />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import ItemCard from '@/components/item-card.vue';
import LoadingModal from '@/components/modals/loading-modal.vue';
import { ModalController } from '@/controllers/modal-controller';
import {
  getFiltersByKey,
  getPriceFilters,
  getSourcesFilters,
  getTraitsFilters
} from '@/filter-utils';
import { Item } from '@/types';
import { computed, ref } from 'vue';
import FilterBlock from '../components/filter-block.vue';
import CategoryModal from '../components/modals/category-modal.vue';
import PriceModal from '../components/modals/price-modal.vue';
import RarityModal from '../components/modals/rarity-modal.vue';
import SourcesModal from '../components/modals/sources-modal.vue';
import TraitsModal from '../components/modals/traits-modal.vue';
import LevelsModal from '../components/modals/levels-modal.vue';

const items = ref<Item[]>([]);

// Load the items
ModalController.open(LoadingModal);
fetch('/assets/items.json')
  .then((response) => response.json())
  .then((data) => {
    items.value = data;
    ModalController.close();

    // Set initial filters
    rarityFilter.value = initialRarityFilter.value;
    sourceFilter.value = initialSourceFilter.value;
    traitsFilter.value = initialTraitsFilter.value;
    categoryFilter.value = initialCategoryFilter.value;
    priceFilter.value = initialPriceFilter.value;
    levelFilter.value = initialLevelFilter.value;
  });

const showFilters = ref<boolean>(false);

// Search
const search = ref<string>('');

// Rarity
const rarities = computed(() => getFiltersByKey(items.value, 'rarity'));
const initialRarityFilter = ref(['Common', 'Uncommon']);

// Sources
const sources = computed(() => getSourcesFilters(items.value));
const initialSourceFilter = computed(() =>
  sources.value
    .filter((source) => !source.name.includes('#'))
    .map((source) => source.name)
);

// Traits
const traits = computed(() => getTraitsFilters(items.value));
const initialTraitsFilter = computed(() =>
  traits.value.map((trait) => trait.name)
);

// Categories
const categories = computed(() => getFiltersByKey(items.value, 'itemCategory'));
const initialCategoryFilter = computed(() =>
  categories.value.map((category) => category.name)
);

// Price
const prices = computed(() => getPriceFilters(items.value));
const initialPriceFilter = computed(() =>
  prices.value.map((price) => price.name)
);

// Level
const levels = computed(() =>
  getFiltersByKey(items.value, 'level').sort(
    (a, b) => parseInt(a.name) - parseInt(b.name)
  )
);
const initialLevelFilter = computed(() =>
  levels.value.map((level: { name: any }) => level.name.toString())
);

// Filter refs
const rarityFilter = ref<string[]>(initialRarityFilter.value);
const sourceFilter = ref<string[]>(initialSourceFilter.value);
const traitsFilter = ref<string[]>(initialTraitsFilter.value);
const categoryFilter = ref<string[]>(initialCategoryFilter.value);
const priceFilter = ref<string[]>(initialPriceFilter.value);
const levelFilter = ref<string[]>(initialLevelFilter.value);

const filteredItems = computed(() => {
  console.log('filtering items');
  let sortedItems = [...items.value];

  // Filter by search
  if (search.value.length > 0) {
    const searchText = search.value.toLowerCase().trim();
    console.log('searching: ', searchText);
    sortedItems = sortedItems.filter((item) =>
      item.name.text.toLowerCase().includes(searchText)
    );
  }

  // Filter by rarity
  sortedItems = sortedItems.filter((item) =>
    rarityFilter.value.includes(item.rarity)
  );

  // Filter by value
  sortedItems = sortedItems.filter((item) => {
    if (!item.price) return priceFilter.value.includes('0');
    if (item.price >= 0.01 && item.price <= 0.09)
      return priceFilter.value.includes('0.01-0.09');
    if (item.price >= 0.1 && item.price <= 0.99)
      return priceFilter.value.includes('0.1-0.99');
    if (item.price >= 1 && item.price <= 99)
      return priceFilter.value.includes('1-99');
    if (item.price >= 100 && item.price <= 499)
      return priceFilter.value.includes('100-499');
    if (item.price >= 500 && item.price <= 999)
      return priceFilter.value.includes('500-999');
    else return priceFilter.value.includes('1000+');
  });

  // Filter by source
  sortedItems = sortedItems.filter((item) => {
    const itemSources = item.source.map((sourceItem) => sourceItem.text);
    return itemSources.some((source) => sourceFilter.value.includes(source));
  });

  // Filter by traits
  sortedItems = sortedItems.filter((item) => {
    const itemTraits = item.trait.map((traitItem) => traitItem.text);
    return itemTraits.some((trait) => traitsFilter.value.includes(trait));
  });

  // Filter by category
  sortedItems = sortedItems.filter((item) =>
    categoryFilter.value.includes(item.itemCategory)
  );

  // Filter by level
  sortedItems = sortedItems.filter((item) =>
    levelFilter.value.includes(item.level.toString())
  );

  return sortedItems.sort((a, b) => {
    if (a.name.text < b.name.text) return -1;
    if (a.name.text > b.name.text) return 1;
    return 0;
  });
});
</script>

<style scoped lang="scss">
.library-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  > header {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 2rem;
    background-color: #eee;
    box-shadow: 0 0 1.2rem 0rem rgba(0, 0, 0, 0.5);
    border-bottom: 1px solid #ddd;
    max-height: 100vh;

    > .search-container {
      display: flex;
      > input {
        flex: 1;
      }
    }

    .logo-container {
      display: flex;
      align-items: center;
    }

    > .filters {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      overflow: auto;

      gap: 0.4rem;
      border: 1px solid #222;
      background-color: #dddddd;
      padding: 0.4rem;
      box-shadow: 0 0 0.4rem 0.2rem rgba(0, 0, 0, 0.1);

      > .filter-group {
        border: 1px solid black;
        width: 100%;

        > header {
          padding: 0.8rem;
          background-color: #575757;
          color: white;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 0.4rem;
          cursor: pointer;

          :deep(button.icon) {
            padding: 0 !important;
          }

          > p {
            display: flex;
            align-items: center;
            gap: 0.6rem;
          }
        }

        > p {
          color: grey;
          margin-bottom: 0.4rem;
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
        > ul.filter {
          display: flex;
          padding: 0.8rem;
          gap: 1.2rem;
          max-height: 16rem;
          overflow-y: auto;
          flex-wrap: wrap;

          label {
            > span {
              display: flex;
              align-items: center;
              gap: 0.2rem;
            }
          }
        }
      }
    }
  }

  > .item-list-container {
    flex: 1;
    padding: 1.6rem;
    overflow-y: auto;
    > ul.item-list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
    }
  }
}

@media (max-width: 768px) {
  .library-container {
    padding: 0;
    > header {
      padding: 0.8rem;
      .filters {
        > .filter-group {
          width: 100%;
          ul.filter {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
            grid-gap: 0.4rem;

            &--source {
              grid-template-columns: 1fr;
            }
          }
        }
      }

      > p.item-count {
        font-size: 1.2rem;
      }
    }

    > .item-list-container {
      padding: 0;
      > ul.item-list {
        width: 100%;
        display: block;
      }
    }
  }
}
</style>
