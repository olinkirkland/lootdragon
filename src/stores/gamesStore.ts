import { fetchGame } from '@/controllers/connection';
import { Game } from '@/types';
import { defineStore } from 'pinia';
import { computed, watch } from 'vue';
import { useUserStore } from './userStore';

export const useGamesStore = defineStore('games', () => {
  return {
    games: [] as Game[],
    async fetchGames(gameIds: string[]) {
      const promises = gameIds.map(async (gameId) => {
        return await fetchGame(gameId);
      });

      const fetchedGames = await Promise.all(promises);

      // Filter out any null or undefined values (if fetchGame didn't return a game).
      this.games = fetchedGames.filter((game) => !!game) as Game[];
    },
    getGameById(gameId: string) {
      return computed(() => {
        return this.games.find((g) => g.id === gameId);
      });
    }
  };
});

export function setupGamesStore() {
  const gamesStore = useGamesStore();

  watch(
    () => useUserStore().user?.games,
    (newGameIds, oldGameIds) => {
      if (!useUserStore().user || !newGameIds) return;
      if (JSON.stringify(newGameIds) === JSON.stringify(oldGameIds)) return;

      console.log('Fetching games');
      gamesStore.fetchGames(newGameIds);
    }
  );
}
