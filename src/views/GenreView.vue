<template>
  <AppBreadcrumbs :breadcrumbs-links="breadcrumbs" />

  <AppSection title="Релизы жанра" subtitle="Список релизов выбранного жанра">
    <template v-if="genreInfo">
      <v-sheet class="rounded-xl! overflow-hidden mb-5">
        <v-list>
          <v-list-item>
            <template #prepend>
              <v-img
                :src="`${siteUrl}${genreInfo.image.optimized.preview}`"
                cover
                class="w-20 h-20 mr-5 rounded-lg"
              ></v-img>
            </template>

            <v-list-item-title class="text-xl! font-bold!">{{ genreInfo.name }}</v-list-item-title>
            <v-list-item-subtitle class="text-secondary">
              {{ pluralizeReleases(genreInfo.total_releases) }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-sheet>
    </template>

    <AnimeList :data="releases" view="list" />
    <div ref="observerTarget"></div>
  </AppSection>
</template>

<script setup lang="ts">
import { loadGenre, loadReleasesOfGenre } from '@/api/anilibria.api'
import AnimeList from '@/components/AnimeList/AnimeList.vue'
import AppBreadcrumbs from '@/components/Breadcrumbs/AppBreadcrumbs.vue'
import AppSection from '@/components/Section/AppSection.vue'
import { pluralizeReleases } from '@/helpers/pluralize'
import { RouteNames } from '@/router'
import type { Anime, Genre } from '@/types/anilibria.types'
import { computed, inject, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const siteUrl = inject('siteUrl')

const breadcrumbs = computed(() => [
  { title: 'Главная страница', to: { name: RouteNames.Home } },
  { title: 'Жанры', to: { name: RouteNames.Genres } },
  { title: genreInfo.value?.name ?? '', to: { name: RouteNames.Home } },
])

const genreInfo = ref<Genre>()

const releases = ref<Anime[]>([])
const page = ref(1)
const totalPages = ref()
const loading = ref(false)

const loadData = async () => {
  if (page.value >= totalPages.value || loading.value) return

  loading.value = true
  const releasesData = await loadReleasesOfGenre(+route.params.genreId, page.value)
  if (releasesData) {
    releases.value = [...releases.value, ...releasesData.data]
    page.value++
  }
  loading.value = false
}

let observer: IntersectionObserver
const observerTarget = useTemplateRef('observerTarget')
const initObserver = () => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadData()
      }
    },
    {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    },
  )

  if (observerTarget.value) {
    observer.observe(observerTarget.value)
  }
}

onMounted(async () => {
  const genreId = +route.params.genreId
  const genreData = await loadGenre(genreId)
  if (genreData) genreInfo.value = genreData

  initObserver()
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>
