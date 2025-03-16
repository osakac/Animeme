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
    </AppSection>
  </div>
</template>

<script setup lang="ts">
import { loadNewEpisodes, loadSliderData } from '@/api/anilibria.api'
import NewEpisodes from '@/components/NewEpisodes/NewEpisodes.vue'
import AppSection from '@/components/Section/AppSection.vue'
import TheSlider from '@/components/Slider/TheSlider.vue'
import { RouteNames } from '@/router'
import type { Anime, SliderAnime } from '@/types/anilibria.types'
import { onMounted, ref } from 'vue'

const sliderData = ref<SliderAnime[] | null>(null)

const newEpisodesData = ref<Anime[] | null>(null)


onMounted(async () => {
  const data = await Promise.all([loadSliderData(), loadNewEpisodes(6)])
  if (data[0]) sliderData.value = data[0]
  if (data[1]) newEpisodesData.value = data[1]
})
</script>
