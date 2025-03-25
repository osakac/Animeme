import { createRouter, createWebHistory } from 'vue-router'

export enum RouteNames {
  Home = 'home',
  Anime = 'anime',
  NewEpisodes = 'new-episodes',
  Schedule = 'schedule',
  Genres = 'genres',
  Genre = 'genre',
  Franchises = 'franchises',
  Franchise = 'franchise',
  Videos = 'videos',
  Catalog = 'catalog',
  NotFound = 'not-found',
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
      path: '/catalog',
      name: RouteNames.Catalog,
      component: () => import('@/views/CatalogView.vue'),
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
    {
      path: '/franchises',
      name: RouteNames.Franchises,
      component: () => import('@/views/FranchisesView.vue'),
    },
    {
      path: '/franchises/:franchiseId',
      name: RouteNames.Franchise,
      component: () => import('@/views/FranchiseView.vue'),
    },
    {
      path: '/videos',
      name: RouteNames.Videos,
      component: () => import('@/views/VideosView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: RouteNames.NotFound,
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
