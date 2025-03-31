<template>
  <AppBreadcrumbs :breadcrumbs-links="breadcrumbs" />

  <AppSection title="Релизы жанра" subtitle="Список релизов выбранного жанра">
    <template v-if="genreInfo">
      <v-sheet class="rounded-xl! overflow-hidden mb-5 drop-shadow-xl">
        <v-list>
          <v-list-item>
            <template #prepend>
              <v-img
                :src="siteUrl(genreInfo.image.optimized.preview)"
                cover
                class="w-20 h-20 mr-5 rounded-lg"
              ></v-img>
            </template>

            <v-list-item-title class="text-main-100 text-xl! font-bold!">
              {{ genreInfo.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-main-200">
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
import { loadGenre } from '@/api/anilibria.api'
import AnimeList from '@/components/AnimeList/AnimeList.vue'
import AppBreadcrumbs from '@/components/Breadcrumbs/AppBreadcrumbs.vue'
import AppSection from '@/components/Section/AppSection.vue'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import { pluralizeReleases } from '@/helpers/pluralize'
import { siteUrl } from '@/helpers/siteUrl'
import { RouteNames } from '@/router'
import type { Anime, Genre } from '@/types/anilibria.types'
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbs = computed(() => [
  { title: 'Главная страница', to: { name: RouteNames.Home } },
  { title: 'Жанры', to: { name: RouteNames.Genres } },
  { title: genreInfo.value?.name ?? '', to: { name: RouteNames.Home } },
])

const genreInfo = ref<Genre>()

const observerTarget = useTemplateRef('observerTarget')

const url = computed(() => `/anime/genres/${route.params.genreId}/releases?`)
const { data: releases } = useInfiniteScroll<Anime>(url, observerTarget)

onMounted(async () => {
  const genreId = +route.params.genreId
  const genreData = await loadGenre(genreId)
  if (genreData) genreInfo.value = genreData
})
</script>
