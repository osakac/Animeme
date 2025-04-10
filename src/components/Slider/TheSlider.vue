<template>
  <v-skeleton-loader v-if="!data" type="image@2" />

  <v-carousel
    v-else
    cycle
    interval="5000"
    height="350"
    hide-delimiter-background
    color="white"
    class="rounded-2xl"
  >
    <v-carousel-item
      v-for="item in data"
      :key="item.id"
      :src="siteUrl(item.image.optimized.preview)"
      :alt="item.release.name.main"
      class="slide"
      cover
    >
      <div class="h-full max-w-2xl xl:max-w-4xl px-10 pb-15 flex flex-col justify-end gap-3">
        <h3 class="text-2xl text-white">{{ item.release.name.main }}</h3>
        <div>
          <div class="flex">
            <InfoDivider
              :data="[
                item.release.year.toString(),
                item.release.season.description,
                pluralizeEpisodes(item.release.episodes_total),
                item.release.age_rating.label,
              ]"
              class="text-grey text-sm"
            />
          </div>
          <div class="flex">
            <InfoDivider
              :data="item.release.genres.map((genre) => genre.name)"
              class="text-grey-deep text-sm"
            />
          </div>
        </div>
        <p
          class="description max-w-[600px] max-h-18 hidden lg:block overflow-y-scroll text-sm text-grey"
        >
          {{ item.description }}
        </p>
        <v-btn
          :to="{ name: RouteNames.Anime, params: { animeAlias: item.release.alias } }"
          variant="tonal"
          density="comfortable"
          class="w-fit text-white"
        >
          <template #prepend>
            <v-icon icon="fa-solid fa-play" size="small"></v-icon>
          </template>
          Смотреть
        </v-btn>
      </div>
    </v-carousel-item>

    <template #prev="{ props }">
      <v-btn
        @click="props.onClick"
        variant="tonal"
        icon="fa-solid fa-arrow-left"
        class="btnPrev"
        :class="props.class"
        :aria-label="props['aria-label']"
      ></v-btn>
    </template>

    <template #next="{ props }">
      <v-btn
        variant="tonal"
        icon="fa-solid fa-arrow-right"
        @click="props.onClick"
        class="btnNext"
        :class="props.class"
        :aria-label="props['aria-label']"
      ></v-btn>
    </template>
  </v-carousel>
</template>

<script setup lang="ts">
import { pluralizeEpisodes } from '@/helpers/pluralize'
import { siteUrl } from '@/helpers/siteUrl'
import { RouteNames } from '@/router'
import type { SliderAnime } from '@/types/anilibria.types'
import InfoDivider from '../InfoDivider/InfoDivider.vue'

defineProps<{ data: SliderAnime[] | null }>()
</script>

<style scoped>
@reference "tailwindcss";

:deep(.slide img) {
  @apply brightness-[0.3];
}

.description::-webkit-scrollbar {
  @apply hidden;
}

.v-btn--icon.v-btn--density-default {
  @apply w-10 h-10;
}

.btnPrev,
.btnNext {
  @apply absolute right-10 bottom-15 rounded-xl text-white;
}

.btnPrev {
  right: calc(40px + (40px + 10px));
}
</style>
