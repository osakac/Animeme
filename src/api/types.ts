import type { Anime, ScheduleNow, ScheduleWeek } from '@/types/anilibria.types'

export interface ScheduleTypeMap {
  now: ScheduleNow
  week: ScheduleWeek
}

export interface AnimeMetaResponse {
  data: Anime[]
  meta: Meta
}

export interface Meta {
  pagination: {
    total_pages: number
    current_page: number
    total: number
  }
}
