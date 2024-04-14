<script setup lang="ts">
// imports
import { usePokemonStore } from '@/stores/pokemon'

// macros
const route = useRoute()

// consts
const id = route.params.id
const pokemonStore = usePokemonStore()

// computed
const pokemon = computed(() => pokemonStore.pokemon)
</script>

<template>
  <div class="container mx-auto mt-8 py-4 max-w-[860px]">
    <pokemon-card :isLarge="true" class="mb-6">
      <template #image>
        <img
          :src="pokemon?.photoUrl"
          :alt="`Pokemon ${pokemon?.name} image`"
          class="h-[96px] mt-2"
        />
      </template>
      <template #default>
        <span class="font-bold">{{
          pokemon && pokemon.name
            ? pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1)
            : ''
        }}</span>
      </template>
      <template #footer>
        <pokemon-chip
          v-for="(pkType, index) in pokemon?.types"
          :key="index"
          :type="pkType"
        >
          {{ pkType }}
        </pokemon-chip>
      </template>
    </pokemon-card>
    <pokemon-card :isLarge="true" :hasImage="false" class="mb-16">
      <section>
        <span class="font-bold">Habilidades</span>
      </section>
      <section class="px-2 py-4 text-xs font-normal w-full">
        <div
          v-for="(skill, index) in pokemon?.abilities"
          :key="index"
          class="p-3 border-t"
        >
          <span class="text-[#616161]">{{ skill }}</span>
        </div>
      </section>
    </pokemon-card>
    <div class="text-center font-bold text-water">
      <router-link to="/">Voltar</router-link>
    </div>
  </div>
</template>

<style scoped></style>
