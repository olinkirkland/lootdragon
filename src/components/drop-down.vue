<template>
  <div class="drop-down" ref="dropDown">
    <button
      class="selection-button"
      :class="{ 'selection-button--open': showOptions }"
      ref="selectionButton"
      @click="showOptions = !showOptions"
    >
      <div class="selection-button__content"></div>
      <i
        :class="['fas', showOptions ? 'fa-chevron-up' : 'fa-chevron-down']"
      ></i>
    </button>
    <div
      class="options"
      v-show="showOptions"
      @click="onClick"
      ref="slotContainer"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  modelValue: String
});

const showOptions = ref(false);

const dropDown = ref(<HTMLButtonElement | null>null);
const selectionButton = ref(<HTMLButtonElement | null>null);
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

  // When click anywhere else, close the options
  document.addEventListener('mousedown', onClickAnywhere);
});

// Dispose
onUnmounted(() => {
  document.removeEventListener('mousedown', onClickAnywhere);
});

function onClickAnywhere(event: MouseEvent) {
  // Is the target of the event a child of the drop-down?
  if (dropDown.value?.contains(event.target as Node)) return;

  // Close
  showOptions.value = false;
}

function onClick({ target }: MouseEvent) {
  const button = (target as HTMLElement).closest('button');
  if (!button) return;
  showOptions.value = false;
  updateButtons(button);
}

function updateButtons(button: HTMLButtonElement) {
  const buttons = Array.from(
    button.parentElement!.children
  ) as HTMLButtonElement[];
  buttons.forEach((b) => b.classList.remove('active'));
  button.classList.add('active');

  if (selectionButton.value) {
    selectionButton.value.querySelector(
      '.selection-button__content'
    )!.innerHTML = button.innerHTML;
  }

  emit('update:modelValue', button.value);
}

const emit = defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
.drop-down {
  position: relative;
  display: flex;
}

button.selection-button {
  display: flex;
  gap: 0.6rem;
  width: 100%;

  > .selection-button__content {
    flex: 1;
    overflow: hidden;
  }

  > i {
    font-size: 1.2rem;
  }

  &--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  :deep(span) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

button.selection-button > .selection-button__content,
.options :deep(button) {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.4rem;

  font-weight: normal;
  align-items: center;
  cursor: pointer;
  text-align: left;
  border-radius: 0;
  border: none;
}

.options {
  z-index: 99;
  display: flex;
  position: absolute;
  width: 100%;
  top: 100%;
  flex-direction: column;
  box-shadow: 0 0 0 1px var(--surface-color-3),
    0 0 1.2rem 0rem rgba(0, 0, 0, 0.2);
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  overflow: hidden;

  :deep(button) {
    padding: 0.8rem 1.2rem;
    background-color: var(--surface-color);
    border-bottom: 1px solid var(--surface-color-1);
    &:last-child {
      border-bottom: none;
    }

    > span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &.active {
      background-color: var(--text-color);
      > span {
        color: var(--surface-color);
      }
    }

    &:active {
      background-color: var(--surface-color-3);
      > span {
        color: var(--text-color);
      }
    }
  }
}
</style>
