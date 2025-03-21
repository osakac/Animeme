import type { Anime, ScheduleNow, ScheduleWeek } from '@/types/anilibria.types'

export interface ScheduleTypeMap {
  now: ScheduleNow
  week: ScheduleWeek
}

export interface ReleaseOfGenreResponse {
  data: Anime[]
  meta: {
    pagination: {
      total_pages: number
      current_page: number
      total: number
    }
  }
}
