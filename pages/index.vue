<script setup lang="ts">
// imports
import { useMainStore } from '@/stores/main'
import { usePokemonStore } from '@/stores/pokemon'
import { ref } from 'vue'

// consts
const mainStore = useMainStore()
const pokemonStore = usePokemonStore()
const scrollAnchor = ref()

// computed
const loading = computed(() => mainStore.loading)
const pokemons = computed(() => pokemonStore.pokemons)

// methods
async function getMorePokemons() {
  if (loading.value === false) {
    await pokemonStore.getPokemons()
  }
}

// hooks
onMounted(async () => {
  if (pokemons.value.length <= 0) {
    await pokemonStore.getPokemons()
  }
  const observer = new IntersectionObserver((entries) => {
    let entry = entries[0]
    if (entry.isIntersecting) {
      // console.log('load more')
      getMorePokemons()
    }
  })
  observer.observe(scrollAnchor.value)
})
</script>

<template>
  <div class="container mx-auto p-4 max-w-[860px]">
    <pokemon-search-bar :disabled="loading"></pokemon-search-bar>
    <div class="mt-14 hidden sm:block">
      <h3 class="font-bold">Pokémons</h3>
    </div>
    <div v-if="pokemons.length > 0">
      <app-alert-box
        v-if="
          pokemonStore.searchResult && pokemonStore.searchResult.length <= 0
        "
      >
        <p>Nenhum resultado encontrado!</p>
      </app-alert-box>
      <pokemon-list></pokemon-list>
    </div>
    <div v-if="loading" class="flex justify-center mt-8">
      <app-loader></app-loader>
    </div>
    <div class="flex justify-center my-8">
      <div ref="scrollAnchor"></div>
    </div>
  </div>
</template>

<style scoped></style>
