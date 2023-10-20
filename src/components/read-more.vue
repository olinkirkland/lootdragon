<template>
  <span>
    {{ showAll ? longText : shortText }}
    <button
      v-if="longText !== shortText"
      class="text read-more"
      @click="showAll = !showAll"
    >
      <span>{{ showAll ? 'Read less' : 'Read more' }}</span>
    </button>
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  limit: {
    type: Number,
    default: 24
  }
});

const longText = computed(() => props.text);
const shortText = computed(() => {
  const wordCount = props.text.split(' ').length;
  if (wordCount > props.limit) {
    return (
      props.text
        .split(' ')
        .slice(0, props.limit - 4)
        .join(' ') + '...'
    );
  } else {
    return props.text;
  }
});

const showAll = ref(false);
</script>

<style scoped lang="scss">
button.read-more {
  height: initial;
  font-size: 1.6rem;
}
</style>
