<script setup lang="ts">
// macros
const props = defineProps(['error'])
</script>

<template>
  <div>
    <app-header></app-header>
    <div class="container p-4 mx-auto mt-16">
      <div class="flex justify-center">
        <div
          class="bg-white rounded-lg shadow-md p-8 text-center min-w-[350px]"
        >
          <h1 class="mt-4 text-6xl font-black">{{ props.error.statusCode }}</h1>
          <h2 class="mt-4 text-4xl">Oooops.</h2>
          <h2 class="mt-7 text-2xl mb-8">{{ props.error.message }}</h2>
          <NuxtLink to="/" class="font-bold text-water">Go back home</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
