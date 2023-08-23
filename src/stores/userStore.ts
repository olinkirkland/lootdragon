import { defineStore } from 'pinia';
import { User } from '@/types';

export const useUserStore = defineStore('user', () => {
  return { user: null as User | null };
});
