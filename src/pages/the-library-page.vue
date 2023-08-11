<template>
  <div class="library-container">
    <header>
      <div class="spread">
        <h1>PF2E Item Browser</h1>
        <button @click="showFilters = !showFilters" class="icon filters-toggle">
          <i class="fas fa-filter"></i>
        </button>
      </div>
      <div v-if="showFilters" class="filters">
        <!-- Rarity -->
        <div class="filter-group">
          <header @click="showRarityFilter = !showRarityFilter">
            <p>
              <i
                class="fas"
                :class="{
                  'fa-caret-down': showRarityFilter,
                  'fa-caret-right': !showRarityFilter
                }"
              ></i>
              <span>
                Rarity ({{ rarityFilter.length }}/{{ rarities.length }})
              </span>
            </p>
            <button
              class="icon light"
              @click.stop="ModalController.open(RarityModal)"
            >
              <i class="fas fa-question-circle"></i>
            </button>
          </header>
          <ul class="filter filter--rarity" v-if="showRarityFilter">
            <li class="checkbox-group" v-for="rarity in rarities" :key="rarity">
              <input
                :id="rarity"
                type="checkbox"
                :value="rarity"
                v-model="rarityFilter"
              />
              <label :for="rarity">{{ rarity }}</label>
            </li>
          </ul>
        </div>

        <!-- Sources -->
        <div class="filter-group">
          <header @click="showSourcesFilter = !showSourcesFilter">
            <p>
              <i
                class="fas"
                :class="{
                  'fa-caret-down': showSourcesFilter,
                  'fa-caret-right': !showSourcesFilter
                }"
              ></i>
              <span>
                Sources ({{ sourceFilter.length }}/{{ sources.length }})
              </span>
            </p>
            <button
              class="icon light"
              @click.stop="ModalController.open(SourcesModal)"
            >
              <i class="fas fa-question-circle"></i>
            </button>
          </header>
          <ul class="filter filter--source" v-if="showSourcesFilter">
            <li
              class="checkbox-group"
              v-for="source in sources"
              :key="source.name"
            >
              <input
                :id="source.name"
                type="checkbox"
                :value="source.name"
                v-model="sourceFilter"
              />
              <label :for="source.name">
                {{ source.name }} ({{ source.count }})
              </label>
            </li>
          </ul>
        </div>

        <!-- Price -->
        <div class="filter-group">
          <header @click="showPriceFilter = !showPriceFilter">
            <p>
              <i
                class="fas"
                :class="{
                  'fa-caret-down': showPriceFilter,
                  'fa-caret-right': !showPriceFilter
                }"
              ></i>
              <span>Price ({{ priceFilter.length }}/{{ prices.length }})</span>
            </p>
            <button
              class="icon light"
              @click.stop="ModalController.open(PriceModal)"
            >
              <i class="fas fa-question-circle"></i>
            </button>
          </header>

          <ul class="filter filter--price" v-if="showPriceFilter">
            <li class="checkbox-group" v-for="price in prices" :key="price">
              <input
                :id="price"
                type="checkbox"
                :value="price"
                v-model="priceFilter"
              />
              <label :for="price">
                <span v-if="price === '0'">N/A</span>
                <span v-if="price === '0.01-0.09'">
                  <img class="coin" src="@/assets/img/copper.png" />1 -
                  <img class="coin" src="@/assets/img/copper.png" />9
                </span>
                <span v-if="price === '0.1-0.99'">
                  <img class="coin" src="@/assets/img/silver.png" />1 -
                  <img class="coin" src="@/assets/img/silver.png" />9
                </span>
                <span v-if="price === '1-99'">
                  <img class="coin" src="@/assets/img/gold.png" />1 -
                  <img class="coin" src="@/assets/img/gold.png" />99
                </span>
                <span v-if="price === '100+'">
                  <img class="coin" src="@/assets/img/gold.png" />
                  100+
                </span>
              </label>
            </li>
          </ul>
        </div>

        <!-- Traits -->
        <div class="filter-group">
          <header @click="showTraitsFilter = !showTraitsFilter">
            <p>
              <i
                class="fas"
                :class="{
                  'fa-caret-down': showTraitsFilter,
                  'fa-caret-right': !showTraitsFilter
                }"
              ></i>
              <span>
                Traits ({{ traitsFilter.length }}/{{ traits.length }})
              </span>
            </p>
            <button
              class="icon light"
              @click.stop="ModalController.open(TraitsModal)"
            >
              <i class="fas fa-question-circle"></i>
            </button>
          </header>
          <ul class="filter filter--traits" v-if="showTraitsFilter">
            <li
              class="checkbox-group"
              v-for="trait in traits"
              :key="trait.name"
            >
              <input
                :id="trait.name"
                type="checkbox"
                :value="trait.name"
                v-model="traitsFilter"
              />
              <label :for="trait.name"
                >{{ trait.name }} ({{ trait.count }})</label
              >
            </li>
          </ul>
        </div>

        <!-- Category -->
        <div class="filter-group">
          <header @click="showCategoryFilter = !showCategoryFilter">
            <p>
              <i
                class="fas"
                :class="{
                  'fa-caret-down': showCategoryFilter,
                  'fa-caret-right': !showCategoryFilter
                }"
              ></i>
              <span>
                Category ({{ categoryFilter.length }}/{{ categories.length }})
              </span>
            </p>
            <button
              class="icon light"
              @click.stop="ModalController.open(CategoryModal)"
            >
              <i class="fas fa-question-circle"></i>
            </button>
          </header>
          <ul class="filter filter--category" v-if="showCategoryFilter">
            <li
              class="checkbox-group"
              v-for="category in categories"
              :key="category"
            >
              <input
                :id="category"
                type="checkbox"
                :value="category"
                v-model="categoryFilter"
              />
              <label :for="category">{{ category }}</label>
            </li>
          </ul>
        </div>
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
import equipmentJson from '@/assets/equipment.json';
import ItemCard from '@/components/item-card.vue';
import { ModalController } from '@/controllers/modal-controller';
import { Item } from '@/types';
import { computed, ref } from 'vue';
import PriceModal from '../components/modals/price-modal.vue';
import RarityModal from '../components/modals/rarity-modal.vue';
import SourcesModal from '../components/modals/sources-modal.vue';
import TraitsModal from '../components/modals/traits-modal.vue';
import CategoryModal from '../components/modals/category-modal.vue';

