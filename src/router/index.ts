import { createRouter, createWebHistory } from 'vue-router'

export enum RouteNames {
  Home = 'home',
  Anime = 'anime',
  NewEpisodes = 'new-episodes',
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
  ],
})

export default router
