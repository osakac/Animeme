import taxios from '@/plugins/axios/axios.config'
import type { Anime, Franchise, SliderAnime } from '@/types/anilibria.types'

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

export async function loadAnimeInfo(animeAlias: string) {
  try {
    const { data } = await taxios.get<Anime>(`/anime/releases/${animeAlias}`)
    return data
  } catch (error) {
    console.log('Ошибка:', error)
  }
}

export async function loadAnimeFranchise(franchiseId: number) {
  try {
    const { data } = await taxios.get<Franchise[]>(`/anime/franchises/release/${franchiseId}`)
    return data[0]
  } catch (error) {
    console.log('Ошибка:', error)
  }
}
