<script setup lang="ts">
// imports
import { ref } from 'vue'

// state
const searchText: Ref<string> = ref('')

// Methods
function clearSearch() {
  searchText.value = ''
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
