<template>
  <div class="button-group" @click="onClick" ref="slotContainer">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps({
  modelValue: String,
  multiple: Boolean
});

const slotContainer = ref(<HTMLElement | null>null);

// When it's mounted, we need to find the initial button
// and set it as active
onMounted(() => {
  if (slotContainer.value) {
    const slotElements = slotContainer.value.querySelectorAll('button');
    const initialButton =
      Array.from(slotElements).find((el) => el.value === props.modelValue) ||
      (slotElements[0] as HTMLButtonElement);

    updateButtons(initialButton);
  }
});

function onClick({ target }: MouseEvent) {
  const button = (target as HTMLElement).closest('button');
  if (!button) return;
  updateButtons(button);
}

function updateButtons(button: HTMLButtonElement) {
  const buttons = Array.from(
    button.parentElement!.children
  ) as HTMLButtonElement[];
  if (props.multiple) {
    button.classList.toggle('active');
    const activeButtons = buttons.filter((b) => b.classList.contains('active'));
    emit(
      'update:modelValue',
      activeButtons.map((b) => b.value)
    );
  } else {
    buttons.forEach((b) => b.classList.remove('active'));
    button.classList.add('active');
    emit('update:modelValue', button.value);
  }
}

const emit = defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
.button-group {
  display: flex;

  :deep(button.active) {
    z-index: 1;
    border: none;
    > span {
      color: var(--color-secondary);
    }
  }

  :deep(button:not(:last-child)) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  :deep(button:not(:first-child)) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
