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
    <button @click="() => ModalController.open(ItemModal, { item: item })">
      <price-display v-if="!!item.price" :value="item.price" />
      <span class="single-line">{{ item.name.text }}</span>
      <!-- <span>{{ item.id.substring(0, 4) }}</span> -->
    </button>
  </div>
</template>

<script setup lang="ts">
import { Item } from '@/types';
import PriceDisplay from '@/components/price-display.vue';
import { ModalController } from '@/controllers/modal-controller';
import ItemModal from './modals/item-modal.vue';
const props = defineProps({
  item: {
    type: Object as () => Item,
    required: true
  }
});

const item = props.item;
</script>

<style scoped lang="scss">
.item-card {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  height: 3.2rem;
  overflow: hidden;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.4);

  > button {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0;
    text-decoration: none;
    background-color: transparent;
    color: black;
    gap: 0.4rem;

    > span {
      white-space: nowrap;
      overflow: hidden;
      &:nth-of-type(1) {
        margin-right: 0.4rem;
        text-align: left;
        text-overflow: ellipsis;
        flex: 1;
      }
    }
  }

  &--common {
    background-color: var(--common-color);
  }

  &--uncommon {
    background-color: var(--uncommon-color);
  }

  &--rare {
    background-color: var(--rare-color);
  }

  &--unique {
    background-color: var(--unique-color);
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

    :deep(.price) {
      min-width: 6.4rem;
    }

    &:not(:first-child) {
      border-top: 1px solid rgba(0, 0, 0, 0.4);
      border-top: none;
    }

    position: relative;
    &:nth-child(odd)::after {
      content: '';
      width: 100%;
      position: absolute;
      background-color: #00000010;
      height: 100%;
      pointer-events: none;
    }
  }
}
</style>
