import type { IState, IPaginate, IPokemon } from '@/types/pokemon'
import { useMainStore } from '@/stores/main'

export const usePokemonStore = defineStore('pokemon', {
  state: (): IState => {
    return {
      pokemon: null,
      pokemons: [],
      paginate: null
    }
  },
  getters: {
    //
  },
  actions: {
    async getPokemons() {
      try {
        const mainStore = useMainStore()

        mainStore.loading = true
        const resp: any = await $fetch('/api/pokemon')
        // console.log('resp', resp)
        if (resp?.results?.length > 0) {
          const newPaginate: IPaginate = {
            count: resp.count,
            next: resp.next,
            previous: resp.previous,
            urls: []
          }
          resp.results.forEach((obj: any) => {
            newPaginate.urls.push(obj.url)
          })
          this.paginate = newPaginate
          // console.log('this.paginate', this.paginate)
          const arrPromisses: any[] = []
          if (newPaginate.urls.length > 0) {
            newPaginate.urls.forEach((url: string) => {
              // console.log(url)
              const resp: any = $fetch(`/api/pokemon/${getId(url)}`)
              arrPromisses.push(resp)
            })
            const allResp = await Promise.all(arrPromisses)
            if (allResp.length > 0) {
              // console.log('allResp', allResp)
              allResp.forEach((pokemon) => {
                // console.log('pokemon', pokemon)
                const newPokemon: IPokemon = {
                  id: pokemon.id,
                  name: pokemon.name,
                  photoUrl:
                    pokemon.sprites.other['official-artwork'].front_default,
                  types: pokemon.types.map((obj: any) =>
                    obj.type.name.toUpperCase()
                  ),
                  abilities: pokemon.abilities.map(
                    (obj: any) =>
                      obj.ability.name.charAt(0).toUpperCase() +
                      obj.ability.name.slice(1)
                  )
                }
                this.pokemons.push(newPokemon)
                // console.log('newPokemon', newPokemon)
              })
            }
          }
        }
        mainStore.loading = false
      } catch (err) {
        return err
      }
    }
  }
})

function getId(url: string) {
  const urlWihoutBar = url.endsWith('/') ? url.slice(0, -1) : url
  const secondLastBar = urlWihoutBar.lastIndexOf('/')
  const id = urlWihoutBar.slice(secondLastBar + 1)
  return id
}
