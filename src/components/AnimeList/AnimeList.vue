<template>
  <ul :class="view">
    <template v-if="!data.length">
      <v-skeleton-loader
        v-for="(_, idx) in 6"
        :key="idx"
        type="image@2"
        class="max-w-48 h-72 w-full shrink-0"
      />
    </template>

    <AnimeItem v-else v-for="anime in data" :key="anime.id" :anime />
  </ul>
</template>

<script setup lang="ts">
import type { Anime } from '@/types/anilibria.types'
import AnimeItem from './AnimeItem.vue'

defineProps<{ data: Anime[]; view: 'list' | 'linear' }>()
</script>

<style scoped>
@reference 'tailwindcss';

.linear {
  @apply flex gap-[19.2px] overflow-x-scroll;

  &::-webkit-scrollbar {
    @apply hidden;
  }
}

.list {
  @apply grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 place-items-center;
}
</style>
