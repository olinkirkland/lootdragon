import { defineStore } from 'pinia';

export const useNavStore = defineStore({
  id: 'nav',
  state: () => ({
    nav: null as string | null,
    loadingText: null as string | null
  })
});