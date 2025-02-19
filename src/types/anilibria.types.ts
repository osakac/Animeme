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
