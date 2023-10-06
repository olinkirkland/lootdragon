<template>
  <p class="price">
    <span class="price__group" v-if="gold > 0">
      <img src="/assets/images/gold.png" />
      <span>{{ formatNumber(gold) }}</span>
    </span>
    <span class="price__group" v-if="silver > 0">
      <img src="/assets/images/silver.png" />
      <span>{{ formatNumber(silver) }}</span>
    </span>
    <span class="price__group" v-if="copper > 0">
      <img src="/assets/images/copper.png" />
      <span>{{ formatNumber(copper) }}</span>
    </span>
    <span
      class="price__group"
      v-if="gold === 0 && silver === 0 && copper === 0"
    >
      <span>N/A</span>
    </span>
  </p>
</template>

<script setup lang="ts">
import { formatNumber } from '@/utils';

const props = defineProps({
  value: {
    type: Number,
    required: true
  }
});

// copper = 0.01
// silver = 0.1
// gold = 1

// 3.45 = 3 gold, 4 silver, 5 copper
// 35 = 35 gold
// 0.5 = 5 silver
// 0.52 = 5 silver, 2 copper

const gold = Math.floor(props.value);
const silver = Math.floor((props.value - gold) * 10);
const copper = Math.floor((props.value - gold - silver) * 100);
</script>

<style scoped lang="scss">
.price {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0 0.8rem;
  color: var(--text-color);
  height: fit-content;

  * {
    text-decoration: none;
  }

  > .price__group {
    display: flex;
    align-items: center;

    img {
      height: 1.4rem;
      margin-right: 0.6rem;
    }
  }
}
</style>
