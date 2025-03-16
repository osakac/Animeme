<template>
  <div class="flex flex-col gap-10">
    <TheSlider :data="sliderAnime" />

    <AppSection
      :to="{ name: RouteNames.NewEpisodes }"
      title="Новые эпизоды"
      subtitle="Самые новые и свежие эпизоды в любимой озвучке"
    >
      <NewEpisodes :episodes="newEpisodesAnime" view="linear" />
    </AppSection>
  </div>
</template>

<script setup lang="ts">
import NewEpisodes from '@/components/NewEpisodes/NewEpisodes.vue'
import AppSection from '@/components/Section/AppSection.vue'
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
