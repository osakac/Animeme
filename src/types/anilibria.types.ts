export interface SliderAnime {
  id: string
  description: string
  image: {
    optimized: { preview: string }
  }
  release: {
    name: { main: string }
    alias: string
    age_rating: { label: string }
    season: { description: string }
    year: number
    episodes_total: number
    genres: AnimeGenre[]
  }
  is_ad: boolean
}

export interface AnimeGenre {
  id: number
  name: string
}

export interface Episode {
  duration: number
  name: string
  ordinal: number
  preview: { optimized: { src: string } }
  hls_1080: string
}

export interface Anime {
  id: number
  description: string
  alias: string
  episodes_total: number
  episodes: Episode[]
  name: { main: string; english: string }
  year: number
  latest_episode: { ordinal: number }
  poster: { optimized: { src: string } }
  season: { description: string }
  type: { description: string }
  genres: AnimeGenre[]
  members: Member[]
  age_rating: { label: string }
  publish_day: { description: string }
  updated_at: Date
}

export interface Franchise {
  id: string
  name: string
  name_english: string
  franchise_releases: FranchiseRelease[]
  first_year: number
  last_year: number
  total_duration: string
  total_episodes: number
  total_releases: number
  image: {
    preview: string
  }
}

export interface FranchiseRelease {
  id: string
  sort_order: number
  release_id: number
  release: {
    alias: string
    age_rating: { label: string }
    episodes_total: number
    name: { main: string; english: string }
    season: { description: string }
    type: { description: string }
    year: number
    poster: { optimized: { src: string } }
  }
}

export interface Member {
  id: string
  nickname: string
  role: { description: string }
  user: { avatar: { optimized: { preview: string } } }
}

export interface Schedule {
  new_release_episode_ordinal: 13
  release: Anime
}

export interface ScheduleNow {
  today: Schedule[]
  tomorrow: Schedule[]
  yesterday: Schedule[]
}

export type ScheduleWeek = Schedule[]

export interface Video {
  id: number
  comments: number
  title: string
  url: string
  views: number
  image: {
    optimized: {
      preview: string
    }
  }
}

export interface Genre {
  id: number
  name: string
  total_releases: number
  image: {
    optimized: {
      preview: string
    }
  }
}
