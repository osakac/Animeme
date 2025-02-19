<template>
  <TheSlider class="mb-6" />
  <AnimeList
    variant="NewEpisodes"
    :animes="newEpisodesAnimes"
    title="Новые эпизоды"
    subtitle="Самые новые и свежие эпизоды в любимой озвучке"
  />
</template>

<script setup lang="ts">
import { loadNewEpisodesAnimes } from '@/api/anilibria.api'
import AnimeList from '@/components/AnimeList/AnimeList.vue'
import TheSlider from '@/components/Slider/TheSlider.vue'
import type { Anime } from '@/types/anilibria.types'
import { onMounted, ref } from 'vue'

const newEpisodesAnimes = ref<Anime[]>([])

onMounted(async () => {
  const newEpisodes = await loadNewEpisodesAnimes(6)
  if (newEpisodes) newEpisodesAnimes.value = newEpisodes
})
</script>
