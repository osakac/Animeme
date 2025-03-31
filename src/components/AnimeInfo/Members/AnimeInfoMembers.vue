<template>
  <v-sheet class="overflow-hidden rounded-xl!">
    <v-list class="py-0">
      <v-list-item v-for="member in members" :key="member.id" class="item py-2">
        <template #prepend>
          <img
            v-if="member.user?.avatar.optimized.preview"
            :src="siteUrl(member.user.avatar.optimized.preview)"
            :alt="member.nickname"
            class="w-16 h-16 rounded-xl!"
          />
          <div v-else class="w-16 h-16 flex items-center justify-center">
            <i class="fa-solid fa-user text-3xl"></i>
          </div>
        </template>
        <v-list-item-title>{{ member.nickname }}</v-list-item-title>
        <v-list-item-subtitle class="text-secondary-deep">
          {{ member.role.description }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script setup lang="ts">
import { siteUrl } from '@/helpers/siteUrl'
import type { Member } from '@/types/anilibria.types'

defineProps<{ members: Member[] }>()
</script>

<style scoped>
.item:not(:last-child) {
  border-bottom: 1px solid #cccccc30;
}
</style>
