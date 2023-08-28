import { defineStore } from 'pinia';
import { User } from '@/types';

// Allow favorites to be updated
export const useUserStore = defineStore('user', () => {
  return {
    user: null as User | null,
    isFavorite(id: string): boolean {
      return this.user?.favorites.includes(id) ?? false;
    }
  };
});