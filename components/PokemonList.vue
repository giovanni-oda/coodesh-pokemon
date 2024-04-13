<script setup lang="ts">
// imports
import { usePokemonStore } from '@/stores/pokemon'

// consts
const pokemonStore = usePokemonStore()
const router = useRouter()

// computed
const pokemons = computed(() => pokemonStore.pokemons)

// methods
function handleCardClick(id: number) {
  // console.log('id', id)
  router.push(`/pokemon/${id}`)
}
</script>

<template>
  <div class="mt-8 grid grid-cols-2 sm:grid-cols-5 sm:gap-4">
    <pokemon-card
      v-for="(pokemon, index) in pokemons"
      :key="`${index}-${pokemon.id}`"
      @click="handleCardClick(pokemon.id)"
      class="cursor-pointer"
    >
      <template #image>
        <img :src="pokemon.photoUrl" :alt="`Pokemon ${pokemon.name} image`" />
      </template>
      <template #default>
        <span class="text-center">{{ pokemon.name }}</span>
        <span class="text-[9px] mt-3">Cod. {{ pokemon.id }}</span>
      </template>
      <template #footer>
        <pokemon-chip
          v-for="(pkType, index) in pokemon.types"
          :key="index"
          :type="pkType"
        >
          {{ pkType }}
        </pokemon-chip>
      </template>
    </pokemon-card>
  </div>
</template>

<style scoped></style>
