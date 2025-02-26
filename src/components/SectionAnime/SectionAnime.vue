<template>
  <div>
    <router-link to="/new-episodes" class="link inline-block mb-5">
      <div class="flex items-center gap-1.5">
        <h2 class="text-2xl text-main">{{ title }}</h2>
        <v-icon icon="fa-solid fa-chevron-right" size="x-small" color="text-main" />
      </div>
      <p class="text-secondary-deep">{{ subtitle }}</p>
    </router-link>

    <component :is="components[variant]" :data="data"></component>
  </div>
</template>

<script setup lang="ts">
import SectionAnimeNewEpisodes from './NewEpisodes/SectionAnimeNewEpisodes.vue'
import type { Props } from './types'

defineProps<Props>()

const components = {
  NewEpisodes: SectionAnimeNewEpisodes,
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
