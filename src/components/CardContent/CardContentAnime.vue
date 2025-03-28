<template>
  <div
    class="h-full bg-black/80 py-3 px-3 flex flex-col items-center"
    :class="{ 'justify-between': anime.latest_episode, 'justify-around': !anime.latest_episode }"
  >
    <span
      v-if="anime.latest_episode"
      class="py-1 px-2 text-sm text-white bg-neutral-700/80 rounded-md"
    >
      {{ anime.latest_episode?.ordinal ?? '??' }} эпизод
    </span>

    <h3
      class="max-h-30 text-base/tight font-bold text-center text-white w-full text-ellipsis line-clamp-6"
    >
      {{ anime.name.main }}
    </h3>

    <div class="flex flex-col items-center">
      <div class="flex">
        <InfoDivider
          :data="[
            anime.year.toString(),
            anime.season.description,
            anime.type.description,
            anime.age_rating.label,
          ]"
          class="text-grey text-xs"
        />
      </div>
      <div class="flex">
        <InfoDivider
          :data="anime.genres.slice(0, 2).map((genre) => genre.name)"
          class="text-grey-deep text-xs"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Anime } from '@/types/anilibria.types'
import InfoDivider from '../InfoDivider/InfoDivider.vue'

defineProps<{ anime: Anime }>()
</script>
