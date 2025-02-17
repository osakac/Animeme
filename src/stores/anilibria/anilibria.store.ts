import { getSliderAnimes } from '@/api/anilibria.api'
import type { Anime } from '@/types/anilibria.types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnilibriaStore = defineStore('anilibria', () => {
  const sliderAnimes = ref<Anime[]>([])

  const loadSliderAnimes = async () => {
    const data = await getSliderAnimes()
    if (data) sliderAnimes.value = data
  }

  return { sliderAnimes, loadSliderAnimes }
})
