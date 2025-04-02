<template>
  <div :class="{ 'side-filter': isMobile }">
    <div
      v-click-outside="onCloseFilter"
      :class="{
        'inner-filter': isMobile,
        'w-[400px]': !isMobile,
      }"
    >
      <v-sheet class="max-w-[400px] w-full mb-3" :class="{ 'rounded-xl!': !isMobile }">
        <AppSection
          title="Жанры"
          subtitle="Укажите жанры, по которым будут отфильтрованы все наши релизы. При выборе нескольких — будет использована комбинация"
          class="px-5 py-3 text-sm"
        >
          <v-autocomplete
            v-model="selectedGenres"
            :items="genres"
            item-title="name"
            item-value="id"
            label="Жанры"
            multiple
            chips
          ></v-autocomplete>
        </AppSection>

        <v-divider class="my-1"></v-divider>

        <AppSection
          title="Тип"
          subtitle="Укажите типы релизов, по которым будут отфильтрованы все релизы"
          class="px-5 py-3 text-sm"
        >
          <div class="flex flex-wrap gap-2">
            <v-btn
              v-for="type in types"
              :key="type.value"
              variant="tonal"
              @click="onChangeType(type)"
              :class="{ 'bg-accent': type.active }"
            >
              {{ type.title }}
            </v-btn>
          </div>
        </AppSection>

        <v-divider class="my-1"></v-divider>

        <AppSection
          title="Статус выхода"
          subtitle="Укажите желаемые статусы выхода релиза, по которым будут отфильтрованы все тайтлы в каталоге"
          class="px-5 py-3 text-sm"
        >
          <div class="flex gap-2">
            <v-btn
              v-for="status in statuses"
              :key="status.value"
              variant="tonal"
              @click="onChangeStatus(status)"
              :class="{ 'bg-accent': status.active }"
            >
              {{ status.title }}
            </v-btn>
          </div>
        </AppSection>

        <v-divider class="my-1"></v-divider>

        <AppSection
          title="Сортировка"
          subtitle="Укажите способ сортировки для отображения всех тайтлов в каталоге"
          class="px-5 py-3 text-sm"
        >
          <v-autocomplete
            v-model="selectedSort"
            :items="sortItems"
            :menu-props="{ closeOnContentClick: true }"
            item-title="info.title"
            item-value="id"
            label="Сортировка"
            chips
          >
            <template #item="{ item }">
              <v-list-item @click="selectedSort = item.raw.id">
                <v-list-item-title class="text-sm!">{{ item.raw.info.title }}</v-list-item-title>
                <v-list-item-subtitle class="text-xs!">
                  {{ item.raw.info.subtitle }}
                </v-list-item-subtitle>
              </v-list-item>
            </template>
          </v-autocomplete>
        </AppSection>

        <v-divider class="my-1"></v-divider>

        <AppSection
          title="Сезоны"
          subtitle="Укажите желаемые сезоны выхода релизов, по которым будут отфильтрованы все тайтлы в каталоге"
          class="px-5 py-3 text-sm"
        >
          <div class="flex flex-wrap gap-2">
            <v-btn
              v-for="season in seasons"
              :key="season.value"
              variant="tonal"
              @click="onChangeSeason(season)"
              :class="{ 'bg-accent': season.active }"
            >
              {{ season.title }}
            </v-btn>
          </div>
        </AppSection>

        <template v-if="isMobile">
          <v-divider class="my-1"></v-divider>

          <div class="flex gap-2 px-5 py-3 pb-5">
            <v-btn color="rgb(var(--v-theme-accent))" class="flex-1" @click="onApplyFilter">
              Применить
            </v-btn>
            <v-btn variant="tonal" class="flex-1" @click="onResetFilter">Сбросить</v-btn>
          </div>
        </template>
      </v-sheet>

      <v-sheet class="rounded-xl! py-2 px-5">
        <div class="flex gap-2">
          <v-btn color="rgb(var(--v-theme-accent))" class="flex-1 apply-btn" @click="onApplyFilter">
            Применить
          </v-btn>
          <v-btn variant="tonal" class="flex-1" @click="onResetFilter">Сбросить</v-btn>
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadGenres } from '@/api/anilibria.api'
import { useFilterField } from '@/composables/useFilterField'
import type { Genre } from '@/types/anilibria.types'
import { computed, onMounted, ref, toRaw, watchEffect } from 'vue'
import { useDisplay } from 'vuetify'
import AppSection from '../Section/AppSection.vue'

