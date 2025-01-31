import { useState, useEffect, Suspense } from "react"
import Layout from "./components/layout"
import PokemonList from "./components/PokemonList"
import Card from "./components/Card"
import type { Pokemon } from "./types"
import "./App.css"

function App() {
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState<Pokemon | null>(null)

  useEffect(() => {
    const pokemonGuardado = localStorage.getItem("pokemonSeleccionado")
    if (pokemonGuardado) {
      setPokemonSeleccionado(JSON.parse(pokemonGuardado))
    }
  }, [])

  const handleSelectPokemon = (pokemon: Pokemon) => {
    setPokemonSeleccionado(pokemon)
    localStorage.setItem("pokemonSeleccionado", JSON.stringify(pokemon))
  }

  return (
    <Layout>
      <div className="app-container">
        <div className="content-grid">
          {pokemonSeleccionado && (
            <div className="pokemon-detail-column">
              <Suspense fallback={<p>Cargando Pokémon...</p>}>
                <Card pokemon={pokemonSeleccionado} />
              </Suspense>
            </div>
          )}
          <div className="pokemon-list-column">
            <Suspense fallback={<p>Cargando lista de Pokémons...</p>}>
              <PokemonList onSelectPokemon={handleSelectPokemon} />
            </Suspense>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default App

