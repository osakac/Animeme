<template>
  <div class="flex flex-col gap-10">
    <TheSlider :data="sliderData" />

    <AppSection
      :to="{ name: RouteNames.NewEpisodes }"
      title="Новые эпизоды"
      subtitle="Самые новые и свежие эпизоды в любимой озвучке"
    >
      <NewEpisodes :episodes="newEpisodesData" view="linear" />
    </AppSection>

    <AppSection
      title="Расписание релизов"
      subtitle="Список релизов, над которыми команда трудится прямо сейчас"
    >
      <template #actions>
        <v-btn-toggle v-model="scheduleDay" color="rgb(var(--v-theme-accent))">
          <v-btn value="yesterday">Вчера</v-btn>
          <v-btn value="today">Сегодня</v-btn>
          <v-btn value="tomorrow">Завтра</v-btn>
        </v-btn-toggle>
      </template>

      <ScheduleTable :schedule-day="schedule?.[scheduleDay]" />
    </AppSection>

    <AppSection title="Новые видео" subtitle="Самые интересные видео ролики от любимой команды">
      <NewVideos :videos="newVideos" />
    </AppSection>
  </div>
</template>

<script setup lang="ts">
import { loadNewEpisodes, loadNewVideos, loadSchedule, loadSliderData } from '@/api/anilibria.api'
import NewEpisodes from '@/components/NewEpisodes/NewEpisodes.vue'
import ScheduleTable from '@/components/ScheduleTable/ScheduleTable.vue'
import AppSection from '@/components/Section/AppSection.vue'
import TheSlider from '@/components/Slider/TheSlider.vue'
import NewVideos from '@/components/Videos/NewVideos.vue'
import { RouteNames } from '@/router'
import type { Anime, ScheduleNow, SliderAnime, Video } from '@/types/anilibria.types'
import { onMounted, ref } from 'vue'

const sliderData = ref<SliderAnime[] | null>(null)

const newEpisodesData = ref<Anime[] | null>(null)

const schedule = ref<ScheduleNow | null>(null)
const scheduleDay = ref<'today' | 'tomorrow' | 'yesterday'>('today')

const newVideos = ref<Video[] | null>(null)

onMounted(async () => {
  const data = await Promise.all([
    loadSliderData(),
    loadNewEpisodes(6),
    loadSchedule('now'),
    loadNewVideos(4),
  ])
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  if (data[0]) sliderData.value = data[0]
  if (data[1]) newEpisodesData.value = data[1]
  if (data[2]) schedule.value = data[2]
  if (data[3]) newVideos.value = data[3]
})
</script>
