<script setup lang="ts">
// imports
import { ref } from 'vue'

// macros
const route = useRoute()

// consts
const id = ref('123')

// state
const pokemon = {
  id: 4,
  name: 'Charmander',
  photoUrl: 'https://placehold.co/185x110',
  types: ['FIRE']
}
const skills = [
  'Verringert allen von Teampartnern Erlitten Schaden a 75%.',
  'Decreases all direct damage taken by friendly Pokémon to 0.75×',
  'Ein Pokémon mit dieser Fähigkeit kann nicht paralysiert werden',
  'Verringert allen von Teampartnern Erlitten Schaden a 75%.'
]
</script>

<template>
  <div class="container mx-auto mt-8 py-4 max-w-[860px]">
    <pokemon-card :isLarge="true" class="mb-6">
      <template #image>
        <img :src="pokemon.photoUrl" :alt="`Pokemon ${pokemon.name} image`" />
      </template>
      <template #default>
        <span class="font-bold">Charmander</span>
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
    <pokemon-card :isLarge="true" :hasImage="false" class="mb-16">
      <section>
        <span class="font-bold">Habilidades</span>
      </section>
      <section class="p-4 font-normal w-full">
        <div
          v-for="(skill, index) in skills"
          :key="index"
          class="py-3 border-t"
        >
          <span>{{ skill }}</span>
        </div>
      </section>
    </pokemon-card>
    <div class="text-center font-bold text-water">
      <router-link to="/">Voltar</router-link>
    </div>
  </div>
</template>

<style scoped></style>