const items = equipmentJson as Item[];

const showFilters = ref<boolean>(false);
const showRarityFilter = ref<boolean>(false);
const showSourcesFilter = ref<boolean>(false);
const showPriceFilter = ref<boolean>(false);
const showTraitsFilter = ref<boolean>(false);
const showCategoryFilter = ref<boolean>(false);

const rarities = Array.from(new Set(items.map((item) => item.rarity)));
const prices = ['0', '0.01-0.09', '0.1-0.99', '1-99', '100+'];
const sourceCounts: { [key: string]: number } = {};
items.forEach((item: Item) => {
  item.source.forEach((sourceItem) => {
    const sourceName = sourceItem.text;
    sourceCounts[sourceName] = (sourceCounts[sourceName] || 0) + 1;
  });
});
const sources = Object.entries(sourceCounts)
  .map(([name, count]) => ({
    name,
    count
  }))
  .sort((a, b) => {
    // if it contains '#', move it down
    if (a.name.includes('#')) return 1;
    if (b.name.includes('#')) return -1;
    // Sort by count
    if (a.count < b.count) return 1;
    if (a.count > b.count) return -1;
    // Sort by name
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

const traitsCounts: { [key: string]: number } = {};
items.forEach((item: Item) => {
  item.trait.forEach((traitItem) => {
    const traitName = traitItem.text;
    traitsCounts[traitName] = (traitsCounts[traitName] || 0) + 1;
  });
});
const traits = Object.entries(traitsCounts)
  .map(([name, count]) => ({
    name,
    count
  }))
  .sort((a, b) => {
    // Sort by count
    if (a.count < b.count) return 1;
    if (a.count > b.count) return -1;
    // Sort by name
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

const categories = Array.from(new Set(items.map((item) => item.itemCategory)));

const initialRarityFilter = ['Common', 'Uncommon'];
const initialPriceFilter = [...prices];
const initialSourceFilter = [
  ...sources.map((source) => source.name).filter((name) => !name.includes('#'))
];
const initialTraitsFilter = [...traits.map((trait) => trait.name)];
const initialCategoryFilter = [...categories];

const rarityFilter = ref<string[]>(initialRarityFilter);
const priceFilter = ref<string[]>(initialPriceFilter);
const sourceFilter = ref<string[]>(initialSourceFilter);
const traitsFilter = ref<string[]>(initialTraitsFilter);
const categoryFilter = ref<string[]>(initialCategoryFilter);

const filteredItems = computed(() => {
  // Sort by name
  let sortedItems = items.sort((a, b) => {
    if (a.name.text < b.name.text) return -1;
    if (a.name.text > b.name.text) return 1;
    return 0;
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
    return priceFilter.value.includes('100+');
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

  return sortedItems;
});
</script>

<style scoped lang="scss">
.library-container {
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  overflow: hidden;

  > header {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 2rem;
    background-color: #eee;
    box-shadow: 0 0 1.2rem 0rem rgba(0, 0, 0, 0.5);
    border-bottom: 1px solid #ddd;
    z-index: 1;

    > .filters {
      display: flex;
      flex-wrap: wrap;
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
