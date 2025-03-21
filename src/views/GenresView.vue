<template>
  <AppBreadcrumbs :breadcrumbs-links="breadcrumbs" />

  <AppSection title="Жанры" subtitle="Список жанров на любой вкус и цвет">
    <GenresList :genres view="list" />
  </AppSection>
</template>

<script setup lang="ts">
import { loadGenres } from '@/api/anilibria.api'
import AppBreadcrumbs from '@/components/Breadcrumbs/AppBreadcrumbs.vue'
import GenresList from '@/components/Genres/GenresList.vue'
import AppSection from '@/components/Section/AppSection.vue'
import { RouteNames } from '@/router'
import type { Genre } from '@/types/anilibria.types'
import { onMounted, ref } from 'vue'

const breadcrumbs = [
  { title: 'Главная страница', to: { name: RouteNames.Home } },
  { title: 'Жанры' },
]

const genres = ref<Genre[] | null>(null)

onMounted(async () => {
  const data = await loadGenres()
  if (data) genres.value = data
})
</script>
