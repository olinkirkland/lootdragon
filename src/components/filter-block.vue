<template>
  <div class="filter-group">
    <header @click="showFilters = !showFilters">
      <p>
        <i :class="caretClass"></i>
        <span>
          {{ props.name }}
          ({{ choices.length }}/ {{ filters.length }})
        </span>
      </p>
      <button
        class="icon light"
        @click.stop="ModalController.open(props.infoModal)"
      >
        <i class="fas fa-question-circle"></i>
      </button>
    </header>

    <ul class="filter-list" v-if="showFilters">
      <li class="checkbox-group" v-for="filter in filters" :key="filter.id">
        <input
          :id="filter.id"
          type="checkbox"
          :value="filter.name"
          v-model="choices"
        />
        <label :for="filter.id">
          <span class="flex">
            <span v-if="filter.html" v-html="filter.html"></span>
            <span v-else>{{ filter.name }}</span>
            <span class="count">({{ formatNumber(filter.count) }})</span>
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ModalController } from '@/controllers/modal-controller';
import { ComponentOptions, PropType, computed, ref, watch } from 'vue';
import { Item } from '@/types';
import { formatNumber } from '@/utils';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  items: {
    type: Array as PropType<Item[]>,
    required: true
  },
  infoModal: {
    type: Object as PropType<ComponentOptions<any>>,
    required: true
  },
  showCounts: {
    type: Boolean,
    default: true,
    required: false
  },
  filters: {
    type: Array as PropType<{ name: string; html?: string; count: number }[]>,
    required: true
  },
  modelValue: {
    type: Array as PropType<string[]>,
    required: true
  }
});

const showFilters = ref(false);
const filters = computed(() => {
  return props.filters.map((filter) => {
    return {
      ...filter,
      id: props.name + '-' + filter.name // Traits-Magical
    };
  });
});

const choices = ref(props.modelValue);

const caretClass = computed(() => {
  return {
    'fas fa-caret-down': showFilters.value,
    'fas fa-caret-right': !showFilters.value
  };
});

const emit = defineEmits();
watch(choices, (newChoices) => {
  emit('update:modelValue', newChoices);
});
</script>

<style lang="scss" scoped>
.filter-group {
  border: 1px solid black;
  width: 100%;

  > header {
    padding: 0.8rem;
    background-color: #575757;
    color: white;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.4rem;
    cursor: pointer;

    :deep(button.icon) {
      padding: 0 !important;
    }

    > p {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }
  }

  > p {
    color: grey;
    margin-bottom: 0.4rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  > ul.filter-list {
    display: flex;
    padding: 0.8rem;
    gap: 1.2rem;
    max-height: 16rem;
    overflow-y: auto;
    flex-wrap: wrap;

    label {
      > span {
        display: flex;
        align-items: center;
        gap: 0.2rem;

        // For icons in the label
        :deep(> span > span) {
          display: flex;
          align-items: center;
          gap: 0.2rem;
        }

        // For the count
        > span.count {
          color: #575757;
          font-size: 1.2rem;
        }
      }
    }
  }
}
</style>
