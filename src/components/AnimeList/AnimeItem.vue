<template>
  <v-hover>
    <template #default="{ isHovering, props }">
      <v-card
        v-bind="props"
        :to="{ name: RouteNames.Anime, params: { animeAlias: anime.alias } }"
        :image="siteUrl(anime.poster.optimized.src)"
        v-touch="{
          start: onTouchStart,
          end: onTouchEnd,
        }"
        class="max-w-48 h-72 w-full shrink-0"
      >
        <transition>
          <CardContentAnime v-if="isHovering || isVisible" :anime />
        </transition>
      </v-card>
    </template>
  </v-hover>
</template>

<script setup lang="ts">
import { useTouchVisible } from '@/composables/useTouchVisible'
import { siteUrl } from '@/helpers/siteUrl'
import { RouteNames } from '@/router'
import type { Anime } from '@/types/anilibria.types'
import CardContentAnime from '../CardContent/CardContentAnime.vue'

defineProps<{ anime: Anime }>()

const { isVisible, onTouchStart, onTouchEnd } = useTouchVisible()
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
