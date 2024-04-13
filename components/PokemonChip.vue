<script setup lang="ts">
// imports
import { useMainStore } from '@/stores/main'

// macros
const props = defineProps<{
  type?: string
}>()

// consts
const mainStore = useMainStore()
</script>

<template>
  <div
    class="pk-chip"
    :style="{
      backgroundColor: mainStore.getChipColor(props.type || 'DEFAULT')
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped></style>
