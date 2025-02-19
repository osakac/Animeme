<template>
  <router-link to="/" class="link inline-block mb-5">
    <div class="flex items-center gap-1.5">
      <h2 class="text-2xl">{{ title }}</h2>
      <v-icon icon="fa-solid fa-chevron-right" size="x-small" />
    </div>
    <p class="text-white/50">{{ subtitle }}</p>
  </router-link>

  <component :is="components[props.variant]" :animes="props.animes"></component>
</template>

<script setup lang="ts">
import AnimeListNewEpisodes from './AnimeListNewEpisodes/AnimeListNewEpisodes.vue'
import type { Props } from './types'

const props = defineProps<Props>()

const components = {
  NewEpisodes: AnimeListNewEpisodes,
}
</script>

<style scoped>
.link .v-icon {
  transition: transform 0.3s ease;
}

.link:hover .v-icon {
  transform: translateX(10px);
}
</style>
