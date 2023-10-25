<template>
  <div class="item-card item-card--header">
    <div class="item-grid-button">
      <p
        v-for="column in columns"
        :key="column.name"
        @click="updateSort(column.name)"
        class="one-line"
        :class="{ 'item-card--active': props.modelValue === column.name }"
      >
        <span :class="column.hiddenOnMobile ? 'hide-on-mobile' : ''">
          {{ column.name }}
        </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const columns = [
  {
    name: 'value',
    hiddenOnMobile: false
  },
  {
    name: 'rarity',
    hiddenOnMobile: false
  },
  {
    name: 'level',
    hiddenOnMobile: true
  },
  {
    name: 'name',
    hiddenOnMobile: false
  },
  {
    name: 'bulk',
    hiddenOnMobile: true
  },
  {
    name: 'category',
    hiddenOnMobile: true
  },
  {
    name: 'traits',
    hiddenOnMobile: true
  }
];

const props = defineProps({
  modelValue: String
});

onMounted(() => {
  console.log(props.modelValue);
});

function updateSort(type: string) {
  emit('update:modelValue', type);
}

const emit = defineEmits(['update:modelValue']);
</script>

<style scoped lang="scss">
div.item-grid-button {
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0;
  text-decoration: none;
  background-color: transparent;
  color: var(--text-color);
  border-radius: 0;
  border: none;
  font-weight: normal;

  display: grid;
  grid-template-columns: 10rem 8rem 8rem 24rem 8rem 32rem auto;

  > * {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 0.8rem;
    &:not(:last-child) {
      border-right: 1px solid var(--surface-color-2);
    }
  }
  > .one-line {
    height: initial;
    display: initial;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  > .rarity {
    font-size: 1.2rem;
    font-style: italic;
    padding: 0;
    > span {
      width: 100%;
      text-align: center;
      color: var(--light-color);
      padding: 0.2rem 0.8rem;
    }
  }

  > .level {
    display: flex;
    gap: 0.4rem;
    > span:first-child {
      opacity: 0.6;
      text-transform: uppercase;
      font-size: 1rem;
    }
  }

  > .bulk {
    i {
      font-size: 1.2rem;
      margin-right: 0.2rem;
    }
  }

  > .traits {
    display: flex;
    gap: 0.4rem;
    > .trait {
      background-color: var(--surface-color-2);
      padding: 0.2rem 0.6rem;
      font-size: 1.2rem;
      border-radius: 99px;
    }

    > .trait-overflow-count {
      font-size: 1.2rem;
      opacity: 0.6;
    }
  }
}

.item-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  height: 2.8rem;
  overflow: hidden;
  border-radius: 3px;

  border-bottom: 1px solid var(--surface-color-2);
}

@media (max-width: 1200px) {
  .traits {
    display: none !important;
  }
  div.item-grid-button {
    grid-template-columns: 10rem 8rem 8rem 24rem 8rem 1fr;
  }
}

@media (max-width: 768px) {
  div.item-grid-button {
    width: 100%;
    grid-template-columns: 9.2rem 8rem 1fr;
  }
  .item-card {
    border-radius: 0;

    &:not(:last-child) {
      border: none;
      border-bottom: 1px solid var(--surface-color-3);
    }
  }

  .hide-on-mobile {
    display: none !important;
  }
}
</style>
