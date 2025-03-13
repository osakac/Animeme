<template>
  <div class="search p-5! rounded-xl!">
    <v-text-field
      v-model="search"
      @click:clear="search = ''"
      placeholder="Введите название аниме..."
    ></v-text-field>

    <v-list v-if="searchList.length" class="mt-5 rounded-xl! max-h-[500px] list">
      <v-list-item
        v-for="item in searchList"
        :key="item.id"
        :to="{ name: 'anime', params: { animeAlias: item.alias } }"
        @click="close"
        class="py-2"
      >
        <template #prepend>
          <img
            :src="`${siteUrl}${item.poster.optimized.src}`"
            alt=""
            class="w-15 h-15 rounded-xl! mr-3"
          />
        </template>
        <v-list-item-title>{{ item.name.main }}</v-list-item-title>
        <v-list-item-subtitle class="text-xs! text-secondary-deep">
          {{ item.name.english }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <InfoDivider
            :data="[item.year.toString(), item.type.description]"
            class="text-xs text-secondary-deep"
          />
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { loadAnimeSearch } from '@/api/anilibria.api'
import { debounce } from '@/helpers/debounce'
import type { Anime } from '@/types/anilibria.types'
import { inject, ref, watch } from 'vue'
import InfoDivider from '../InfoDivider/InfoDivider.vue'

const emit = defineEmits<{ (e: 'close'): void }>()
const siteUrl = inject('siteUrl')

const search = ref('')
const searchList = ref<Anime[]>([])
const onSearch = async () => {
  const data = await loadAnimeSearch(search.value)
  if (data) searchList.value = data
}
const debounceSearch = debounce(onSearch, 500)
const close = () => emit('close')

watch(search, (searchValue) => {
  if (!search.value) {
    searchList.value = []
    return
  }
  debounceSearch(searchValue)
})
</script>

<style scoped>
@reference "tailwindcss";

.search {
  background-color: rgb(var(--v-theme-background));
}

.list::-webkit-scrollbar {
  display: none;
}
</style>
