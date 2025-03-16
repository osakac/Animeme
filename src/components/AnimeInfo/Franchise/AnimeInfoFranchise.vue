<template>
  <v-sheet class="rounded-xl! py-3">
    <template v-if="franchise">
      <v-list-item class="pt-0 pb-3">
        <v-list-item-title>{{ franchise.name }}</v-list-item-title>
        <v-list-item-subtitle class="text-secondary-deep text-xs!">
          {{ franchise.name_english }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <InfoDivider
            :data="[
              `${franchise.first_year.toString()} — ${franchise.last_year.toString()}`,
              pluralizeSeasons(franchise.total_releases),
              pluralizeEpisodes(franchise.total_episodes),
              franchise.total_duration,
            ]"
            class="text-secondary-deep text-xs"
          />
        </v-list-item-subtitle>
      </v-list-item>

      <v-divider></v-divider>

      <v-list class="p-0!" color="red">
        <v-list-item
          v-for="item in franchiseReleases"
          :key="item.id"
          :to="{ name: RouteNames.Anime, params: { animeAlias: item.release.alias } }"
          class="franchise py-2"
        >
          <template #prepend>
            <img
              :src="`${siteUrl}${item.release.poster.optimized.src}`"
              :alt="item.release.name.main"
              class="w-20 h-20 rounded-lg object-cover"
            />
          </template>

          <v-list-item-title>{{ item.release.name.main }}</v-list-item-title>
          <v-list-item-subtitle class="text-secondary-deep text-xs!">
            {{ item.release.name.english }}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="text-secondary-deep text-xs!">
            <InfoDivider
              :data="[
                item.release.year.toString(),
                item.release.season.description,
                item.release.type.description,
                pluralizeEpisodes(item.release.episodes_total),
              ]"
            />
          </v-list-item-subtitle>

          <template #append>
            <span class="text-3xl">#{{ item.sort_order }}</span>
          </template>
        </v-list-item>
      </v-list>
    </template>

    <div v-else class="flex items-center justify-center h-[60px]">
      <span class="text-secondary-deep">Нет связанных аниме</span>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import { loadAnimeFranchise } from '@/api/anilibria.api'
import InfoDivider from '@/components/InfoDivider/InfoDivider.vue'
import { pluralizeEpisodes, pluralizeSeasons } from '@/helpers/pluralize'
import { RouteNames } from '@/router'
import type { Franchise } from '@/types/anilibria.types'
import { computed, inject, onBeforeMount, ref } from 'vue'

const props = defineProps<{ franchiseId: number }>()
const siteUrl = inject('siteUrl')

const franchise = ref<Franchise | null>(null)
const franchiseReleases = computed(() =>
  franchise.value?.franchise_releases.toSorted((a, b) => a.sort_order - b.sort_order),
)

onBeforeMount(async () => {
  const data = await loadAnimeFranchise(props.franchiseId)
  if (data) franchise.value = data
})
</script>
