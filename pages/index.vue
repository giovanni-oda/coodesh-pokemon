<script setup lang="ts">
// imports
import { useMainStore } from '@/stores/main'
import { usePokemonStore } from '@/stores/pokemon'

// consts
const mainStore = useMainStore()
const pokemonStore = usePokemonStore()

// computed
const loading = computed(() => mainStore.loading)
const pokemons = computed(() => pokemonStore.pokemons)

// hooks
onMounted(async () => {
  if (pokemons.value.length <= 0) {
    await pokemonStore.getPokemons()
    // console.log('fetch pokemons')
  }
})
</script>

<template>
  <div class="container mx-auto p-4 max-w-[860px]">
    <pokemon-search-bar :disabled="loading"></pokemon-search-bar>
    <div class="mt-14 hidden sm:block">
      <h3 class="font-bold">Pokémons</h3>
    </div>
    <div v-if="loading" class="flex justify-center mt-8">
      <app-loader></app-loader>
    </div>
    <div v-else>
      <pokemon-list></pokemon-list>
    </div>
  </div>
</template>

<style scoped></style>
