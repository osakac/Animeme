<template>
  <AppBreadcrumbs :breadcrumbs-links="breadcrumbs" />

  <AppSection
    title="Расписание выхода новых эпизодов"
    subtitle="Будьте в курсе последних обновлений и не пропустите ни одного нового эпизода вашего любимого релиза!"
  >
    <v-text-field v-model="search" placeholder="Поиск..." class="mb-5" />

    <v-btn-toggle v-model="day" color="rgb(var(--v-theme-accent))" class="mb-5">
      <v-btn v-for="day in weekDays" :key="day" :value="day">{{ day }}</v-btn>
    </v-btn-toggle>

    <ScheduleTable :schedule-day="selectedSchedule" />
  </AppSection>
</template>

<script setup lang="ts">
import { loadSchedule } from '@/api/anilibria.api'
import AppBreadcrumbs from '@/components/Breadcrumbs/AppBreadcrumbs.vue'
import ScheduleTable from '@/components/ScheduleTable/ScheduleTable.vue'
import AppSection from '@/components/Section/AppSection.vue'
import { useSearch } from '@/composables/useSearch'
import { doScheduleWeek } from '@/helpers/doScheduleWeek'
import { RouteNames } from '@/router'
import type { Schedule } from '@/types/anilibria.types'
import { onMounted, ref, watchEffect } from 'vue'

const breadcrumbs = [
  { title: 'Главная страница', to: { name: RouteNames.Home } },
  { title: 'Расписание релизов' },
]

const weekDays = [
  'Все',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
]

const { search } = useSearch(onSearch)
function onSearch() {
  if (!search.value) {
    selectedSchedule.value = schedule.value?.[day.value]
    return
  }

  selectedSchedule.value = schedule.value?.[day.value].filter((schedule) =>
    schedule.release.name.main.toLowerCase().includes(search.value?.toLowerCase() ?? ''),
  )
}

const date = new Date()
const day = ref(date.toLocaleDateString('ru-RU', { weekday: 'long' }))

const schedule = ref<Record<string, Schedule[]>>()
const selectedSchedule = ref()

watchEffect(() => {
  day.value = day.value.slice(0, 1).toUpperCase() + day.value.slice(1)
  selectedSchedule.value = schedule.value?.[day.value]
})

onMounted(async () => {
  const data = await loadSchedule('week')
  if (data) schedule.value = doScheduleWeek(data)
})
</script>
