<template>
  <v-hover>
    <template #default="{ isHovering, props }">
      <v-card
        v-bind="props"
        :to="{ name: RouteNames.Anime, params: { animeAlias: anime.release.alias } }"
        v-touch="{
          start: onTouchStart,
          end: onTouchEnd,
        }"
        class="mb-5"
      >
        <template #image>
          <v-img
            :src="siteUrl(anime.release.poster.optimized.src)"
            cover
            class="darkened-image"
            :class="{ 'is-hovered': isHovering || isVisible }"
          ></v-img>
        </template>

        <CardContentSchedule :release="anime" />
      </v-card>
    </template>
  </v-hover>
</template>

<script setup lang="ts">
import { useTouchVisible } from '@/composables/useTouchVisible'
import { siteUrl } from '@/helpers/siteUrl'
import { RouteNames } from '@/router'
import type { Schedule } from '@/types/anilibria.types'
import CardContentSchedule from '../CardContent/CardContentSchedule.vue'

defineProps<{ anime: Schedule }>()

const { isVisible, onTouchStart, onTouchEnd } = useTouchVisible()
</script>

<style scoped>
.darkened-image {
  filter: brightness(0.06);
  transition: filter 0.3s ease-in-out;
}
.darkened-image.is-hovered {
  filter: brightness(0.2);
}
</style>
