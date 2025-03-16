<template>
  <v-hover>
    <template #default="{ isHovering, props }">
      <v-card
        v-bind="props"
        :to="{ name: RouteNames.Anime, params: { animeAlias: anime.alias } }"
        :image="`${siteUrl}${anime.poster.optimized.src}`"
        v-touch="{
          start: onTouchStart,
          end: onTouchEnd,
        }"
        class="max-w-48 h-72 w-full shrink-0 rounded-xl!"
      >
        <transition name="episode-info">
          <CardContentEpisode v-if="isHovering || isVisible" :anime />
        </transition>
      </v-card>
    </template>
  </v-hover>
</template>

<script setup lang="ts">
import { useTouchVisible } from '@/composables/useTouchVisible'
import { RouteNames } from '@/router'
import type { Anime } from '@/types/anilibria.types'
import { inject } from 'vue'
import CardContentEpisode from '../CardContent/CardContentEpisode.vue'

defineProps<{ anime: Anime }>()
const siteUrl = inject('siteUrl')

const { isVisible, onTouchStart, onTouchEnd } = useTouchVisible()
</script>

<style scoped>
.episode-info-enter-active,
.episode-info-leave-active {
  transition: opacity 0.3s ease;
}

.episode-info-enter-from,
.episode-info-leave-to {
  opacity: 0;
}
</style>
