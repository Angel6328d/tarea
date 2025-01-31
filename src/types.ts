export interface Pokemon {
  id: number
  name: string
  sprites: {
    front_default: string
  }
  weight: number
  height: number
  types: Array<{
    type: {
      name: string
    }
  }>
  is_legendary?: boolean
  is_mythical?: boolean
}

export type TipoPokemon =
  | "normal"
  | "fuego"
  | "agua"
  | "eléctrico"
  | "planta"
  | "hielo"
  | "lucha"
  | "veneno"
  | "tierra"
  | "volador"
  | "psíquico"
  | "bicho"
  | "roca"
  | "fantasma"
  | "dragón"
  | "siniestro"
  | "acero"
  | "hada"

export interface PokemonsAgrupados {
  [key: string]: Pokemon[]
}

