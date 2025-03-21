import { createRouter, createWebHistory } from 'vue-router'

export enum RouteNames {
  Home = 'home',
  Anime = 'anime',
  NewEpisodes = 'new-episodes',
  Schedule = 'schedule',
  Genres = 'genres',
  Genre = 'genre',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteNames.Home,
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/anime/:animeAlias',
      name: RouteNames.Anime,
      component: () => import('@/views/AnimeView.vue'),
    },
    {
      path: '/new-episodes',
      name: RouteNames.NewEpisodes,
      component: () => import('@/views/NewEpisodesView.vue'),
    },
    {
      path: '/schedule',
      name: RouteNames.Schedule,
      component: () => import('@/views/ScheduleView.vue'),
    },
    {
      path: '/genres',
      name: RouteNames.Genres,
      component: () => import('@/views/GenresView.vue'),
    },
    {
      path: '/genres/:genreId',
      name: RouteNames.Genre,
      component: () => import('@/views/GenreView.vue'),
    },
  ],
})

export default router
