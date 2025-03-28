<template>
  <section>
    <div class="wrapper mb-5">
      <component :is="tag" :to class="link" :class="{ disabled: !to }">
        <span class="flex items-center">
          <h2 class="text-2xl text-main-100 mr-2">{{ title }}</h2>
          <v-icon v-if="to" icon="fa-solid fa-chevron-right" size="x-small" color="text-main-100" />
        </span>
        <p class="text-main-300">{{ subtitle }}</p>
      </component>

      <slot name="actions"></slot>
    </div>

    <slot></slot>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Props } from './types'

const props = defineProps<Props>()

const tag = computed(() => (props.to ? 'router-link' : 'div'))
</script>

<style scoped>
@reference 'tailwindcss';

.wrapper {
  @apply flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between;
}

.link .v-icon {
  transition: transform 0.3s ease;
}
.link.disabled {
  pointer-events: none;
}

.link:hover .v-icon {
  transform: translateX(10px);
}
</style>
