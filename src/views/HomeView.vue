<template>
  <div class="flex flex-col gap-10">
    <TheSlider :data="sliderData" />

    <AppSection
      :to="RouteNames.NewEpisodes"
      title="Новые эпизоды"
      subtitle="Самые новые и свежие эпизоды в любимой озвучке"
    >
      <AnimeList :data="newEpisodesData" view="linear" />
    </AppSection>

    <AppSection
      :to="RouteNames.Schedule"
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

    <AppSection :to="RouteNames.Genres" title="Жанры" subtitle="Список жанров на любой вкус и цвет">
      <GenresList :genres view="linear" />
    </AppSection>

    <AppSection
      :to="RouteNames.Franchises"
      title="Франшизы"
      subtitle="Самые интересные и захватывающие франшизы в любимой озвучке"
    >
      <FranchisesList :franchises />
    </AppSection>

    <AppSection
      :to="RouteNames.Videos"
      title="Новые видео"
      subtitle="Самые интересные видео ролики от любимой команды"
    >
      <NewVideos :videos="newVideos" />
    </AppSection>
  </div>
</template>

<script setup lang="ts">
import {
  loadFranchises,
  loadGenres,
  loadNewEpisodes,
  loadNewVideos,
  loadSchedule,
  loadSliderData,
} from '@/api/anilibria.api'
import AnimeList from '@/components/AnimeList/AnimeList.vue'
import FranchisesList from '@/components/Franchises/FranchisesList.vue'
import GenresList from '@/components/Genres/GenresList.vue'
import ScheduleTable from '@/components/ScheduleTable/ScheduleTable.vue'
import AppSection from '@/components/Section/AppSection.vue'
import TheSlider from '@/components/Slider/TheSlider.vue'
import NewVideos from '@/components/Videos/NewVideos.vue'
import { RouteNames } from '@/router'
import type {
  Anime,
  Franchise,
  Genre,
  ScheduleNow,
  SliderAnime,
  Video,
} from '@/types/anilibria.types'
import { onMounted, ref } from 'vue'

const sliderData = ref<SliderAnime[] | null>(null)

const newEpisodesData = ref<Anime[]>([])

const schedule = ref<ScheduleNow | null>(null)
const scheduleDay = ref<'today' | 'tomorrow' | 'yesterday'>('today')

const genres = ref<Genre[] | null>(null)

const franchises = ref<Franchise[]>()

const newVideos = ref<Video[]>()

onMounted(async () => {
  const data = await Promise.all([
    loadSliderData(),
    loadNewEpisodes(6),
    loadSchedule('now'),
    loadNewVideos(4),
    loadGenres(6),
    loadFranchises(3),
  ])
  if (data[0]) sliderData.value = data[0]
  if (data[1]) newEpisodesData.value = data[1]
  if (data[2]) schedule.value = data[2]
  if (data[3]) newVideos.value = data[3]
  if (data[4]) genres.value = data[4]
  if (data[5]) franchises.value = data[5]
})
</script>

<style scoped>
@reference "tailwindcss";

.v-btn-group.v-theme--customLight {
  .v-btn {
    background: rgb(var(--v-theme-grey));
  }

  .v-btn--active {
    @apply text-white;
  }
}
</style>
