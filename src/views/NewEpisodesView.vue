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
import AppBreadcrumbs from '@/components/Breadcrumbs/AppBreadcrumbs.vue'
import NewEpisodes from '@/components/NewEpisodes/NewEpisodes.vue'
import AppSection from '@/components/Section/AppSection.vue'
import { useSearch } from '@/composables/useSearch'
import { useAnimeStore } from '@/stores/anime/anime.store'
import type { Anime } from '@/types/anilibria.types'
import { computed, onBeforeMount, ref, watch } from 'vue'

const animeStore = useAnimeStore()

const breadcrumbsLinks = [
  { title: 'Главная страница', to: '/' },
  { title: 'Последние релизы', to: '' },
]

const allEpisodes = computed(() => animeStore.getNewEpisodesAnime)
const newEpisodes = ref<Anime[]>([])

const { search } = useSearch(onSearch)
function onSearch() {
  if (!search) {
    newEpisodes.value = allEpisodes.value
  } else {
    newEpisodes.value = allEpisodes.value.filter((episode) =>
      episode.name.main.toLowerCase().includes(search.value.toLowerCase()),
    )
  }
}

watch(allEpisodes, () => (newEpisodes.value = allEpisodes.value))
onBeforeMount(async () => {
  await animeStore.getNewEpisodesAnimeAPI()
})
</script>

<style scoped></style>
