<template>
  <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
    <v-card v-for="video in videos" :key="video.id" @click="openVideo(video.url)">
      <v-img :src="`${siteUrl}${video.image.optimized.preview}`"></v-img>
      <v-card-title class="h-[55px] text-lg/tight! text-ellipsis line-clamp-2! text-wrap mb-1">
        {{ video.title }}
      </v-card-title>
      <v-card-text class="flex items-center gap-3 text-secondary-deep">
        <span class="flex items-center gap-1">
          <v-icon size="x-small" icon="fa-solid fa-comment" />
          {{ video.comments }}
        </span>
        <span class="flex items-center gap-1">
          <v-icon size="x-small" icon="fa-solid fa-eye" />
          {{ video.views }}
        </span>
      </v-card-text>
    </v-card>
  </ul>
</template>

<script setup lang="ts">
import type { Video } from '@/types/anilibria.types'
import { inject } from 'vue'

defineProps<{ videos: Video[] | undefined }>()
const siteUrl = inject('siteUrl')

const openVideo = (url: string) => window.open(url, '_blank')
</script>
