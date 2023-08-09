<template>
  <p class="price">
    <span v-if="platinum">{{ platinum / 1000 }}</span
    ><img src="assets/img/platinum.png" alt="platinum" />
    <span v-if="gold">{{ gold / 100 }}</span
    ><img src="assets/img/gold.png" alt="gold" />
    <span v-if="silver">{{ silver / 10 }}</span
    ><img src="assets/img/silver.png" alt="silver" />
    <span v-if="copper">{{ copper }}</span
    ><img src="assets/img/copper.png" alt="copper" />
  </p>
</template>

<script setup lang="ts">
const props = defineProps({
  value: {
    type: Number,
    required: true
  }
});

// copper = 0.01
// silver = 0.1
// gold = 1
// platinum = 10

const copper = props.value % 10;
const silver = (props.value - copper) % 100;
const gold = (props.value - silver - copper) % 1000;
const platinum = (props.value - gold - silver - copper) % 10000;
</script>

<style scoped lang="scss"></style>
