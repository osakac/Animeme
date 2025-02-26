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
import AnimeList from '@/components/AnimeList/AnimeList.vue'
import TheSlider from '@/components/Slider/TheSlider.vue'
import { useAnimeStore } from '@/stores/anime/anime.store'
import { computed, onBeforeMount } from 'vue'

const animeStore = useAnimeStore()

const sliderAnime = computed(() => animeStore.getSliderAnime)
const newEpisodesAnime = computed(() => animeStore.getNewEpisodesAnime)

onBeforeMount(() => {
  animeStore.getSliderAnimeAPI()
  animeStore.getNewEpisodesAnimeAPI(6)
})
</script>
