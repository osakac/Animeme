<template>
  <div class="inline">
    <span v-for="item in data" :key="item" class="item">
      {{ item }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ data: string[] }>()
</script>

<style scoped>
.item:not(:first-child)::before {
  content: '•';
  @apply mx-[5px];
}
</style>
