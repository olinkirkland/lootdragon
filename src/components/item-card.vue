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
    <a
      :href="'https://2e.aonprd.com' + item.name.url"
      target="_blank"
      rel="noopener noreferrer"
    >
      <price-display v-if="!!item.price" :value="item.price" />
      <span>
        <span>{{ item.name.text }}</span>
        <!-- <span>*{{ item.rarity.substring(0, 1).toLowerCase() }}</span> -->
      </span>
    </a>
  </div>
</template>

<script setup lang="ts">
import { Item } from '@/types';
import PriceDisplay from '@/components/price.vue';
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
  border: 1px solid black;

  > a {
    display: flex;
    align-items: center;
    height: 100%;
    text-decoration: none;
    > span {
      padding: 0 0.8rem;
    }
  }

  &--common {
  }

  &--uncommon {
    background-color: #caffca;
  }

  &--rare {
    background-color: #cfe9f1;
  }

  &--unique {
    background-color: #fff4b6;
  }
}
</style>
