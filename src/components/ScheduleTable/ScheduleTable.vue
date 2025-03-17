<template>
  <ul class="columns-2 md:columns-3 xl:columns-4">
    <template v-if="!scheduleDay">
      <v-skeleton-loader
        v-for="(_, idx) in 6"
        :key="idx"
        type="image"
        class="mb-5"
      ></v-skeleton-loader>
    </template>

    <ScheduleItem v-else v-for="anime in scheduleDay" :key="anime.release.id" :anime />
  </ul>
</template>

<script setup lang="ts">
import type { Schedule } from '@/types/anilibria.types'
import ScheduleItem from './ScheduleItem.vue'

defineProps<{ scheduleDay: Schedule[] | undefined }>()
</script>
