<template>
  <TheHeader />

  <main class="container pt-5 pb-10">
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import TheHeader from './components/Header/TheHeader.vue'
provide('siteUrl', 'https://anilibria.top')
</script>
