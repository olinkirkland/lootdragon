import { User } from '@/types';
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null as User | null
  })
});
