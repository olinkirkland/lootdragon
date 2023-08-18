<template>
  <div class="modal">
    <header>
      <h2>Item Reported!</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section>
        <p>
          Item {{ props.item.name.text }} ({{ props.item.id }}) was reported
          successfully.
        </p>
      </section>
      <section>
        <p>
          Since this is a community driven site, we rely on users like you to
          catch items that have broken or otherwise incorrect content. Thank you
          for your help!
        </p>
        <button @click="openItemModal">Back</button>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Item } from '@/types';
import { PropType } from 'vue';
import { ModalController } from '@/controllers/modal-controller';
import ItemModal from './item-modal.vue';

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true
  }
});

function openItemModal() {
  ModalController.open(ItemModal, { item: props.item });
}
</script>
