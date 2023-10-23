<template>
  <div class="filter-group">
    <header @click="showFilters = !showFilters">
      <p>
        <i :class="caretClass"></i>
        <span>
          {{ props.name }}
        </span>
        <span v-if="choices.length < filters.length"
          >({{ choices.length }}/{{ filters.length }})</span
        >
        <span v-else>(All)</span>
      </p>
    </header>

    <ul class="filter-list" v-if="showFilters">
      <li class="checkbox-group checkbox-group--all">
        <input
          type="checkbox"
          :id="props.name + '-all'"
          v-model="selectAll"
          @toggle="toggleAllChoices"
        />
        <label :for="props.name + '-all'">
          <span class="flex">
            <span>All</span>
            <span class="count">({{ formatNumber(props.items.length) }})</span>
          </span>
        </label>
        <button
          v-if="props.infoModal"
          class="icon info"
          @click.stop="ModalController.open(props.infoModal)"
        >
          <i class="fas fa-info-circle"></i>
        </button>
      </li>
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
import { Item } from '@/types';
import { formatNumber } from '@/utils';
import { ComponentOptions, PropType, computed, ref, watch } from 'vue';

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
    required: false
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

const selectAll = computed({
  get() {
    return choices.value.length === props.filters.length;
  },
  set(value: boolean) {
    if (value) choices.value = filters.value.map((filter) => filter.name);
    else choices.value = [];
  }
});

const toggleAllChoices = () => {
  selectAll.value = !selectAll.value;
};
</script>

<style lang="scss" scoped>
.filter-group {
  width: 100%;
  &:not(:last-child) {
    border-bottom: 1px solid var(--surface-color-2);
  }

  > header {
    padding: 0.8rem;
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

      > i {
        padding: 0 0.4rem;
        width: 1.6rem;
        font-size: 1.6rem;
      }
    }
  }

  > p {
    color: var(--text-color-3);
    margin-bottom: 0.4rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  > ul.filter-list {
    display: flex;
    padding: 0.8rem;
    gap: 0.8rem;
    max-height: 16rem;
    overflow-y: auto;
    flex-wrap: wrap;

    li.checkbox-group {
      gap: 0.6rem;
      border-radius: 5px;
      align-items: center;
    }
    li.checkbox-group--all {
      width: 100%;
      padding-bottom: 0.4rem;
      margin-bottom: 0.4rem;
      border-radius: 0;
      border: none;
      border-bottom: 1px dashed var(--surface-color-3);

      > button.info {
        margin-left: auto;
        padding: 0.2rem;
      }
    }

    label {
      > span {
        display: flex;
        align-items: center;
        gap: 0.4rem;

        // For icons in the label
        :deep(> span > span) {
          display: flex;
          align-items: center;
          gap: 0.2rem;
        }

        // For the count
        > span.count {
          color: var(--text-color-3);
          font-size: 1.2rem;
        }
      }
    }
  }
}
</style>
