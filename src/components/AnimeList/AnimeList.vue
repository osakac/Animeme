<template>
  <template v-if="!data.length">
    <v-skeleton-loader v-for="(_, idx) in 6" :key="idx" type="image@2" class="h-72 w-full" />
  </template>

  <AnimeItem v-else v-for="anime in data" :key="anime.id" :anime />
</template>

<script setup lang="ts">
import type { Anime } from '@/types/anilibria.types'
import AnimeItem from './AnimeItem.vue'

defineProps<{ data: Anime[] }>()
</script>
