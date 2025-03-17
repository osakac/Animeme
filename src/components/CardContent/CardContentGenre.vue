<template>
  <div
    class="h-full pb-2 flex flex-col items-center justify-end bg-gradient-to-t from-black/50 to-black/0"
  >
    <h3 class="font-bold text-lg/tight">{{ genreName }}</h3>
    <span class="text-secondary text-sm/tight">{{ pluralizeReleases(totalReleases) }}</span>
  </div>
</template>

<script setup lang="ts">
import { pluralizeReleases } from '@/helpers/pluralize'

defineProps<{ genreName: string; totalReleases: number }>()
</script>
