<template>
  <div
    class="item-card"
    :class="{
      'obvious-rarity': settingsStore.obviousRarity,
      'item-card--common': item.rarity === 'Common',
      'item-card--uncommon': item.rarity === 'Uncommon',
      'item-card--rare': item.rarity === 'Rare',
      'item-card--unique': item.rarity === 'Unique'
    }"
  >
    <button @click="() => ModalController.open(ItemModal, { item: item })">
      <price-display v-if="!!item.price" :value="item.price" />
      <div class="rarity" v-if="item.rarity !== 'Common'">
        <i class="fas fa-star"></i>
      </div>
      <span class="single-line">{{ item.name.text }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import PriceDisplay from '@/components/price-display.vue';
import { ModalController } from '@/controllers/modal-controller';
import { Item } from '@/types';
import ItemModal from './modals/item-modal.vue';
import { useSettingsStore } from '@/stores/settingsStore';
const props = defineProps({
  item: {
    type: Object as () => Item,
    required: true
  }
});

const item = props.item;
const settingsStore = useSettingsStore();
</script>

<style scoped lang="scss">
// Mixin
@mixin alternating-shade() {
  &:nth-child(odd)::after {
    content: '';
    width: 100%;
    position: absolute;
    background-color: #00000010;
    height: 100%;
    pointer-events: none;
  }
}

.item-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  height: 3.2rem;
  overflow: hidden;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.4);

  &.table-view {
    width: 100%;
    border-radius: 0;
    border: none;

    &:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }

    @include alternating-shade();

    :deep(.price) {
      color: #222;
      background-color: transparent;
      border-right: 1px solid rgba(0, 0, 0, 0.2);
    }
  }

  > button {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0;
    text-decoration: none;
    background-color: transparent;
    color: black;

    > .rarity {
      margin-left: 0.8rem;
      font-size: 1.2rem;
    }

    > span {
      white-space: nowrap;
      overflow: hidden;
      margin: 0 0.8rem;
      text-align: left;
      text-overflow: ellipsis;
      flex: 1;
    }
  }

  &--common .rarity > i {
    color: var(--common-color);
  }
  &--uncommon .rarity > i {
    color: var(--uncommon-color);
  }
  &--rare .rarity > i {
    color: var(--rare-color);
  }
  &--unique .rarity > i {
    color: var(--unique-color);
  }

  &.obvious-rarity {
    .rarity {
      display: none;
    }

    &:not(.item-card--common) {
      > * {
        color: #f1f1f1;
      }

      :deep(.price) {
        color: #f1f1f1;
      }
    }

    &.item-card--uncommon {
      background-color: var(--uncommon-color);
    }
    &.item-card--rare {
      background-color: var(--rare-color);
    }
    &.item-card--unique {
      background-color: var(--unique-color);
    }
  }
}

:deep(.price) {
  color: white;
  background-color: rgba(34, 34, 34, 0.8);
  height: 100%;
}

@media (max-width: 768px) {
  .item-card {
    border-radius: 0;

    @include alternating-shade();

    &:not(:last-child) {
      border: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
  }
}

.item-card.table-view {
  :deep(.price) {
    min-width: 10rem;
  }
}
</style>
