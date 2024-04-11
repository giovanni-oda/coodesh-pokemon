<script setup lang="ts">
// imports
import { ref } from 'vue'

// macros
const route = useRoute()

// consts
const id = ref('123')
</script>

<template>
  <div>
    <h1>This is Pokemon ({{ route.params.id }}) detail page</h1>
  </div>
</template>

<style scoped></style>
