<template>
  <div class="wrapper py-7">
    <div class="container flex flex-col md:flex-row justify-between md:items-center">
      <div class="mb-7 md:mb-0">
        <h2 class="title text-4xl mb-3">Animeme</h2>
        <p class="text-secondary-deep">Так звучит аниме!</p>
        <p class="text-secondary-deep">
          Перевод и озвучивание на русский язык аниме-сериалов и не только.
        </p>
        <p class="text-secondary-deep">Спасибо что выбираете нас!</p>
      </div>

      <div>
        <h3 class="mb-2">Навигация</h3>
        <nav class="text-secondary-deep">
          <ul>
            <li>
              <router-link :to="RouteNames.Home">Главная</router-link>
            </li>
            <li>
              <router-link :to="RouteNames.Catalog">Релизы</router-link>
            </li>
            <li>
              <router-link :to="RouteNames.Schedule">Расписание</router-link>
            </li>
            <li>
              <router-link :to="RouteNames.Franchises">Франшизы</router-link>
            </li>
            <li>
              <router-link :to="RouteNames.Genres">Жанры</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouteNames } from '@/router'
</script>

<style scoped>
.wrapper {
  background-color: rgb(33 33 33);
}

.title {
  font-family: 'Darumadrop One';
}

nav a:hover {
  color: rgb(var(--v-theme-accent));
}
</style>
