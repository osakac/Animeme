<template>
  <header class="sticky top-0 z-10 pb-5 pt-2 bg-background-deep">
    <div class="container relative">
      <div class="flex justify-between">
        <div class="flex items-end gap-7">
          <router-link to="/" class="text-main mr-4">
            <h1 class="title text-4xl">Animeme</h1>
          </router-link>
          <nav v-if="display.width.value >= 800">
            <ul class="flex gap-6 list-none text-main">
              <li>
                <router-link to="/catalog">Релизы</router-link>
              </li>
              <li>
                <router-link to="/schedule">Расписание</router-link>
              </li>
              <li>
                <router-link to="/franchises">Франшизы</router-link>
              </li>
              <li>
                <router-link to="/genres">Жанры</router-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="flex items-end gap-4">
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
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import TheSearch from '../Search/TheSearch.vue'
import TheSidebar from '../Sidebar/TheSidebar.vue'

const display = useDisplay()

const isSidebarVisible = ref(false)

const isSearchVisible = ref(false)
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

.v-btn:hover {
  background-color: rgb(var(--v-theme-secondary-light));
}
</style>
