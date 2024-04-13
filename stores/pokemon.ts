export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemon: {
      id: 4,
      name: 'Charmander',
      photoUrl: 'https://placehold.co/70x40',
      types: ['FIRE']
    },
    pokemons: [
      {
        id: 1,
        name: 'Bulbasaur',
        photoUrl: 'https://placehold.co/70x40',
        types: ['GRASS', 'POISON']
      },
      {
        id: 4,
        name: 'Charmander',
        photoUrl: 'https://placehold.co/70x40',
        types: ['FIRE']
      },
      {
        id: 7,
        name: 'Squirtle',
        photoUrl: 'https://placehold.co/70x40',
        types: ['WATER']
      }
    ]
  }),
  getters: {
    //
  },
  actions: {
    //
  }
})
