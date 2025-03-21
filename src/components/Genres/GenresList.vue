<template>
  <ul :class="view">
    <v-card
      v-for="genre in genres"
      :key="genre.id"
      :to="{ name: RouteNames.Genre, params: { genreId: genre.id } }"
      :image="`${siteUrl}${genre.image.optimized.preview}`"
      class="max-w-48 h-72 w-full shrink-0"
    >
      <CardContentGenre :genreName="genre.name" :total-releases="genre.total_releases" />
    </v-card>
  </ul>
</template>

<script setup lang="ts">
import { RouteNames } from '@/router'
import type { Genre } from '@/types/anilibria.types'
import { inject } from 'vue'
import CardContentGenre from '../CardContent/CardContentGenre.vue'

defineProps<{ genres: Genre[] | null; view: 'list' | 'linear' }>()
const siteUrl = inject('siteUrl')
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
