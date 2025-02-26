<template>
  <header ref="headerRef" class="sticky top-0 z-10 pb-5 pt-2 bg-background-deep">
    <div class="container relative">
      <div class="flex justify-between">
        <div class="flex items-end gap-7">
          <router-link to="/" class="text-main mr-4">
            <h1 class="title text-4xl">Animeme</h1>
          </router-link>
          <transition name="overlay">
            <nav
              v-if="isNavVisible"
              :class="{ sidebar: display.width.value < 900, open: isSidebarVisible }"
            >
              <ul
                v-click-outside="onClickOutside"
                class="flex gap-6 list-none text-main"
                :class="{ sidebarContent: display.width.value < 900 }"
              >
                <li>
                  <router-link to="/">Релизы</router-link>
                </li>
                <li>
                  <router-link to="/">Расписание</router-link>
                </li>
                <li>
                  <router-link to="/">Приложения</router-link>
                </li>
                <li>
                  <router-link to="/">Поддержать проект</router-link>
                </li>
                <template v-if="display.width.value < 900">
                  <li>
                    <router-link to="/">Помощь</router-link>
                  </li>
                  <li>
                    <router-link to="/">Вакансии</router-link>
                  </li>
                  <li>
                    <router-link to="/">О нас</router-link>
                  </li>
                  <li>
                    <router-link to="/">Контакты</router-link>
                  </li>
                </template>
              </ul>
            </nav>
          </transition>
        </div>

        <div class="flex items-end gap-4">
          <v-btn
            variant="text"
            size="x-small"
            icon="fa-solid fa-magnifying-glass"
            v-tooltip:bottom="'Поиск'"
            color="text-main"
          ></v-btn>
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
            v-if="display.width.value < 900"
            @click.stop="isSidebarVisible = !isSidebarVisible"
            variant="text"
            size="x-small"
            icon="fa-solid fa-bars"
            color="text-main"
          ></v-btn>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { useDisplay } from 'vuetify'

const display = useDisplay()

const isSidebarVisible = ref(false)
const isNavVisible = computed(() => {
  if (display.width.value >= 900) return true
  return isSidebarVisible.value
})
const onClickOutside = () => (isSidebarVisible.value = false)

const headerRef = useTemplateRef('headerRef')
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

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.5s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.overlay-enter-active ul,
.overlay-leave-active ul {
  transition: transform 0.5s ease;
}

.overlay-enter-from ul,
.overlay-leave-to ul {
  transform: translateX(100%);
}

.sidebar {
  display: none;
  position: fixed;
  width: 100vw;
  height: 100vh;
  justify-content: flex-end;
  top: 0;
  right: 0;
  background: rgb(0 0 0 / 30%);

  &.open {
    display: flex;
  }
}

.sidebarContent {
  width: 250px;
  height: 100%;
  margin-top: v-bind('headerRef?.clientHeight + "px"');
  display: flex;
  flex-direction: column;
  gap: 0;
  background: black;

  a {
    display: inline-block;
    width: 100%;
    padding: 10px 0 10px 20px;
  }
}
</style>
