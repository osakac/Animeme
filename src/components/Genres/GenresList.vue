<template>
  <li v-for="genre in genres" :key="genre.id">
    <v-card
      :to="{ name: RouteNames.Genre, params: { genreId: genre.id } }"
      :image="siteUrl(genre.image.optimized.preview)"
      class="h-full"
    >
      <CardContentGenre :genreName="genre.name" :total-releases="genre.total_releases" />
    </v-card>
  </li>
</template>

<script setup lang="ts">
import { siteUrl } from '@/helpers/siteUrl'
import { RouteNames } from '@/router'
import type { Genre } from '@/types/anilibria.types'
import CardContentGenre from '../CardContent/CardContentGenre.vue'

defineProps<{ genres: Genre[] | null }>()
</script>
