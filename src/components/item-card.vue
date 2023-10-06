<template>
  <div
    class="item-card"
    :class="{
      'item-card--common': item.rarity === 'Common',
      'item-card--uncommon': item.rarity === 'Uncommon',
      'item-card--rare': item.rarity === 'Rare',
      'item-card--unique': item.rarity === 'Unique'
    }"
  >
    <button
      class="item-grid-button"
      @click="() => ModalController.open(ItemModal, { item })"
    >
      <price-display :value="item.price || 0" />
      <div class="rarity">
        <span>{{ item.rarity }}</span>
      </div>
      <span class="level hide-on-mobile">
        <span>Level</span>
        <span>{{ item.level }}</span>
      </span>
      <span class="one-line"
        ><span>{{ item.name.text }}</span></span
      >
      <span class="bulk hide-on-mobile">
        <span v-if="item.bulk === 'N/A'">N/A</span>
        <span v-if="+item.bulk === 0">
          <i class="muted fas fa-feather-alt"></i>
        </span>
        <span v-else>
          <i class="muted fas fa-balance-scale"></i>
          {{ item.bulk }}
        </span>
      </span>
      <span class="category one-line hide-on-mobile"
        ><span>
          {{ item.itemCategory }}
          {{ item.itemSubcategory ? ` (${item.itemSubcategory})` : '' }}
        </span></span
      >
      <span class="traits hide-on-mobile">
        <span v-for="t in item.trait.slice(0, 3)" :key="t.text" class="trait">
          {{ t.text }}
        </span>
        <span class="trait-overflow-count muted" v-if="item.trait.length > 3">
          +{{ item.trait.length - 3 }} more
        </span>
      </span>
      <i v-if="isFavorite" class="favorite fas fa-heart"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import PriceDisplay from '@/components/price-display.vue';
import { ModalController } from '@/controllers/modal-controller';
import { useUserStore } from '@/stores/userStore';
import { Item } from '@/types';
import { computed } from 'vue';
import ItemModal from './modals/item-modal.vue';
const props = defineProps({
  item: {
    type: Object as () => Item,
    required: true
  }
});

const item = props.item;
const isFavorite = computed(() => {
  return useUserStore().isFavorite(item.id) ?? false;
});
</script>

<style scoped lang="scss">
// Mixin
@mixin alternating-shade() {
  &:nth-child(odd)::after {
    content: '';
    width: 100%;
    position: absolute;
    background-color: var(--shadow);
    opacity: 0.1;
    height: 100%;
    pointer-events: none;
  }
}

button.item-grid-button {
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0;
  text-decoration: none;
  background-color: transparent;
  color: var(--text-color);
  border-radius: 0;
  border: none;
  font-weight: normal;

  display: grid;
  grid-template-columns: 10rem 8rem 8rem 24rem 8rem 32rem auto;

  > * {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 0.8rem;
    &:not(:last-child) {
      border-right: 1px solid var(--surface-color-2);
    }
  }
  .one-line {
    > span {
      display: block;
      text-align: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  > .rarity {
    font-size: 1.2rem;
    font-style: italic;
    padding: 0;
    > span {
      width: 100%;
      text-align: center;
      color: var(--light-color);
      padding: 0.2rem 0.8rem;
    }
  }

  > .level {
    display: flex;
    gap: 0.4rem;
    > span:first-child {
      opacity: 0.6;
      text-transform: uppercase;
      font-size: 1rem;
    }
  }

  > .bulk {
    i {
      font-size: 1.2rem;
      margin-right: 0.2rem;
    }
  }

  > .traits {
    display: flex;
    gap: 0.4rem;
    > .trait {
      background-color: var(--surface-color-2);
      padding: 0.2rem 0.6rem;
      font-size: 1.2rem;
    }

    > .trait-overflow-count {
      font-size: 1.2rem;
      opacity: 0.6;
    }
  }

  > .favorite {
    font-size: 1.2rem;
    color: var(--red);
    position: absolute;
    right: 0;
    z-index: 1;
  }
}

.item-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  height: 2.8rem;
  overflow: hidden;

  @include alternating-shade();

  &:not(:last-child) {
    border-bottom: 1px solid var(--surface-color-2);
  }

  &--common .rarity {
    background-color: var(--common-color);
  }
  &--uncommon .rarity {
    background-color: var(--uncommon-color);
  }
  &--rare .rarity {
    background-color: var(--rare-color);
  }
  &--unique .rarity {
    background-color: var(--unique-color);
  }
}

@media (max-width: 1200px) {
  .traits {
    display: none !important;
  }
  button.item-grid-button {
    grid-template-columns: 10rem 8rem 8rem 24rem 8rem 1fr;
  }
}

@media (max-width: 768px) {
  button.item-grid-button {
    width: 100%;
    grid-template-columns: 9.2rem 8rem 1fr;
  }
  .item-card {
    border-radius: 0;

    &:not(:last-child) {
      border: none;
      border-bottom: 1px solid var(--surface-color-3);
    }
  }

  .hide-on-mobile {
    display: none !important;
  }
}
</style>
