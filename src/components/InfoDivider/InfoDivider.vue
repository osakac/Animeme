<template>
  <div class="inline">
    <span v-for="item in items" :key="item" class="item">
      {{ item }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ data: string[] }>()

const items = computed(() => props.data.filter((item) => item))
</script>

<style scoped>
.item:not(:first-child)::before {
  content: '•';
  @apply mx-[5px];
}
</style>
