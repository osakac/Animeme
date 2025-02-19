<template>
  <ul class="list-none flex gap-[19.2px] list">
    <AnimeItemNewEpisode v-for="anime in animes" :key="anime.id" :anime="anime" />
  </ul>
</template>

<script setup lang="ts">
import type { Anime } from '@/types/anilibria.types'
import AnimeItemNewEpisode from './AnimeItemNewEpisode/AnimeItemNewEpisode.vue'

defineProps<{ animes: Anime[] }>()
</script>

<style scoped>
.list {
  overflow-x: scroll;

  &::-webkit-scrollbar {
    @apply hidden;
  }
}
</style>
