<template>
  <AppBreadcrumbs :breadcrumbs-links="breadcrumbs" />

  <template v-if="franchise">
    <v-sheet class="rounded-xl! overflow-hidden mb-5">
      <v-list>
        <v-list-item>
          <template #prepend>
            <v-img
              :src="siteUrl(franchise.image.preview)"
              cover
              class="w-20 h-20 mr-5 rounded-lg"
            ></v-img>
          </template>

          <v-list-item-title class="text-main-100 font-bold! text-xl! mb-1">
            {{ franchise.name }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-main-200">
            {{ franchise.name_english }}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="text-main-200">
            <InfoDivider
              :data="[
                `${franchise.first_year.toString()} — ${franchise.last_year.toString()}`,
                pluralizeSeasons(franchise.total_releases),
                pluralizeEpisodes(franchise.total_episodes),
                franchise.total_duration,
              ]"
              class="text-xs"
            />
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-sheet>

    <v-sheet class="rounded-xl! overflow-hidden">
      <v-list>
        <v-list-item
          v-for="franchise in franchiseReleases"
          :key="franchise.id"
          :to="{ name: RouteNames.Anime, params: { animeAlias: franchise.release.alias } }"
        >
          <template #prepend>
            <v-img
              :src="siteUrl(franchise.release.poster.optimized.src)"
              :alt="franchise.release.name.main"
              cover
              class="w-20 h-20 rounded-lg mr-5"
            />
          </template>

          <v-list-item-title class="text-main-100 mb-1">
            {{ franchise.release.name.main }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-main-200">
            {{ franchise.release.name.english }}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="text-main-200">
            <InfoDivider
              :data="[
                franchise.release.year.toString(),
                franchise.release.season.description,
                franchise.release.type.description,
                pluralizeEpisodes(franchise.release.episodes_total),
              ]"
              class="text-xs"
            />
          </v-list-item-subtitle>

          <template #append>
            <span class="text-3xl text-main-300">#{{ franchise.sort_order }}</span>
          </template>
        </v-list-item>
      </v-list>
    </v-sheet>
  </template>
</template>

<script setup lang="ts">
import { loadFranchise } from '@/api/anilibria.api'
import AppBreadcrumbs from '@/components/Breadcrumbs/AppBreadcrumbs.vue'
import InfoDivider from '@/components/InfoDivider/InfoDivider.vue'
import { pluralizeEpisodes, pluralizeSeasons } from '@/helpers/pluralize'
import { siteUrl } from '@/helpers/siteUrl'
import { RouteNames } from '@/router'
import type { Franchise } from '@/types/anilibria.types'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbs = computed(() => [
  { title: 'Главная страница', to: { name: RouteNames.Home } },
  { title: 'Франшизы', to: { name: RouteNames.Franchises } },
  { title: franchise.value?.name ?? '', to: { name: RouteNames.Home } },
])

const franchise = ref<Franchise>()
const franchiseReleases = computed(() =>
  franchise.value?.franchise_releases.toSorted((a, b) => a.sort_order - b.sort_order),
)

onMounted(async () => {
  const data = await loadFranchise(route.params.franchiseId.toString())
  if (data) franchise.value = data
})
</script>
