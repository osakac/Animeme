<template>
  <v-sheet class="rounded-xl! overflow-hidden">
    <v-list v-if="releases">
      <template v-for="(anime, index) in releases" :key="anime.id">
        <v-list-item :to="{ name: RouteNames.Anime, params: { animeAlias: anime.alias } }">
          <template #prepend v-if="display.width.value > 600">
            <v-img
              :src="`${siteUrl}${anime.poster.optimized.src}`"
              :alt="anime.name.main"
              cover
              class="w-[180px] h-[260px] rounded-lg mr-5"
            />
          </template>

          <div>
            <div class="mb-2">
              <h3 class="font-bold text-lg/tight">{{ anime.name.main }}</h3>
              <span class="text-secondary-deep text-sm/tight">{{ anime.name.english }}</span>
            </div>

            <div class="flex flex-col text-sm/tight text-secondary-deep mb-2">
              <InfoDivider :data="anime.genres.slice(0, 2).map((genre) => genre.name)" />

              <InfoDivider
                :data="[
                  anime.year.toString(),
                  anime.season.description,
                  anime.type.description,
                  anime.age_rating.label,
                ]"
              />
            </div>

            <p class="text-secondary line-clamp-4">{{ anime.description }}</p>
          </div>
        </v-list-item>
        <v-divider v-if="index !== releases.length - 1" class="my-4" />
      </template>
    </v-list>
  </v-sheet>
</template>

<script setup lang="ts">
import { RouteNames } from '@/router'
import type { Anime } from '@/types/anilibria.types'
import { inject } from 'vue'
import { useDisplay } from 'vuetify'
import InfoDivider from '../InfoDivider/InfoDivider.vue'

defineProps<{ releases: Anime[] | undefined }>()
const siteUrl = inject('siteUrl')

const display = useDisplay()
</script>
