<template>
  <ul :class="view">
    <slot></slot>
  </ul>
</template>

<script setup lang="ts">
defineProps<{ view: 'list' | 'linear' }>()
</script>

<style scoped>
@reference 'tailwindcss';

.linear {
  @apply flex gap-5 overflow-x-scroll;

  &::-webkit-scrollbar {
    @apply hidden;
  }

  & > :deep(li) {
    @apply w-[191px] h-72 shrink-0 rounded-lg overflow-hidden;
  }
}

.list {
  @apply grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 place-items-center;

  & > :deep(li) {
    @apply w-full h-72 rounded-lg overflow-hidden;
  }
}
</style>
