import type { Anime } from '@/types/anilibria.types'

export interface Props {
  animes: Anime[]
  variant: 'NewEpisodes'
  title: string
  subtitle: string
}
