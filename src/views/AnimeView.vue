<template>
  <AppBreadcrumbs :breadcrumbs-links="breadcrumbs" v-if="display.smAndUp.value" />

  <div v-if="anime">
    <div class="max-w-[950px]">
      <div class="flex items-end gap-10 mb-5">
        <img
          v-if="display.width.value >= 900"
          :src="`${siteUrl}${anime.poster.optimized.src}`"
          :alt="anime.name.main"
          class="max-w-[300px] max-h-[420px] rounded-2xl"
        />

        <div class="flex flex-col gap-3">
          <div>
            <h2 class="text-4xl font-bold text-main-100">{{ anime.name.main }}</h2>
            <span class="text-sm text-main-300">{{ anime.name.english }}</span>
          </div>

          <div class="flex gap-3">
            <v-chip variant="outlined" density="compact" rounded="lg">
              {{ anime.age_rating.label }}
            </v-chip>
            <v-chip variant="outlined" color="green" density="compact" rounded="lg">
              {{ getWeekdayCmp }}
            </v-chip>
          </div>

          <div class="flex flex-col">
            <div v-for="(info, key) in animeInfo" :key="key">
              <span class="text-main-300 mr-1">{{ key }}:</span>
              <InfoDivider v-if="Array.isArray(info)" :data="info" class="text-main-100" />
              <span v-else class="text-main-100">
                {{ info }}
              </span>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <v-btn prepend-icon="fa-solid fa-play" class="text-main-100">Смотреть</v-btn>
            <v-btn
              icon="fa-solid fa-heart"
              size="small"
              :color="isFavourite ? 'red' : ''"
              @click="onChangeFavourite"
              class="text-main-100"
            ></v-btn>
            <v-btn
              append-icon="fa-solid fa-caret-down"
              size="default"
              class="text-main-100"
              :class="{ active: activeAnimeStatus.title }"
            >
              <template #prepend>
                <v-icon
                  :icon="activeAnimeStatus.icon"
                  size="default"
                  class="text-main-100"
                ></v-icon>
              </template>
              {{ activeAnimeStatus.title }}
              <v-menu activator="parent">
                <v-list density="compact" :lines="false" rounded="lg">
                  <v-list-item
                    v-for="(item, index) in animeStatuses"
                    :key="index"
                    :value="index"
                    @click="onChangeAnimeStatus(index)"
                    :class="{ active: activeAnimeStatus.title === item.title }"
                  >
                    <template #prepend>
                      <v-icon
                        :icon="item.icon"
                        size="x-small"
                        class="text-neutral-400"
                        :class="{ 'text-white': activeAnimeStatus.icon === item.icon }"
                      ></v-icon>
                    </template>
                    <v-list-item-title class="text-sm/tight!">
                      {{ item.title }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-btn>
          </div>
        </div>
      </div>

      <p class="text-main-200 mb-5">{{ anime.description }}</p>

      <v-tabs v-model="activeTab" color="red" density="compact">
        <v-tab value="episodes" :ripple="false">Эпизоды</v-tab>
        <v-tab value="franchise" :ripple="false">Связанное</v-tab>
        <v-tab value="commentaries" :ripple="false" disabled>Комментарии</v-tab>
        <v-tab value="releasework" :ripple="false">Работа над релизом</v-tab>
      </v-tabs>
      <v-divider class="mb-5"></v-divider>

      <v-tabs-window v-model="activeTab">
        <v-tabs-window-item value="episodes">
          <AnimeInfoEpisodes :episodes="anime.episodes" :key="activeTab" />
        </v-tabs-window-item>
        <v-tabs-window-item value="franchise">
          <AnimeInfoFranchise :franchise-id="anime.id" />
        </v-tabs-window-item>
        <v-tabs-window-item value="releasework">
          <AnimeInfoMembers :members="anime.members" />
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </div>

  <Teleport to="body" v-if="display.width.value < 900">
    <div class="anime-background" :style="{ top: `${animeContentTop}px` }"></div>
  </Teleport>
</template>

<script setup lang="ts">
import { loadAnimeInfo } from '@/api/anilibria.api'
import AnimeInfoEpisodes from '@/components/AnimeInfo/Episodes/AnimeInfoEpisodes.vue'
import AnimeInfoFranchise from '@/components/AnimeInfo/Franchise/AnimeInfoFranchise.vue'
import AnimeInfoMembers from '@/components/AnimeInfo/Members/AnimeInfoMembers.vue'
import AppBreadcrumbs from '@/components/Breadcrumbs/AppBreadcrumbs.vue'
import InfoDivider from '@/components/InfoDivider/InfoDivider.vue'
import { getTotalWatchTime } from '@/helpers/getTotalWatchTime'
import { getWeekday } from '@/helpers/getWeekday'
import { RouteNames } from '@/router'
import type { Anime } from '@/types/anilibria.types'
import { computed, inject, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'

const route = useRoute()
const siteUrl = inject('siteUrl')

const anime = ref<Anime | null>(null)

const isFavourite = ref(false)
const onChangeFavourite = () => (isFavourite.value = !isFavourite.value)

const breadcrumbs = computed(() => [
  { title: 'Главная страница', to: { name: RouteNames.Home } },
  { title: 'Каталог аниме', to: { name: RouteNames.Catalog } },
  { title: anime.value?.name.main ?? '', to: { name: RouteNames.Home } },
])

const genresCmp = computed(() => anime.value?.genres.map((genre) => genre.name) ?? [])
const getTotalWatchTimeCmp = computed(() => anime.value && getTotalWatchTime(anime.value.episodes))
const animeInfo = computed(() => ({
  Тип: anime.value?.type.description,
  Сезон: anime.value?.season.description,
  Год: anime.value?.year,
  Жанры: genresCmp.value,
  'Всего эпизодов': anime.value?.episodes_total ?? 'Неизвестно',
  'Общее время просмотра': getTotalWatchTimeCmp.value,
}))
const getWeekdayCmp = computed(() => anime.value && getWeekday(anime.value.updated_at))

const animeStatuses = ref([
  { title: 'Запланировано', icon: 'fa-solid fa-calendar' },
  { title: 'Смотрю', icon: 'fa-solid fa-play' },
  { title: 'Просмотрено', icon: 'fa-solid fa-check' },
  { title: 'Отложено', icon: 'fa-solid fa-pause' },
  { title: 'Брошено', icon: 'fa-solid fa-xmark' },
])
const initialAnimeStatus = { title: '', icon: 'fa-solid fa-list-check' }
const activeAnimeStatus = ref(initialAnimeStatus)
const onChangeAnimeStatus = (idx: number) => {
  if (activeAnimeStatus.value === animeStatuses.value[idx]) {
    activeAnimeStatus.value = initialAnimeStatus
    return
  }
  activeAnimeStatus.value = animeStatuses.value[idx]
}

const activeTab = ref('episodes')

const display = useDisplay()
const backgroundUrl = computed(() => `url(${siteUrl}${anime.value?.poster.optimized.src})`)
const animeContentTop = computed(() => {
  if (display.xs.value) return 68
  return 130
})

watchEffect(async () => {
  const data = await loadAnimeInfo(route.params.animeAlias.toString())
  if (data) anime.value = data
})
</script>

<style scoped>
@reference "tailwindcss";

.active {
  background-color: rgb(var(--v-theme-accent));
}

:deep(.v-list-item__spacer) {
  @apply w-3!;
}

.v-slide-group__container {
  @apply overflow-x-hidden;
}

.v-slide-group__content {
  .v-btn {
    @apply rounded-t-2xl!;
  }
}

:deep(.v-tab):hover .v-btn__content {
  color: rgb(var(--v-theme-accent));
}

.anime-background {
  height: 500px;
  position: absolute;
  left: 0;
  right: 0;
  z-index: -1;
  background-image: v-bind(backgroundUrl);
  background-size: cover;
  filter: brightness(0.2);

  &::after {
    content: '';
    width: 100%;
    height: 500px;
    position: absolute;
    background: linear-gradient(180deg, transparent 0, #000 120%, #000);
  }
}
</style>
