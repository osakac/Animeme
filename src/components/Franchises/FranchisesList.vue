<template>
  <ul class="grid grid-cols-1 auto-rows-fr md:grid-cols-2 min-[1100px]:grid-cols-3! gap-5">
    <v-card
      v-for="franchise in franchises"
      :key="franchise.id"
      :to="{ name: RouteNames.Franchise, params: { franchiseId: franchise.id } }"
      class="max-h-[200px]"
    >
      <div class="h-full grid grid-cols-2">
        <v-img :src="`${siteUrl}${franchise.image.preview}`" cover />
        <div class="px-4 py-3 flex flex-col justify-between gap-5">
          <h3 class="font-bold text-[16px]/tight text-main-100">{{ franchise.name }}</h3>

          <div class="flex flex-col text-xs/normal text-grey-deep">
            <span>{{ franchise.first_year }} — {{ franchise.last_year }}</span>
            <InfoDivider
              :data="[
                pluralizeSeasons(franchise.total_releases),
                pluralizeEpisodes(franchise.total_episodes),
              ]"
            />
            <span>{{ franchise.total_duration }}</span>
          </div>
        </div>
      </div>
    </v-card>
  </ul>
</template>

<script setup lang="ts">
import { pluralizeEpisodes, pluralizeSeasons } from '@/helpers/pluralize'
import { RouteNames } from '@/router'
import type { Franchise } from '@/types/anilibria.types'
import { inject } from 'vue'
import InfoDivider from '../InfoDivider/InfoDivider.vue'

defineProps<{ franchises: Franchise[] | undefined }>()
const siteUrl = inject('siteUrl')
</script>
