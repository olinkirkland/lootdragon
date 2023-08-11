<template>
  <div class="library-container">
    <header>
      <h1>PF2E Item Browser</h1>

      <div v-if="showFilters" class="filters">
        <div class="filter-group">
          <header>
            <p>Rarity</p>
          </header>
          <ul class="filter filter--rarity">
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

        <div class="filter-group">
          <header>
            <p>Sources</p>
          </header>
          <ul class="filter filter--source">
            <li class="checkbox-group" v-for="source in sources" :key="source">
              <input
                :id="source"
                type="checkbox"
                :value="source"
                v-model="sourceFilter"
              />
              <label :for="source">{{ source }} </label>
            </li>
          </ul>
        </div>

        <div class="filter-group">
          <header>
            <p>Price</p>
            <button
              class="icon light"
              @click="ModalController.open(PriceModal)"
            >
              <i class="fas fa-question-circle"></i>
            </button>
          </header>

          <ul class="filter filter--price">
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
      </div>

      <button @click="showFilters = !showFilters" class="filters-toggle">
        <i class="fas fa-filter"></i>
        <span>{{ showFilters ? 'Hide' : 'Show' }} Filters</span>
      </button>

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

const items = ref<Item[]>([]);
items.value = equipmentJson as Item[];

const showFilters = ref<boolean>(false);

const rarities = Array.from(new Set(items.value.map((item) => item.rarity)));
const prices = ['0', '0.01-0.09', '0.1-0.99', '1-99', '100+'];
const sources = Array.from(
  new Set(
    items.value.reduce((accumulator: string[], item: Item) => {
      item.source.forEach((sourceItem) => {
        accumulator.push(sourceItem.text);
      });
      return accumulator;
    }, [])
  )
);
const rarityFilter = ref<string[]>(rarities);
const priceFilter = ref<string[]>(prices);
const sourceFilter = ref<string[]>(sources);

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

    > .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;

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
          width: fit-content;
          gap: 1.2rem;
          max-height: 12rem;
          overflow-y: auto;

          &--source {
            flex-wrap: wrap;
          }

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
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 0.4rem;
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
