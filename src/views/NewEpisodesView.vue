<template>
  <AppBreadcrumbs :breadcrumbs-links="breadcrumbs" />

  <AppSection title="Новые эпизоды" subtitle="Самые новые и свежие эпизоды в любимой озвучке">
    <div>
      <v-text-field
        v-model="search"
        @click:clear="search = ''"
        placeholder="Введите название..."
        class="mb-5"
      ></v-text-field>

      <AppList view="list">
        <AnimeList :data="newEpisodes" />
      </AppList>
    </div>
  </AppSection>
</template>

<script setup lang="ts">
import { loadNewEpisodes } from '@/api/anilibria.api'
import AnimeList from '@/components/AnimeList/AnimeList.vue'
import AppList from '@/components/AppList/AppList.vue'
import AppBreadcrumbs from '@/components/Breadcrumbs/AppBreadcrumbs.vue'
import AppSection from '@/components/Section/AppSection.vue'
import { useSearch } from '@/composables/useSearch'
import { RouteNames } from '@/router'
import type { Anime } from '@/types/anilibria.types'
import { onMounted, ref, watch } from 'vue'

const breadcrumbs = [
  { title: 'Главная страница', to: { name: RouteNames.Home } },
  { title: 'Последние релизы', to: { name: RouteNames.Home } },
]

const allEpisodes = ref<Anime[]>([])
const newEpisodes = ref<Anime[]>([])

const { search } = useSearch(onSearch)
function onSearch() {
  if (!search) {
    newEpisodes.value = allEpisodes.value
  } else {
    if (allEpisodes.value)
      newEpisodes.value = allEpisodes.value.filter((episode) =>
        episode.name.main.toLowerCase().includes(search.value.toLowerCase()),
      )
  }
}

watch(allEpisodes, () => (newEpisodes.value = allEpisodes.value))
onMounted(async () => {
  const data = await loadNewEpisodes()
  if (data) allEpisodes.value = data
})
</script>

<style scoped></style>
