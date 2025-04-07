<template>
  <header class="sticky top-0 z-10 pb-5 pt-2 bg-header">
    <div class="container relative">
      <div class="flex justify-between">
        <div class="flex items-end gap-7">
          <router-link to="/" class="text-main-100 mr-4">
            <h1 class="title text-4xl">Animeme</h1>
          </router-link>
          <nav v-if="display.width.value >= 800">
            <ul class="flex gap-6 list-none text-main-100">
              <li>
                <router-link :to="{ name: RouteNames.Catalog }" active-class="active">
                  Релизы
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: RouteNames.Schedule }" active-class="active">
                  Расписание
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: RouteNames.Franchises }" active-class="active">
                  Франшизы
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: RouteNames.Genres }" active-class="active">
                  Жанры
                </router-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="flex items-end gap-4 text-main-100">
          <v-btn @click="changeTheme" variant="text" :icon="themeIcon" size="x-small"></v-btn>
          <v-dialog
            v-model="isSearchVisible"
            max-width="700"
            scrim="black"
            opacity="0.7"
            transition="dialog-transition"
          >
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                variant="text"
                size="x-small"
                icon="fa-solid fa-magnifying-glass"
                v-tooltip:bottom="'Поиск'"
                color="text-main"
              ></v-btn>
            </template>
            <TheSearch @close="isSearchVisible = false" />
          </v-dialog>
          <v-btn
            to="/settings"
            variant="text"
            size="x-small"
            icon="fa-solid fa-gear"
            v-tooltip:bottom="'Настройки'"
            color="text-main"
          ></v-btn>
          <v-btn
            to="/profile"
            variant="text"
            size="x-small"
            icon="fa-solid fa-user"
            v-tooltip:bottom="'Профиль'"
            color="text-main"
          ></v-btn>
          <v-btn
            v-if="display.width.value < 800"
            @click="isSidebarVisible = !isSidebarVisible"
            variant="text"
            size="x-small"
            icon="fa-solid fa-bars"
            color="text-main"
          ></v-btn>
        </div>
      </div>
    </div>
  </header>

  <Teleport to="body">
    <TheSidebar v-model="isSidebarVisible" />
  </Teleport>
</template>

<script setup lang="ts">
import { RouteNames } from '@/router'
import { computed, ref } from 'vue'
import { useDisplay, useTheme } from 'vuetify'
import TheSearch from '../Search/TheSearch.vue'
import TheSidebar from '../Sidebar/TheSidebar.vue'

const display = useDisplay()

const isSidebarVisible = ref(false)

const isSearchVisible = ref(false)

const theme = useTheme()
const themeIcon = computed(() =>
  theme.global.current.value.dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon',
)
const changeTheme = () =>
  (theme.global.name.value = theme.global.current.value.dark ? 'customLight' : 'customDark')
</script>

<style scoped>
.title {
  font-family: 'Darumadrop One';
  transition: all 0.4s ease;

  &:hover {
    color: rgb(var(--v-theme-accent));
  }
}

nav {
  a {
    transition: all 0.4s ease;
  }

  a:hover {
    color: rgb(var(--v-theme-accent));
  }
}
.active {
  color: rgb(var(--v-theme-accent));
}

.v-btn:hover {
  background-color: rgb(var(--v-theme-grey-deep), 0.4);
}
</style>
