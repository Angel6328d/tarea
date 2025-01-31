import type { Pokemon } from "../types"

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

interface CardProps {
  pokemon: Pokemon
}

export default function Card({ pokemon }: CardProps) {
  const isEspecial = pokemon.is_legendary || pokemon.is_mythical

  return (
    <div className={`card ${isEspecial ? "special" : ""}`}>
      <img src={pokemon.sprites.front_default || "/placeholder.svg"} alt={pokemon.name} width={200} height={200} />
      <h2>{pokemon.name}</h2>
      <p>Peso: {pokemon.weight / 10} kg</p>
      <p>Altura: {pokemon.height / 10} m</p>
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
      {isEspecial && (
        <p className="special-text">{pokemon.is_legendary ? "⭐ Pokémon Legendario" : "✨ Pokémon Mítico"}</p>
      )}
    </div>
  )
}

