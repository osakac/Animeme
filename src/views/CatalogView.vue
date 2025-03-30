<template>
  <AppBreadcrumbs :breadcrumbs-links="breadcrumbs" />

  <AppSection title="Каталог релизов" subtitle="Самые новые и свежие эпизоды в любимой озвучке">
    <div class="h-[56px] flex gap-5 mb-5">
      <v-text-field
        @input="onChangeSearch($event.target.value)"
        @click:clear="onChangeSearch('')"
        placeholder="Поиск..."
      />
      <v-btn @click="isFilterOpen = !isFilterOpen" variant="tonal" class="h-full!">
        <v-icon>fa-solid fa-filter</v-icon>
      </v-btn>
    </div>

    <div class="flex gap-5">
      <div class="max-w-[830px] w-full">
        <CatalogList :releases />
        <div ref="observerTarget"></div>

        <v-list v-if="!releases.length">
          <v-list-item v-for="index in 4" :key="index">
            <template #prepend>
              <v-skeleton-loader
                type="image@2"
                class="w-[180px] h-[260px] rounded-lg overflow-hidden"
              />
            </template>

            <div>
              <v-skeleton-loader type="heading, text, paragraph" />
            </div>
          </v-list-item>
        </v-list>
      </div>
      <CatalogFilter
        v-show="isFilterOpen"
        @apply-filter="onApplyFilter"
        @reset-filter="onResetFilter"
        @close-filter="isFilterOpen = false"
      />
    </div>
  </AppSection>

  <div class="fixed bottom-10 right-10" v-show="showScrollButton">
    <v-btn @click="scrollToTop" variant="tonal" icon="fa-solid fa-arrow-up"> </v-btn>
  </div>
</template>

<script setup lang="ts">
import AppBreadcrumbs from '@/components/Breadcrumbs/AppBreadcrumbs.vue'
import CatalogList from '@/components/Catalog/CatalogList.vue'
import CatalogFilter, { type Filter } from '@/components/CatalogFilter/CatalogFilter.vue'
import AppSection from '@/components/Section/AppSection.vue'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import { debounce } from '@/helpers/debounce'
import { RouteNames } from '@/router'
import type { Anime } from '@/types/anilibria.types'
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { useDisplay } from 'vuetify'

const breadcrumbs = [
  { title: 'Главная страница', to: { name: RouteNames.Home } },
  { title: 'Каталог релизов', to: { name: RouteNames.Home } },
]

const observerTarget = useTemplateRef('observerTarget')

const search = ref('')
const debounceSearch = debounce((value: string) => (search.value = value), 500)
const onChangeSearch = (value: string) => debounceSearch(null, value)

const display = useDisplay()
const isFilterOpen = ref(display.width.value > 1024)
const filter = ref<Filter>({
  genres: [],
  types: [],
  statuses: [],
  seasons: [],
  sort: null,
})
const onApplyFilter = (filterValue: Filter) => {
  filter.value = filterValue
}
const onResetFilter = () => {
  filter.value = {
    genres: [],
    types: [],
    statuses: [],
    seasons: [],
    sort: null,
  }
}

const url = computed(() => {
  const searchValue = search.value
  const genres = filter.value.genres.join(',')
  const types = filter.value.types.join(',')
  const statuses = filter.value.statuses.join(',')
  const seasons = filter.value.seasons.join(',')
  const sorting = filter.value.sort ?? ''
  return `/anime/catalog/releases?f[search]=${searchValue}&f[publish_statuses]=${statuses}&f[types]=${types}&f[genres]=${genres}&f[seasons]=${seasons}&f[sorting]=${sorting}`
})

const { data: releases } = useInfiniteScroll<Anime>(url, observerTarget)

const showScrollButton = ref(false)
const checkScroll = () => {
  showScrollButton.value = window.scrollY > 500
}
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>
