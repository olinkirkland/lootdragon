<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
@import 'sass-colors';

$primary: 'blue';
.card {
  display: flex;
  width: fit-content;
  padding: 2rem;
  margin: 2rem;
  border: 1px solid color($primary, 'darken-1');
}
</style>
