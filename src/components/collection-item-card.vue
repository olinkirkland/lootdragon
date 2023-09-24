<template>
  <div class="collection-item-card">
    <p class="quantity">
      <span>{{ quantity }}x</span>
      <button class="icon icon--mini">
        <i class="fas fa-edit"></i>
      </button>
    </p>
    <button @click="() => ModalController.open(ItemModal, { item })">
      <span class="single-line">{{ item.name.text }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
import { Item } from '@/types';
import { formatNumber } from '@/utils';
import { computed } from 'vue';
import ItemModal from './modals/item-modal.vue';
const props = defineProps({
  item: {
    type: Object as () => Item,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const item = props.item;
const quantity = computed(() => formatNumber(props.quantity));
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

.collection-item-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  height: 3.2rem;
  overflow: hidden;
  border: 1px solid var(--surface-color-2);

  > button {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0;
    text-decoration: none;
    background-color: transparent;
    color: var(--text-color);
    border-radius: 0;
    border: none;
    > .rarity {
      margin-left: 0.8rem;
      font-size: 1.2rem;
    }

    > .favorite {
      font-size: 1.2rem;
      color: var(--red);
      margin-right: 1rem;
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

  > .quantity {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 0.8rem;
    width: 8rem;
  }
}
</style>
