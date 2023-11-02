<template>
  <div class="library-container">
    <header class="page-header" :disabled="items.length === 0">
      <div class="search-container">
        <!-- Search -->
        <div class="search-box">
          <input type="text" v-model="search" placeholder="Search..." />
          <i class="fas fa-search"></i>
          <button @click="search = ''" v-if="search.length > 0" class="icon">
            <i class="fas fa-times-circle"></i>
          </button>
        </div>

        <!-- Filter by -->
        <button
          class="icon"
          :class="{ active: showFilters }"
          @click="showFilters = !showFilters"
        >
          <i class="fas fa-filter"></i>
        </button>

        <!-- Saved Searches -->
        <button class="icon" @click="ModalController.open(SavedSearchesModal)">
          <i class="fas fa-book"></i>
        </button>

        <!-- Random -->
        <button class="icon" @click="openRandomItem">
          <i class="fas fa-dice-five"></i>
        </button>
      </div>

      <div v-if="showFilters" class="filters">
        <p>
          <span>Filter</span>
          <button
            v-if="showFilters"
            class="icon icon--mini muted"
            @click="showFilters = false"
          >
            <i class="fas fa-times"></i>
          </button>
        </p>

        <!-- Favorites -->
        <filter-block
          v-if="!!user"
          name="Favorites"
          :items="items"
          :filters="favorites"
          v-model="favoritesFilter"
          show-counts
        />

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

      <div class="item-count-container">
        <p class="item-count muted">
          Showing {{ filteredItems.length }}/{{ items.length }} items
        </p>
      </div>
    </header>

    <item-header-card v-model="sortBy" />
    <div class="item-list-container">
      <ul v-if="items.length > 0 && !isBusy" class="item-list">
        <item-card v-for="item in filteredItems" :key="item.id" :item="item" />
      </ul>
      <p class="item-list-text" v-else>
        <i class="fas fa-spinner fa-spin"></i>
      </p>
      <p
        class="item-list-text"
        v-if="items.length > 0 && filteredItems.length === 0"
      >
        <i class="fas fa-exclamation-circle"></i>
        <span>No items found</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import SavedSearchesModal from '@/components/modals/saved-searches-modal.vue';
import ItemCard from '@/components/item-card.vue';
import ItemHeaderCard from '@/components/item-header-card.vue';
import ItemModal from '@/components/modals/item-modal.vue';
import { ModalController } from '@/controllers/modal-controller';
import {
  getFavoritesFilters,
  getFiltersByKey,
  getPriceFilters,
  getSourcesFilters,
  getTraitsFilters
} from '@/filter-utils';
import { useItemsStore } from '@/stores/itemsStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { useUserStore } from '@/stores/userStore';
import { Item } from '@/types';
import { evaluateBulk } from '@/utils';
import { computed, onMounted, ref, watch } from 'vue';
import FilterBlock from '../components/filter-block.vue';
import CategoryModal from '../components/modals/category-modal.vue';
import LevelsModal from '../components/modals/levels-modal.vue';
import PriceModal from '../components/modals/price-modal.vue';
import RarityModal from '../components/modals/rarity-modal.vue';
import SourcesModal from '../components/modals/sources-modal.vue';
import TraitsModal from '../components/modals/traits-modal.vue';

const isBusy = ref<boolean>(false);

const items = ref<Item[]>([]);
onMounted(() => {
  setTimeout(() => {
    items.value = useItemsStore().items;
    ModalController.close();

    // ?i=SOME_ID
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('i');
    if (itemId) {
      const item = items.value.find((item) => item.id === itemId);
      if (item) {
        ModalController.open(ItemModal, { item });
      }
    }
  }, 200);
});

// Get the initial filters from local storage
const localFilters =
  (localStorage.getItem('filters') &&
    JSON.parse(localStorage.getItem('filters')!)) ||
  '{}';

const showFilters = ref<boolean>(false);

const user = computed(() => {
  return useUserStore().user;
});

const filterSortings = computed(() => {
  return useSettingsStore().filterSortings;
});

const sortBy = ref<string>('name-ascending');
const sortByType = computed(() => sortBy.value.split('-')[0]);
const sortByOrder = computed(() => sortBy.value.split('-')[1] === 'ascending');

// Search
const search = ref<string>('');

// Favorites
const favorites = computed(() =>
  getFavoritesFilters(items.value, user.value?.favorites || [])
);
const initialFavoritesFilter = ref(['Favorited', 'Not Favorited']);

// Rarity
const rarities = computed(() =>
  getFiltersByKey(items.value, 'rarity', filterSortings.value.rarities)
);
const initialRarityFilter = ref(['Common', 'Uncommon']);

// Sources
const sources = computed(() =>
  getSourcesFilters(items.value, filterSortings.value.sources)
);
const initialSourceFilter = computed(() =>
  sources.value
    .filter((source) => !source.name.includes('#'))
    .map((source) => source.name)
);

// Traits
const traits = computed(() =>
  getTraitsFilters(items.value, filterSortings.value.traits)
);
const initialTraitsFilter = computed(() =>
  traits.value.map((trait) => trait.name)
);

// Categories
const categories = computed(() =>
  getFiltersByKey(items.value, 'itemCategory', filterSortings.value.categories)
);
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
const rarityFilter = ref<string[]>([]);
const sourceFilter = ref<string[]>([]);
const traitsFilter = ref<string[]>([]);
const categoryFilter = ref<string[]>([]);
const priceFilter = ref<string[]>([]);
const levelFilter = ref<string[]>([]);
const favoritesFilter = ref<string[]>([]);

