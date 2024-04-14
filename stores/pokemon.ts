import type { IState, IPaginate, IPokemon } from '@/types/pokemon'
import { useMainStore } from '@/stores/main'

export const usePokemonStore = defineStore('pokemon', {
  state: (): IState => {
    return {
      pokemon: null,
      pokemons: [],
      paginate: null,
      searchResult: null
    }
  },
  getters: {
    //
  },
  actions: {
    async getPokemons() {
      const mainStore = useMainStore()
      try {
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
                this.pokemons.push(normalizePokemonData(pokemon))
              })
            }
          }
        }
        mainStore.loading = false
      } catch (err) {
        mainStore.loading = false
        console.error(err)
        return err
      }
    },

    async getPokemonAbilities(pokemon: IPokemon) {
      const mainStore = useMainStore()
      try {
        mainStore.loading = true

        const arrPromisses: any[] = []
        if (pokemon.abilities.length > 0) {
          pokemon.abilities.forEach((ability: string) => {
            const resp = $fetch(`/api/ability/${ability.toLowerCase()}`)
            arrPromisses.push(resp)
          })
        }
        const allResp = await Promise.all(arrPromisses)
        // console.log('allResp', allResp)
        const arrEffects: string[] = []
        allResp.forEach((effect: any) => {
          const effectEn = effect.effect_entries.find(
            (entry: any) => entry.language.name === 'en'
          )
          // console.log('effectEn', effectEn)
          const shortEffect = effectEn.short_effect
          arrEffects.push(shortEffect)
        })
        // console.log('arrEffects', arrEffects)
        if (this.pokemon) this.pokemon.effects = arrEffects
        mainStore.loading = false
      } catch (err) {
        mainStore.loading = false
        console.error(err)
        return err
      }
    },

    async getPokemon(id: number) {
      const mainStore = useMainStore()
      try {
        mainStore.loading = true

        const resp = await $fetch(`/api/pokemon/${id}`)
        // console.log('resp', resp)
        this.pokemon = normalizePokemonData(resp)
        mainStore.loading = false
      } catch (err) {
        this.pokemon = undefined
        mainStore.loading = false
        console.error(err)
        return err
      }
    },

    async searchPokemon(searchTerm: string | number) {
      const mainStore = useMainStore()
      const search = searchTerm + ''
      try {
        mainStore.loading = true

        const resp = await $fetch(`/api/pokemon/${search.toLowerCase()}`)
        // console.log('resp', resp)
        this.searchResult = [normalizePokemonData(resp)]
        mainStore.loading = false
      } catch (err) {
        this.searchResult = []
        mainStore.loading = false
        console.error(err)
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

function normalizePokemonData(originalObj: any) {
  const newPokemon: IPokemon = {
    id: originalObj.id,
    name: originalObj.name,
    photoUrl: originalObj.sprites.other['official-artwork'].front_default,
    types: originalObj.types.map((obj: any) => obj.type.name.toUpperCase()),
    abilities: originalObj.abilities.map(
      (obj: any) =>
        obj.ability.name.charAt(0).toUpperCase() + obj.ability.name.slice(1)
    ),
    effects: []
  }
  return newPokemon
}
