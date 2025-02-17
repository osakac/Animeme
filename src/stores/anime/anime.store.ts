import { loadSliderAnimes } from '@/api/anilibria.api'
import type { Anime } from '@/types/anilibria.types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnimeStore = defineStore('anime', () => {
  const sliderAnimes = ref<Anime[]>([])

  const getSliderAnimes = async () => {
    const data = await loadSliderAnimes()
    if (data) sliderAnimes.value = data
  }

  return { sliderAnimes, getSliderAnimes }
})
