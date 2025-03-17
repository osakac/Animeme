<template>
  <div class="px-4 py-2 flex flex-col gap-1">
    <h3 class="font-bold text-base/tight text-white">{{ release.release.name.main }}</h3>
    <span class="text-sm text-secondary--static">
      Эпизод {{ release.new_release_episode_ordinal ?? '??' }}
    </span>
    <div class="flex flex-col text-secondary-deep--static text-xs">
      <InfoDivider
        :data="[
          release.release.year.toString(),
          release.release.season.description,
          release.release.type.description,
          release.release.age_rating.label,
        ]"
      />
      <InfoDivider :data="release.release.genres.slice(0, 3).map((genre) => genre.name)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Schedule } from '@/types/anilibria.types'
import InfoDivider from '../InfoDivider/InfoDivider.vue'

defineProps<{ release: Schedule }>()
</script>
