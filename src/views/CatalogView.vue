<template>
  <AppBreadcrumbs :breadcrumbs-links="breadcrumbs" />

  <AppSection title="Каталог релизов" subtitle="Самые новые и свежие эпизоды в любимой озвучке">
    <!-- <v-text-field v-model="search" @click:clear="search = ''" placeholder="Поиск..." class="mb-5" /> -->
    <v-text-field
      @input="onChangeSearch($event.target.value)"
      @click:clear="onChangeSearch('')"
      placeholder="Поиск..."
      class="mb-5"
    />

    <div class="flex gap-5">
      <div class="w-full">
        <CatalogList v-if="releases" :releases />
        <div ref="observerTarget"></div>
      </div>
      <CatalogFilter @apply-filter="onApplyFilter" @reset-filter="onResetFilter" />
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

const breadcrumbs = [
  { title: 'Главная страница', to: { name: RouteNames.Home } },
  { title: 'Каталог релизов', to: { name: RouteNames.Home } },
]

const observerTarget = useTemplateRef('observerTarget')

const search = ref('')
const debounceSearch = debounce((value: string) => (search.value = value), 500)
const onChangeSearch = (value: string) => debounceSearch(null, value)

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
