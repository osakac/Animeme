import type { Episode } from '@/types/anilibria.types'

export function getTotalWatchTime(episodes: Episode[]) {
  const totalSeconds = episodes.reduce((acc, episode) => acc + episode.duration, 0)
  const totalHours = Math.floor(totalSeconds / 3600)
  const totalMinutes = Math.floor((totalSeconds - totalHours * 3600) / 60)
  const totalTime = {
    hours: totalHours,
    minutes: totalMinutes,
  }

  const hours = new Intl.NumberFormat('ru-RU', {
    style: 'unit',
    unit: 'hour',
    unitDisplay: 'long',
    minimumIntegerDigits: 1,
  }).format(totalTime.hours)
  const minutes = new Intl.NumberFormat('ru-RU', {
    style: 'unit',
    unit: 'minute',
    unitDisplay: 'long',
    minimumIntegerDigits: 1,
  }).format(totalTime.minutes)

  return `${hours} ${minutes}`
}
