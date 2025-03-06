<template>
  <li
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @touchstart="showInfo"
    class="max-[600px]:max-h-[200px] rounded-2xl overflow-hidden episode"
    :class="{ 'is-hovered': isHovered }"
  >
    <router-link to="">
      <img
        v-if="episode.preview.optimized.src"
        :src="`${siteUrl}${episode.preview.optimized.src}`"
        :alt="episode.name"
        class="image w-full h-full object-cover"
      />
      <img
        v-else
        src="/no-image.png"
        :alt="episode.name"
        class="image w-full h-full object-cover scale-150"
      />

      <div class="absolute top-0 left-0 w-full h-full p-4! flex flex-col justify-end">
        <h3 class="episode-name text-sm font-bold transition-colors ease-in-out duration-500">
          {{ episode.name }}
        </h3>
        <h3 class="text-white">{{ episode.ordinal }} эпизод</h3>
      </div>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import type { Episode } from '@/types/anilibria.types'
import { inject, ref } from 'vue'

defineProps<{ episode: Episode }>()
const siteUrl = inject('siteUrl')

const isHovered = ref(false)
const showInfo = () => {
  isHovered.value = !isHovered.value
  setTimeout(() => (isHovered.value = false), 3000)
}
</script>

<style scoped>
.episode {
  @apply relative inline-block h-full;
}

.is-hovered .image {
  filter: blur(0) brightness(0.8);
}

.image {
  filter: blur(5px) brightness(0.4);
  transition: filter 0.3s ease-in-out;
}
</style>
