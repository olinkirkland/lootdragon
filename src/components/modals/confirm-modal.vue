<template>
  <div class="modal">
    <header>
      <h2>{{ props.title }}</h2>
      <button class="icon" @click="ModalController.close">
        <i class="fas fa-times"></i>
      </button>
    </header>
    <div class="modal__content">
      <section>
        <p>{{ props.text }}</p>
      </section>
      <section>
        <div class="flex">
          <button @click="ModalController.close">
            {{ props.cancelText }}
          </button>
          <button class="primary" @click="props.confirmCallback">
            <span>{{ props.confirmText }}</span>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
import { PropType } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: 'Are you sure?'
  },
  text: {
    type: String,
    required: false,
    default: 'Confirm this action?'
  },
  confirmText: {
    type: String,
    required: false,
    default: 'Confirm'
  },
  confirmCallback: {
    type: Function as PropType<() => void>,
    required: false,
    default: () => ModalController.close()
  },
  cancelText: {
    type: String,
    required: false,
    default: 'Cancel'
  },
  cancelCallback: {
    type: Function as PropType<() => void>,
    required: false,
    default: () => ModalController.close()
  }
});
</script>

<style scoped lang="scss"></style>
