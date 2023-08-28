<template>
  <div class="modal" :class="{ busy: isBusy }">
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
          <button @click="ModalController.close" v-if="props.cancelText">
            {{ props.cancelText }}
          </button>
          <button
            class="primary"
            @click="busyAndCallback"
            v-if="props.confirmText"
          >
            <span>{{ props.confirmText }}</span>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
import { PropType, ref } from 'vue';

const isBusy = ref(false);

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

const busyAndCallback = async () => {
  isBusy.value = true;
  await props.confirmCallback();
};
</script>

<style scoped lang="scss"></style>
