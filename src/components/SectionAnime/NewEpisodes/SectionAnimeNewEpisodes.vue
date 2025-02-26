<template>
  <ul class="list-none flex gap-[19.2px] list">
    <SectionAnimeNewEpisode v-for="anime in data" :key="anime.id" :anime />
  </ul>
</template>

<script setup lang="ts">
import type { Anime } from '@/types/anilibria.types'
import SectionAnimeNewEpisode from './SectionAnimeNewEpisode.vue'

defineProps<{ data: Anime[] }>()
</script>

<style scoped>
.list {
  overflow-x: scroll;

  &::-webkit-scrollbar {
    @apply hidden;
  }
}
</style>
