<template>
  <AppBreadcrumbs :breadcrumbs-links="breadcrumbs" />

  <AppSection
    title="Франшизы"
    subtitle="Самые интересные и захватывающие франшизы в любимой озвучке"
  >
    <v-text-field v-model="search" placeholder="Поиск..." class="mb-5" />

    <FranchisesList :franchises />
  </AppSection>
</template>

<script setup lang="ts">
import { loadFranchises } from '@/api/anilibria.api'
import AppBreadcrumbs from '@/components/Breadcrumbs/AppBreadcrumbs.vue'
import FranchisesList from '@/components/Franchises/FranchisesList.vue'
import AppSection from '@/components/Section/AppSection.vue'
import { useSearch } from '@/composables/useSearch'
import { RouteNames } from '@/router'
import type { Franchise } from '@/types/anilibria.types'
import { onMounted, ref, watchEffect } from 'vue'

const breadcrumbs = [
  { title: 'Главная страница', to: { name: RouteNames.Home } },
  { title: 'Франшизы', to: { name: RouteNames.Home } },
]

const { search } = useSearch(onSearch)
function onSearch() {
  if (!search.value) {
    franchises.value = allFranchises.value
    return
  }

  franchises.value = allFranchises.value?.filter((franchise) =>
    franchise.name.toLowerCase().includes(search.value.toLowerCase()),
  )
}

const franchises = ref<Franchise[]>()
const allFranchises = ref<Franchise[]>()

watchEffect(() => (franchises.value = allFranchises.value))

onMounted(async () => {
  const data = await loadFranchises()
  if (data) allFranchises.value = data
})
</script>
