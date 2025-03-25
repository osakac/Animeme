<template>
  <div class="pt-22! md:pt-62! flex flex-col items-center h-screen">
    <h1 class="text-4xl font-bold">404</h1>
    <p class="text-2xl mb-5">Страница не найдена</p>
    <v-btn :to="{ name: RouteNames.Home }" color="rgb(var(--v-theme-accent))">На главную</v-btn>
  </div>
</template>

<script setup lang="ts">
import { RouteNames } from '@/router'
</script>
