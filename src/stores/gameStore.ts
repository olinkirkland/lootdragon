import { accessToken, fetchGame } from '@/controllers/connection';
import { connectToWebSocket } from '@/controllers/socket-client';
import { GameState } from '@/types';
import { deepMerge } from '@/utils';
import { defineStore } from 'pinia';

// The Game store refers to the current game that the user is connected to
// It is kept up to date via the websocket connection
export const useGameStore = defineStore('game', () => {
  return {
    game: null as GameState | null,
    async refresh(gameId: string) {
      const gameState = await fetchGame(gameId);
      if (gameState) this.game = gameState;

      connectToWebSocket({ gameId: gameId, token: accessToken });
    },
    async update(update: Partial<GameState>) {
      if (!this.game || !update) return;
      deepMerge(this.game!, update);
    }
  };
});
