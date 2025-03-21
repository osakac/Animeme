<template>
  <AppBreadcrumbs :breadcrumbs-links="breadcrumbs" />

  <AppSection title="Новые видео" subtitle="Самые интересные видео ролики от любимой команды">
    <NewVideos :videos />
  </AppSection>
</template>

<script setup lang="ts">
import { loadNewVideos } from '@/api/anilibria.api'
import AppBreadcrumbs from '@/components/Breadcrumbs/AppBreadcrumbs.vue'
import AppSection from '@/components/Section/AppSection.vue'
import NewVideos from '@/components/Videos/NewVideos.vue'
import { RouteNames } from '@/router'
import { onMounted, ref } from 'vue'

const breadcrumbs = [
  { title: 'Главная страница', to: { name: RouteNames.Home } },
  { title: 'Видео', to: { name: RouteNames.Home } },
]

const videos = ref()

onMounted(async () => {
  const data = await loadNewVideos()
  if (data) videos.value = data
})
</script>
