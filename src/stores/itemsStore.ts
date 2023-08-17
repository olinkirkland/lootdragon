import { Item } from '@/types';
import { defineStore } from 'pinia';

export const useItemsStore = defineStore({
  id: 'items',
  state: () => ({
    items: [] as Item[]
  })
});
