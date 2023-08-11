<template>
  <div class="modal">
    <header>
      <h1>{{ item.name.text }}</h1>
      <button @click="ModalController.close">X</button>
    </header>
    <section>
      <button @click="copyJSON">Copy JSON</button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
import { Item } from '@/types';
import { PropType } from 'vue';

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true
  }
});

const item = props.item;

function copyJSON() {
  navigator.clipboard.writeText(JSON.stringify(item, null, 2));
}
</script>

<style scoped lang="scss">
.modal {
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 80%;
  height: 80%;
  padding: 2rem;
  border: 1px solid black;
  overflow: auto;

  header {
    display: flex;
    justify-content: space-between;
    h1 {
      color: black;
    }
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
}
</style>
