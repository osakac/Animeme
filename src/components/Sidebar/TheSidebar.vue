<template>
  <transition name="overlay">
    <div v-if="isVisible" class="overlay">
      <nav v-click-outside="onClickOutside" class="bg-black w-[250px] mt-[68px]!">
        <ul class="list-none">
          <li v-for="link in navLinks" :key="link.title">
            <router-link :to="link.to" @click="isVisible = false" class="block px-5 py-2">
              {{ link.title }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { RouteNames } from '@/router'

const isVisible = defineModel<boolean>()
const onClickOutside = () => (isVisible.value = false)

const navLinks = [
  { title: 'Релизы', to: RouteNames.Catalog },
  { title: 'Расписание', to: RouteNames.Schedule },
  { title: 'Франшизы', to: RouteNames.Franchises },
  { title: 'Жанры', to: RouteNames.Genres },
]
</script>

<style scoped>
@reference "tailwindcss";

.overlay {
  @apply fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-end;
}

a:active {
  color: rgb(var(--v-theme-accent));
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.5s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.overlay-enter-active nav,
.overlay-leave-active nav {
  transition: transform 0.5s ease;
}

.overlay-enter-from nav,
.overlay-leave-to nav {
  transform: translateX(100%);
}
</style>
