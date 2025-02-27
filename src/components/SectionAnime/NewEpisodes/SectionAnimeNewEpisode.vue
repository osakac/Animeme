<template>
  <li
    @mouseenter="isVisibleInfo = true"
    @mouseleave="isVisibleInfo = false"
    @touchstart="showInfo"
    class="max-w-48 max-h-72 relative rounded-2xl overflow-clip shrink-0"
  >
    <router-link :to="{ name: 'anime', params: { animeAlias: anime.alias } }">
      <img
        :src="`${siteUrl}${anime.poster.optimized.src}`"
        :alt="anime.name.main"
        class="w-full h-full"
      />

      <transition name="info">
        <div
          v-if="isVisibleInfo"
          class="absolute top-0 left-0 w-full h-full bg-black/80 py-3 px-3 flex flex-col justify-between items-center"
        >
          <span class="py-1 px-2 text-sm text-white bg-neutral-700/80 rounded-md">
            {{ anime.latest_episode?.ordinal ?? '??' }} эпизод
          </span>

          <h3
            class="title max-h-30 overflow-y-scroll text-base/tight font-bold text-center text-white"
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
                class="text-secondary--static text-xs"
              />
            </div>
            <div class="flex">
              <InfoDivider
                :data="anime.genres.slice(0, 2).map((genre) => genre.name)"
                class="text-secondary-deep--static text-xs"
              />
            </div>
          </div>
        </div>
      </transition>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import InfoDivider from '@/components/InfoDivider/InfoDivider.vue'
import type { Anime } from '@/types/anilibria.types'
import { inject, ref } from 'vue'

defineProps<{ anime: Anime }>()
const siteUrl = inject('siteUrl')

const isVisibleInfo = ref(false)
const showInfo = () => {
  isVisibleInfo.value = !isVisibleInfo.value
  setTimeout(() => (isVisibleInfo.value = false), 3000)
}
</script>

<style scoped>
@reference "tailwindcss";

.title::-webkit-scrollbar {
  display: none;
}

.info-enter-active,
.info-leave-active {
  transition: opacity 0.3s ease;
}

.info-enter-from,
.info-leave-to {
  opacity: 0;
}
</style>
