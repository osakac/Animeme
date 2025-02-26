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
    genres: Genre[]
  }
  is_ad: boolean
}

export interface Genre {
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
  genres: Genre[]
  age_rating: { label: string }
  updated_at: Date
}
