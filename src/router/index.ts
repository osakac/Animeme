import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/anime/:animeAlias',
      name: 'anime',
      component: () => import('@/views/AnimeView.vue'),
    },
    {
      path: '/new-episodes',
      name: 'new-episodes',
      component: () => import('@/views/NewEpisodesView.vue'),
    },
  ],
})

export default router
