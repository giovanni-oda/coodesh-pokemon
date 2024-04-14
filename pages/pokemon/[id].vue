<script setup lang="ts">
// imports
import { useMainStore } from '@/stores/main'
import { usePokemonStore } from '@/stores/pokemon'

// macros
const route = useRoute()

// consts
const id = parseInt(route.params.id + '')
const mainStore = useMainStore()
const pokemonStore = usePokemonStore()

// computed
const loading = computed(() => mainStore.loading)
const pokemon = computed(() => pokemonStore.pokemon)

// hooks
onMounted(async () => {
  if (!pokemonStore.pokemon) await pokemonStore.getPokemon(id)
  if (
    pokemonStore.pokemon &&
    pokemonStore.pokemon.effects &&
    pokemonStore.pokemon.effects.length <= 0
  ) {
    await pokemonStore.getPokemonAbilities(pokemonStore.pokemon!)
  }
})
</script>

<template>
  <div class="container mx-auto mt-8 py-4 max-w-[860px]">
    <div
      v-if="loading || pokemon === null"
      class="flex justify-center mt-8 mb-16"
    >
      <app-loader></app-loader>
    </div>
    <div v-else>
      <div v-if="pokemon === undefined" class="mb-16">
        <app-alert-box>
          <p>Erro! Rota ou código do pokemon inválido!</p>
        </app-alert-box>
      </div>
      <div v-else>
        <pokemon-card :isLarge="true" class="mb-6">
          <template #image>
            <img
              :src="pokemon?.photoUrl"
              :alt="`Pokemon ${
                pokemon && pokemon.name ? pokemon.name : ''
              } image`"
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
              <span class="text-[#616161] font-bold">{{ skill }}</span> -
              <span>{{
                pokemon && pokemon.effects ? pokemon?.effects[index] : ''
              }}</span>
            </div>
          </section>
        </pokemon-card>
      </div>
    </div>
    <div class="text-center font-bold text-water">
      <router-link to="/">Voltar</router-link>
    </div>
  </div>
</template>

<style scoped></style>
