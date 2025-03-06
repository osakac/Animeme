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
      v-if="episodesCmp.length"
      class="list max-h-[420px] grid max-[600px]:grid-cols-1 max-[900px]:grid-cols-2 grid-cols-3 gap-5"
    >
      <AnimeInfoEpisode v-for="episode in episodesCmp" :key="episode.ordinal" :episode />
    </ul>

    <div v-else class="flex items-center justify-center h-[173px]">
      <p class="text-secondary-deep">Ничего не найдено</p>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import type { Episode } from '@/types/anilibria.types'
import { computed, ref } from 'vue'
import AnimeInfoEpisode from './AnimeInfoEpisode.vue'

const props = defineProps<{ episodes: Episode[] }>()

const search = ref('')
const episodesCmp = computed(() => {
  if (search.value && !isNaN(+search.value)) {
    return props.episodes.filter((episode) => episode.ordinal === +search.value)
  }

  return props.episodes.filter((episode) =>
    (episode.name ?? '').toLowerCase().includes(search.value.toLowerCase()),
  )
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
