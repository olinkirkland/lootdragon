<template>
  <div class="modal" :class="{ busy: isBusy }">
    <header>
      <h2>Manage Characters</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section>
        <p>
          When you invite people, they assume the role of a player character -
          the character they play in the Pathfinder2E game you're GMing. Each
          person can be invited with an individual link that will give them
          immediate access to the game page as their character with the
          properties you choose.
        </p>
      </section>

      <section>
        <ul>
          <li v-for="player in players">
            <pre>{{ player }}</pre>
          </li>
        </ul>
      </section>

      <section>
        <button>
          <i class="fas fa-plus"></i>
          <span>Add Character</span>
        </button>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
import { useGamesStore } from '@/stores/gamesStore';
import { computed, ref } from 'vue';

const isBusy = ref(false);

const props = defineProps({
  gameId: {
    type: String,
    required: true
  }
});

const game = useGamesStore().getGameById(props.gameId);

const players = computed(() => {
  return game.value!.players;
});
</script>

<style scoped lang="scss"></style>
