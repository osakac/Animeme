export interface Anime {
  id: string
  description: string
  image: {
    optimized: { preview: string }
  }
  release: {
    name: { main: string }
    poster: {
      optimized: { src: string }
    }
    alias: string
    age_rating: { label: string }
    season: { description: string }
    year: number
    episodes_total: number
    genres: { id: number; name: string }[]
  }
  is_ad: boolean
}
