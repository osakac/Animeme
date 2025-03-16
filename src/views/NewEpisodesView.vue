<template>
  <AppBreadcrumbs :breadcrumbs-links="breadcrumbsLinks" />

  <AppSection title="Новые эпизоды" subtitle="Самые новые и свежие эпизоды в любимой озвучке">
    <div>
      <v-text-field
        v-model="search"
        @click:clear="search = ''"
        placeholder="Введите название..."
        class="mb-5"
      ></v-text-field>

      <NewEpisodes :episodes="newEpisodes" view="list" />
    </div>
  </AppSection>
</template>

<script setup lang="ts">
import { loadNewEpisodes } from '@/api/anilibria.api'
import AppBreadcrumbs from '@/components/Breadcrumbs/AppBreadcrumbs.vue'
import NewEpisodes from '@/components/NewEpisodes/NewEpisodes.vue'
import AppSection from '@/components/Section/AppSection.vue'
import { useSearch } from '@/composables/useSearch'
import { RouteNames } from '@/router'
import type { Anime } from '@/types/anilibria.types'
import { onMounted, ref, watch } from 'vue'

const breadcrumbsLinks = [
  { title: 'Главная страница', to: { name: RouteNames.Home } },
  { title: 'Последние релизы', to: { name: RouteNames.Home } },
]

const allEpisodes = ref<Anime[] | null>(null)
const newEpisodes = ref<Anime[] | null>(null)

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