const filteredItems = computed(() => {
  isBusy.value = true;
  let sortedItems = [...items.value];

  // Filter by search
  if (search.value.length > 0) {
    const searchText = search.value.toLowerCase().trim();
    sortedItems = sortedItems.filter((item) =>
      item.name.text.toLowerCase().includes(searchText)
    );
  }

  // Filter by favorites
  sortedItems = sortedItems.filter((item) => {
    const isFavorite = useUserStore().isFavorite(item.id);
    return (
      (favoritesFilter.value.includes('Favorited') && isFavorite) ||
      (favoritesFilter.value.includes('Not Favorited') && !isFavorite)
    );
  });

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
    const itemTraits = item.traits.map((traitItem) => traitItem.text);
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

  const newSortedItems = sortedItems.sort((a, b) => {
    switch (sortByType.value) {
      case 'price':
        const aPrice = a.price === null ? Number.POSITIVE_INFINITY : a.price;
        const bPrice = b.price === null ? Number.POSITIVE_INFINITY : b.price;
        return sortByOrder.value ? aPrice - bPrice : bPrice - aPrice;
      case 'rarity':
        const rarities = ['Common', 'Uncommon', 'Rare', 'Unique'];
        const aRarity = rarities.indexOf(a.rarity);
        const bRarity = rarities.indexOf(b.rarity);
        return sortByOrder.value ? aRarity - bRarity : bRarity - aRarity;
      case 'level':
        return sortByOrder.value ? a.level - b.level : b.level - a.level;
      case 'name':
        const aName = a.name.text;
        const bName = b.name.text;
        return sortByOrder.value
          ? aName.localeCompare(bName)
          : bName.localeCompare(aName);
      case 'bulk':
        const aBulk = evaluateBulk(a.bulk);
        const bBulk = evaluateBulk(b.bulk);
        return sortByOrder.value ? aBulk - bBulk : bBulk - aBulk;
      case 'category':
        return sortByOrder.value
          ? a.itemCategory.localeCompare(b.itemCategory)
          : b.itemCategory.localeCompare(a.itemCategory);
      case 'traits':
        return sortByOrder.value
          ? a.traits.length - b.traits.length
          : b.traits.length - a.traits.length;
    }

    return 0;
  });

  setTimeout(() => {
    isBusy.value = false;
  }, 100);

  return newSortedItems;
});

// Set initial filters
rarityFilter.value = localFilters.rarity || initialRarityFilter.value;
sourceFilter.value = localFilters.source || initialSourceFilter.value;
traitsFilter.value = localFilters.traits || initialTraitsFilter.value;
categoryFilter.value = localFilters.category || initialCategoryFilter.value;
priceFilter.value = localFilters.price || initialPriceFilter.value;
levelFilter.value = localFilters.level || initialLevelFilter.value;
favoritesFilter.value = localFilters.favorites || initialFavoritesFilter.value;
search.value = localFilters.search || '';
sortBy.value = localFilters.sortBy || 'name-ascending';

// Save filters to local storage when they change
watch(
  [
    rarityFilter,
    sourceFilter,
    traitsFilter,
    categoryFilter,
    priceFilter,
    levelFilter,
    favoritesFilter,
    search,
    sortBy
  ],
  () => {
    localStorage.setItem(
      'filters',
      JSON.stringify({
        rarity: rarityFilter.value,
        source: sourceFilter.value,
        traits: traitsFilter.value,
        category: categoryFilter.value,
        price: priceFilter.value,
        level: levelFilter.value,
        favorites: favoritesFilter.value,
        search: search.value,
        sortBy: sortBy.value
      })
    );
    console.log('Saved filters to local storage');
  }
);

function openRandomItem() {
  const randomItem =
    filteredItems.value[Math.floor(Math.random() * filteredItems.value.length)];
  ModalController.open(ItemModal, { item: randomItem });
}
</script>

<style scoped lang="scss">
.library-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  max-height: -webkit-fill-available;
  overflow: hidden;
  background-color: var(--surface-color);

  > header {
    > .search-container {
      display: flex;
      gap: 0.8rem;
      padding: 0.8rem;
    }

    .item-count-container {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.8rem;
      padding-top: 0;
      > button {
        position: absolute;
        right: 0;
        z-index: 1;
      }

      > p.item-count {
        width: 100%;
      }
    }

    > .filters,
    .sortings {
      margin: 0 0.8rem;
      margin-bottom: 0.8rem;
      flex: 1;
      overflow: auto;

      border-radius: 5px;
      background-color: var(--surface-color);
      border: 1px solid var(--surface-color-3);

      > p {
        padding: 0.8rem;
        text-transform: uppercase;
        color: var(--text-color);
        background-color: var(--surface-color-2);
        width: 100%;
        text-align: center;
        border-bottom: 1px solid var(--surface-color-2);
        position: relative;
        > button {
          position: absolute;
          right: 0.6rem;
          top: 50%;
          transform: translate(0, -50%);
          z-index: 1;
        }
      }
    }
  }

  > .item-list-container {
    flex: 1;
    // padding: 1.6rem;
    overflow-y: auto;
    > ul.item-list {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
}

.item-list-text {
  width: 100%;
  height: 100%;
  gap: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .library-container {
    padding: 0;
    > header {
      > .search-container > .search-box {
        max-width: initial;
      }

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

      .item-count-container > p.item-count {
        text-align: center;
      }
    }
  }
}
</style>