const emit = defineEmits<{
  (e: 'applyFilter', filter: Filter): void
  (e: 'resetFilter'): void
  (e: 'closeFilter'): void
}>()

const display = useDisplay()
const isMobile = computed(() => display.width.value < 1024)
const onCloseFilter = (event: Event) => {
  if (!isMobile.value) return

  const target = event.target as HTMLElement
  if (target.closest('.v-autocomplete') || target.closest('.v-menu') || target.closest('button'))
    return

  emit('closeFilter')
}
watchEffect(() => {
  if (isMobile.value) emit('closeFilter')
})

export interface Filter {
  genres: string[]
  types: string[]
  statuses: string[]
  sort: string | null
  seasons: string[]
}

const selectedGenres = ref<string[]>([])
const genres = ref<Genre[]>([])

const types = ref([
  { title: 'ТВ', value: 'TV', active: false },
  { title: 'Фильм', value: 'MOVIE', active: false },
  { title: 'Спешл', value: 'SPECIAL', active: false },
  { title: 'OVA', value: 'OVA', active: false },
  { title: 'WEB', value: 'WEB', active: false },
  { title: 'ONA', value: 'ONA', active: false },
  { title: 'Дорама', value: 'DORAMA', active: false },
  { title: 'OAD', value: 'OAD', active: false },
])
const {
  selectedItems: selectedTypes,
  onChangeField: onChangeType,
  onResetField: resetTypes,
} = useFilterField(types.value)

const statuses = ref([
  { title: 'Онгоинг', value: 'IS_ONGOING', active: false },
  { title: 'Неонгоинг', value: 'IS_NOT_ONGOING', active: false },
])
const {
  selectedItems: selectedStatuses,
  onChangeField: onChangeStatus,
  onResetField: resetStatuses,
} = useFilterField(statuses.value)

const selectedSort = ref<string | null>(null)
const sortItems = ref<{ id: string; info: { title: string; subtitle: string } }[]>([
  {
    id: 'FRESH_AT_DESC',
    info: {
      title: 'Обновлены недавно',
      subtitle: 'Сначала отобразятся самые новые обновленные релизы',
    },
  },
  {
    id: 'FRESH_AT_ASC',
    info: {
      title: 'Обновлены давно',
      subtitle: 'Сначала отобразятся самые старые обновленные релизы',
    },
  },
  {
    id: 'RATING_DESC',
    info: {
      title: 'Самый высокий рейтинг',
      subtitle: 'Сначала отобразятся самые популярные релизы',
    },
  },
  {
    id: 'RATING_ASC',
    info: {
      title: 'Самый низкий рейтинг',
      subtitle: 'Сначала отобразятся самые непопулярные релизы',
    },
  },
  {
    id: 'YEAR_DESC',
    info: { title: 'Самые новые', subtitle: 'Сначала отобразятся самые новые релизы по году' },
  },
  {
    id: 'YEAR_ASC',
    info: { title: 'Самые старые', subtitle: 'Сначала отобразятся самые старые релизы по году' },
  },
])

const seasons = ref([
  { title: 'Зима', value: 'winter', active: false },
  { title: 'Весна', value: 'spring', active: false },
  { title: 'Лето', value: 'summer', active: false },
  { title: 'Осень', value: 'autumn', active: false },
])
const {
  selectedItems: selectedSeasons,
  onChangeField: onChangeSeason,
  onResetField: resetSeasons,
} = useFilterField(seasons.value)

const onApplyFilter = () => {
  emit(
    'applyFilter',
    structuredClone({
      genres: toRaw(selectedGenres.value),
      types: toRaw(selectedTypes.value),
      statuses: toRaw(selectedStatuses.value),
      sort: toRaw(selectedSort.value),
      seasons: toRaw(selectedSeasons.value),
    }),
  )

  if (display.width.value < 1024) emit('closeFilter')
}
const onResetFilter = () => {
  emit('resetFilter')
  selectedGenres.value = []
  selectedSort.value = null
  resetTypes()
  resetStatuses()
  resetSeasons()

  if (display.width.value < 1024) emit('closeFilter')
}

onMounted(async () => {
  const data = await loadGenres()
  if (data) genres.value = data
})
</script>

<style scoped>
@reference "tailwindcss";

.side-filter {
  @apply fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-end mt-[68px];
}

.inner-filter {
  @apply overflow-y-scroll max-w-[300px];
}

.apply-btn {
  @apply text-white;
}
</style>
