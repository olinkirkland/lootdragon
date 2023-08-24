import { defineStore } from 'pinia';
import { User } from '@/types';

// Allow favorites to be updated
export const useUserStore = defineStore('user', () => {
  return { user: null as User | null };
});
