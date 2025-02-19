import { loadSliderAnimes } from '@/api/anilibria.api'
import type { SliderAnime } from '@/types/anilibria.types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnimeStore = defineStore('anime', () => {
  const sliderAnimes = ref<SliderAnime[]>([])

  const getSliderAnimes = async () => {
    const data = await loadSliderAnimes()
    if (data) sliderAnimes.value = data
  }

  return { sliderAnimes, getSliderAnimes }
})
