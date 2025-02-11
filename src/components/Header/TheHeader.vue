<template>
  <header ref="headerRef" class="bg-black pb-5 pt-2">
    <div class="container relative">
      <div class="flex justify-between">
        <div class="flex items-end gap-7">
          <router-link to="/" class="mr-4">
            <h1 class="title text-4xl">Animeme</h1>
          </router-link>
          <transition name="overlay">
            <nav
              v-if="isNavVisible"
              :class="{ sidebar: display.width.value < 900, 'sidebar--open': isSidebarVisible }"
            >
              <ul
                v-click-outside="onClickOutside"
                class="flex gap-6 list-none"
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
          ></v-btn>
          <v-btn
            variant="text"
            size="x-small"
            icon="fa-solid fa-gear"
            v-tooltip:bottom="'Настройки'"
          ></v-btn>
          <v-btn
            variant="text"
            size="x-small"
            icon="fa-solid fa-user"
            v-tooltip:bottom="'Профиль'"
          ></v-btn>
          <v-btn
            @click.stop="isSidebarVisible = !isSidebarVisible"
            variant="text"
            size="x-small"
            icon="fa-solid fa-bars"
            v-if="display.width.value < 900"
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

const headerRef = useTemplateRef('headerRef')

const onClickOutside = () => (isSidebarVisible.value = false)
</script>

<style scoped lang="scss">
.title {
  font-family: 'Darumadrop One';
}

a:hover {
  opacity: 0.6;
}

.v-btn:hover {
  background-color: var(--vt-c-black-mute);
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

  &--open {
    display: flex;
  }
}

.sidebarContent {
  width: 250px;
  height: 100%;
  padding-top: v-bind('headerRef?.clientHeight + "px"');
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
