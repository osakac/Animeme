<template>
  <AppBreadcrumbs :breadcrumbs-links="breadcrumbsLinks" />

  <AppSection title="Новые эпизоды" subtitle="Самые новые и свежие эпизоды в любимой озвучке">
    <div>
      <v-text-field v-model="search" placeholder="Введите название..." class="mb-5"></v-text-field>

      <NewEpisodes :episodes="newEpisodes" view="list" />
    </div>
  </AppSection>
</template>

<script setup lang="ts">
import AppBreadcrumbs from '@/components/Breadcrumbs/AppBreadcrumbs.vue'
import NewEpisodes from '@/components/NewEpisodes/NewEpisodes.vue'
import AppSection from '@/components/Section/AppSection.vue'
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

const search = ref('')
watch([allEpisodes, search], ([episodes, search]) => {
  if (!newEpisodes.value.length) newEpisodes.value = episodes
  if (!search) {
    newEpisodes.value = allEpisodes.value
  } else {
    newEpisodes.value = allEpisodes.value.filter((episode) =>
      episode.name.main.toLowerCase().includes(search.toLowerCase()),
    )
  }
})

onBeforeMount(async () => {
  await animeStore.getNewEpisodesAnimeAPI()
})
</script>

<style scoped></style>
