<template>
  <v-breadcrumbs :items="breadcrumbsLinks" class="overflow-x-hidden px-0 py-0 mb-5">
    <template #item="{ item, index }">
      <router-link
        :to="item.to!"
        :class="{ disabled: index === breadcrumbsLinks.length - 1 }"
        class="breadcrumb text-nowrap"
      >
        {{ item.title }}
      </router-link>
    </template>

    <template #divider>
      <v-icon icon="fa-solid fa-chevron-right" size="xs-small" class="text-xs"></v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script setup lang="ts">
defineProps<{ breadcrumbsLinks: { title: string; to: string }[] }>()
</script>

<style scoped>
.breadcrumb {
  color: rgb(var(--v-theme-main));

  &:hover {
    color: rgb(var(--v-theme-accent));
  }

  &.disabled {
    @apply pointer-events-none overflow-hidden text-ellipsis;
    color: rgb(var(--v-theme-secondary-deep));
  }
}
</style>
