<template>
  <v-carousel
    v-if="anilibriaStore.sliderAnimes.length"
    interval="5000"
    height="350"
    hide-delimiter-background
    class="rounded-2xl"
  >
    <v-carousel-item
      v-for="item in anilibriaStore.sliderAnimes"
      :key="item.id"
      :src="`${siteUrl}${item.image.optimized.preview}`"
      :alt="item.release.name.main"
      class="slide"
      cover
    >
      <div class="h-full max-w-2xl xl:max-w-4xl px-10 pb-15 flex flex-col justify-end gap-3">
        <h3 class="text-2xl">{{ item.release.name.main }}</h3>
        <div>
          <span class="anime-info">{{ item.release.year }}</span>
          <span class="anime-info">{{ item.release.season.description }}</span>
          <span class="anime-info">{{ item.release.episodes_total }} эпизодов</span>
          <span class="anime-info">{{ item.release.age_rating.label }}</span>
          <div>
            <span
              v-for="genre in item.release.genres"
              :key="genre.id"
              class="anime-info text-white/60!"
            >
              {{ genre.name }}
            </span>
          </div>
        </div>
        <p class="description max-h-15 hidden lg:block overflow-y-scroll text-sm text-white/80">
          {{ item.description }}
        </p>
        <router-link
          :to="{ name: 'anime', params: { animeAlias: item.release.alias } }"
          class="w-fit"
        >
          <v-btn variant="tonal" density="default" prepend-icon="fa-solid fa-play">Смотреть</v-btn>
        </router-link>
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
import { useAnimeStore } from '@/stores/anime/anime.store'
import { onMounted } from 'vue'

const anilibriaStore = useAnimeStore()
import { inject } from 'vue'

onMounted(async () => {
  await anilibriaStore.getSliderAnimes()
})
const siteUrl = inject('siteUrl')
</script>

<style>
@reference "tailwindcss";

.slide img {
  @apply brightness-[0.3];
}

.anime-info {
  @apply text-sm text-white/80;

  &:not(:first-child)::before {
    content: '•';
    @apply mx-[5px];
  }
}

.description::-webkit-scrollbar {
  @apply hidden;
}

.btnPrev,
.btnNext {
  @apply absolute right-10 bottom-15 rounded-xl;
}

.btnPrev {
  right: calc(40px + (48px + 10px));
}
</style>
