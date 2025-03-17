import taxios from '@/plugins/axios/axios.config'
import type { Anime, Franchise, SliderAnime } from '@/types/anilibria.types'
import type { ScheduleTypeMap } from './types'

export async function loadSliderData() {
  try {
    const { data } = await taxios.get<SliderAnime[]>('/media/promotions')
    return data.filter((slide) => slide.is_ad === false)
  } catch (error) {
    console.log('Ошибка:', error)
  }
}

export async function loadNewEpisodes(limit = 42) {
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

export async function loadAnimeSearch(query: string) {
  try {
    const { data } = await taxios.get<Anime[]>(`/app/search/releases?query=${query}`)
    return data
  } catch (error) {
    console.log('Ошибка:', error)
  }
}

export async function loadSchedule<T extends keyof ScheduleTypeMap>(period: T) {
  try {
    const { data } = await taxios.get<ScheduleTypeMap[T]>(`anime/schedule/${period}`)
    return data
  } catch (error) {
    console.log('Ошибка:', error)
  }
}
