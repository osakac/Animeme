import type { Schedule } from '@/types/anilibria.types'

export function doScheduleWeek(week: Schedule[]) {
  const formattedWeek: Record<string, Schedule[]> = {
    Все: week,
    Понедельник: [],
    Вторник: [],
    Среда: [],
    Четверг: [],
    Пятница: [],
    Суббота: [],
    Воскресенье: [],
  }

  week.forEach((day) => {
    formattedWeek[day.release.publish_day.description as keyof typeof formattedWeek].push(day)
  })

  return formattedWeek
}
