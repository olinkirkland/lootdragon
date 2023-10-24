import { Item, Trait } from '@/types';
import { defineStore } from 'pinia';

export const useItemsStore = defineStore({
  id: 'items',
  state: () => ({
    items: [] as Item[],
    traits: {} as Record<string, Trait>,
    traitsIcons: {} as Record<string, string>
  })
});
