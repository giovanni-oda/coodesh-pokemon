interface IState {
  pokemon: IPokemon | null
  pokemons: IPokemon[]
  paginate: IPaginate | null
}

interface IPaginate {
  count: number
  next: string
  previous: string
  urls: Array<string>
}

interface IPokemon {
  id: number
  name: string
  photoUrl: string
  types: Array<string>
  abilities: Array<string>
}

export type { IState, IPaginate, IPokemon }
