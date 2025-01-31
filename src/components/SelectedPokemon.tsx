import type { Pokemon } from "../types"
import Card from "./Card"

interface SelectedPokemonProps {
  pokemon: Pokemon | null
}

export default function SelectedPokemon({ pokemon }: SelectedPokemonProps) {
  if (!pokemon) return null

  return <Card pokemon={pokemon} />
}

