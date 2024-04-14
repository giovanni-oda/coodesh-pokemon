<script setup lang="ts">
// imports
import { ref } from 'vue'
import { usePokemonStore } from '@/stores/pokemon'

// consts
const pokemonStore = usePokemonStore()

// state
const searchText: Ref<string> = ref('')
let timer: any = 0

// watchers
watch(searchText, (val) => {
  if (val !== '') searchTimeOut()
  else {
    resetTimer()
    pokemonStore.searchResult = null
  }
})

// Methods
function clearSearch() {
  searchText.value = ''
  pokemonStore.searchResult = null
}
function handleEnterClick() {
  resetTimer()
  pokemonStore.searchPokemon(searchText.value)
}
function searchTimeOut() {
  if (timer) resetTimer()
  timer = setTimeout(() => {
    pokemonStore.searchPokemon(searchText.value)
  }, 1000)
}
function resetTimer() {
  clearTimeout(timer)
  timer = null
}
</script>

<template>
  <div class="mt-2 relative">
    <img
      src="/SearchIcon.svg"
      alt="Search Icon"
      width="18px"
      class="absolute top-5 left-[20px] block sm:hidden"
    />
    <input
      v-model="searchText"
      type="text"
      name="search"
      placeholder="Pesquise por nome ou código"
      class="rounded-full p-4 w-full indent-[30px] border border-[#E1E1E1]"
      @keypress.enter="handleEnterClick()"
    />
    <span
      class="font-bold absolute top-5 right-[35px] cursor-pointer hidden sm:block"
      @click="clearSearch()"
    >
      X
    </span>
  </div>
</template>

<style scoped></style>
