import taxios from '@/plugins/axios/axios.config'
import type { Anime, SliderAnime } from '@/types/anilibria.types'

export async function loadAnimeSlider() {
  try {
    const { data } = await taxios.get<SliderAnime[]>('/media/promotions')
    return data.filter((slide) => slide.is_ad === false)
  } catch (error) {
    console.log('Ошибка:', error)
  }
}

export async function loadAnimeNewEpisodes(limit = 42) {
  try {
    const { data } = await taxios.get<Anime[]>(`/anime/releases/latest?limit=${limit}`)
    return data
  } catch (error) {
    console.log('Ошибка:', error)
  }
}
