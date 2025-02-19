<template>
  <li
    @mouseenter="isVisibleInfo = true"
    @mouseleave="isVisibleInfo = false"
    @touchstart="showInfo"
    class="max-w-48 max-h-72 relative rounded-2xl overflow-clip shrink-0"
  >
    <router-link :to="{ name: 'anime', params: { animeAlias: anime.alias } }">
      <img
        :src="`https://anilibria.top${anime.poster.optimized.src}`"
        :alt="anime.name.main"
        class="w-full h-full"
      />

      <transition name="info">
        <div
          v-if="isVisibleInfo"
          class="absolute top-0 left-0 w-full h-full bg-black/80 py-3! px-3! flex flex-col justify-between items-center"
        >
          <span class="py-1 px-2 text-sm text-white bg-neutral-700/80 rounded-md">
            {{ anime.latest_episode?.ordinal ?? '??' }} эпизод
          </span>

          <h3 class="title max-h-30 overflow-y-scroll text-base/tight font-bold text-center">
            {{ anime.name.main }}
          </h3>

          <div>
            <div class="flex flex-col items-center">
              <div class="flex">
                <span class="anime-info">{{ anime.year }}</span>
                <span class="anime-info">{{ anime.season.description }}</span>
                <span class="anime-info">{{ anime.type.description }}</span>
                <span class="anime-info">{{ anime.age_rating.label }}</span>
              </div>
              <div class="flex">
                <span
                  v-for="genre in anime.genres.slice(0, 2)"
                  :key="genre.id"
                  class="anime-info text-stone-400!"
                >
                  {{ genre.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import type { Anime } from '@/types/anilibria.types'
import { ref } from 'vue'

defineProps<{ anime: Anime }>()

const isVisibleInfo = ref(false)
const showInfo = () => {
  isVisibleInfo.value = !isVisibleInfo.value
  setTimeout(() => (isVisibleInfo.value = false), 3000)
}
</script>

<style scoped>
@reference "tailwindcss";

.info-enter-active,
.info-leave-active {
  transition: opacity 0.3s ease;
}

.info-enter-from,
.info-leave-to {
  opacity: 0;
}

.title::-webkit-scrollbar {
  @apply hidden;
}

.anime-info {
  @apply text-white/80 text-xs/normal;

  &:not(:first-child)::before {
    content: '•';
    @apply mx-[5px];
  }
}
</style>
