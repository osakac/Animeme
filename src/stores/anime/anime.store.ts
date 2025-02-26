import { loadAnimeNewEpisodes, loadAnimeSlider } from '@/api/anilibria.api'
import type { Anime, SliderAnime } from '@/types/anilibria.types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAnimeStore = defineStore('anime', () => {
  const sliderAnime = ref<SliderAnime[]>([])
  const getSliderAnime = computed(() => sliderAnime.value)
  const getSliderAnimeAPI = async () => {
    const data = await loadAnimeSlider()
    if (data) sliderAnime.value = data
  }

  const newEpisodesAnime = ref<Anime[]>([])
  const getNewEpisodesAnime = computed(() => newEpisodesAnime.value)
  const getNewEpisodesAnimeAPI = async (limit: number) => {
    const data = await loadAnimeNewEpisodes(limit)
    if (data) newEpisodesAnime.value = data
  }

  return {
    sliderAnime,
    getSliderAnime,
    getSliderAnimeAPI,
    newEpisodesAnime,
    getNewEpisodesAnime,
    getNewEpisodesAnimeAPI,
  }
})
