<template>
  <div class="mb-5">
    <v-text-field
      v-model="search"
      @click:clear="search = ''"
      placeholder="Введите название или номер серии"
      clearable
      hide-details
      class="input"
    ></v-text-field>
  </div>

  <v-sheet class="p-3! rounded-xl!">
    <ul
      v-if="episodesList.length"
      class="list max-h-[540px] grid max-[600px]:grid-cols-1 max-[900px]:grid-cols-2 grid-cols-3 gap-5"
    >
      <AnimeInfoEpisode v-for="episode in episodesList" :key="episode.ordinal" :episode />
    </ul>

    <div v-else class="flex items-center justify-center h-[173px]">
      <p class="text-secondary-deep">Ничего не найдено</p>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import type { Episode } from '@/types/anilibria.types'
import { ref, watch } from 'vue'
import AnimeInfoEpisode from './AnimeInfoEpisode.vue'

const props = defineProps<{ episodes: Episode[] }>()

const episodesList = ref(props.episodes)
const search = ref('')
watch(search, (searchValue) => {
  if (!searchValue) return (episodesList.value = props.episodes)

  if (!isNaN(+search.value)) {
    const episode = props.episodes.filter((episode) => episode.ordinal === +search.value)
    episodesList.value = episode
    return
  }

  const episode = props.episodes.filter((episode) =>
    episode.name?.toLowerCase().includes(search.value.toLowerCase()),
  )
  episodesList.value = episode
})
</script>

<style scoped>
@reference 'tailwindcss';

.list {
  overflow-y: scroll;

  &::-webkit-scrollbar {
    @apply hidden;
  }
}

:deep(.input .v-field__outline::before) {
  @apply border-0;
}
:deep(.input .v-field__outline::after) {
  @apply w-0;
}

:deep(.v-field__overlay) {
  @apply rounded-lg;
}
</style>
