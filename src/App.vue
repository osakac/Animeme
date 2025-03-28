<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />

    <main class="container pt-5 pb-10 flex-1">
      <router-view></router-view>
    </main>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import TheFooter from './components/Footer/TheFooter.vue'
import TheHeader from './components/Header/TheHeader.vue'

provide('siteUrl', 'https://anilibria.top')
</script>
