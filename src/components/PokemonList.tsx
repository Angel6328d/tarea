import { useState, useEffect, useRef } from "react"
import type { Pokemon, PokemonsAgrupados } from "../types"
import TypeFilter from "./TypeFilter"

const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=151"

const COLORES_TIPO = {
  normal: "#A8A878",
  fuego: "#EE8130",
  agua: "#6390F0",
  planta: "#78C850",
  eléctrico: "#F8D030",
  hielo: "#98D8D8",
  lucha: "#C03028",
  veneno: "#A040A0",
  tierra: "#E0C068",
  volador: "#A890F0",
  psíquico: "#F85888",
  bicho: "#A8B820",
  roca: "#B8A038",
  fantasma: "#705898",
  dragón: "#7038F8",
  acero: "#B8B8D0",
  siniestro: "#705848",
  hada: "#EE99AC",
}

const TIPO_MAPPING: Record<string, string> = {
  normal: "normal",
  fire: "fuego",
  water: "agua",
  electric: "eléctrico",
  grass: "planta",
  ice: "hielo",
  fighting: "lucha",
  poison: "veneno",
  ground: "tierra",
  flying: "volador",
  psychic: "psíquico",
  bug: "bicho",
  rock: "roca",
  ghost: "fantasma",
  dragon: "dragón",
  dark: "siniestro",
  steel: "acero",
  fairy: "hada",
}

interface PokemonListProps {
  onSelectPokemon: (pokemon: Pokemon) => void
}

export default function PokemonList({ onSelectPokemon }: PokemonListProps) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [tipoSeleccionado, setTipoSeleccionado] = useState("todos")
  const [isLoading, setIsLoading] = useState(true)
  const [pokemonsAgrupados, setPokemonsAgrupados] = useState<PokemonsAgrupados>({})
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(API_URL)
        const data = await response.json()

        const detailedData = await Promise.all(
          data.results.map(async (pokemon: { url: string }) => {
            const res = await fetch(pokemon.url)
            const pokemonData = await res.json()

            const speciesRes = await fetch(pokemonData.species.url)
            const speciesData = await speciesRes.json()

            return {
              ...pokemonData,
              is_legendary: speciesData.is_legendary,
              is_mythical: speciesData.is_mythical,
              types: pokemonData.types.map((t: any) => ({
                type: { name: TIPO_MAPPING[t.type.name] || t.type.name },
              })),
            }
          }),
        )

        setPokemons(detailedData)
        agruparPokemonsPorTipo(detailedData)
        setIsLoading(false)
      } catch (error) {
        console.error("Error al cargar Pokémons:", error)
        setIsLoading(false)
      }
    }

    fetchPokemons()
  }, [])

  const agruparPokemonsPorTipo = (listaPokemon: Pokemon[]) => {
    const agrupados = listaPokemon.reduce((acc: PokemonsAgrupados, pokemon) => {
      pokemon.types.forEach(({ type }) => {
        const tipoTraducido = TIPO_MAPPING[type.name] || type.name
        if (!acc[tipoTraducido]) {
          acc[tipoTraducido] = []
        }
        if (!acc[tipoTraducido].find((p) => p.id === pokemon.id)) {
          acc[tipoTraducido].push(pokemon)
        }
      })
      return acc
    }, {})
    setPokemonsAgrupados(agrupados)
  }

  const getPokemonsFiltrados = () => {
    if (tipoSeleccionado === "todos") {
      return pokemons
    }
    if (tipoSeleccionado === "especial") {
      return pokemons.filter((pokemon) => pokemon.is_legendary || pokemon.is_mythical)
    }
    return pokemonsAgrupados[tipoSeleccionado] || []
  }

  const handlePokemonSelect = (pokemon: Pokemon) => {
    onSelectPokemon(pokemon)
    topRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  if (isLoading) return <p>Cargando Pokémons...</p>

  return (
    <div className="pokemon-section">
      <div ref={topRef} />
      <TypeFilter tipoSeleccionado={tipoSeleccionado} onTipoSeleccionado={setTipoSeleccionado} />
      <div className="pokemon-list">
        {getPokemonsFiltrados().map((pokemon) => (
          <div
            key={pokemon.id}
            className={`pokemon-card ${pokemon.is_legendary || pokemon.is_mythical ? "special" : ""}`}
            onClick={() => handlePokemonSelect(pokemon)}
          >
            <img src={pokemon.sprites.front_default || "/placeholder.svg"} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
            <div className="pokemon-types">
              {pokemon.types.map(({ type }) => (
                <span
                  key={type.name}
                  className="type-badge"
                  style={{
                    backgroundColor: COLORES_TIPO[type.name as keyof typeof COLORES_TIPO],
                  }}
                >
                  {type.name}
                </span>
              ))}
            </div>
            {(pokemon.is_legendary || pokemon.is_mythical) && <span className="special-badge">★</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
