import taxios from '@/plugins/axios/axios.config'
import type { Anime } from '@/types/anilibria.types'

export async function loadSliderAnimes() {
  try {
    const { data } = await taxios.get<Anime[]>('/media/promotions')
    return data.filter((slide) => slide.is_ad === false)
  } catch (error) {
    console.log('Ошибка:', error)
  }
}
