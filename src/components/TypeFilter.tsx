// Add type mapping functionality
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

const COLORES_TIPO = {
  normal: "#A8A878",
  fuego: "#EE8130",
  agua: "#6390F0",
  planta: "#7AC74C",
  eléctrico: "#F7D02C",
  hielo: "#98D8D8",
  veneno: "#A33EA1",
  tierra: "#E2BF65",
  psiquico: "#FA92B2",
  bicho: "#A6B91A",
  volador: "#A98FF3",
  lucha: "#C22E28",
  roca: "#B6A136",
  acero: "#B7B7CE",
  fantasma: "#735797",
  dragón: "#6F35FC",
  siniestro: "#705746",
  hada: "#D685AD",
}

type TypeFilterProps = {
  tipoSeleccionado: string
  onTipoSeleccionado: (tipo: string) => void
}

export default function TypeFilter({ tipoSeleccionado, onTipoSeleccionado }: TypeFilterProps) {
  return (
    <div className="type-filter">
      <button
        className={`type-button ${tipoSeleccionado === "todos" ? "selected" : ""}`}
        onClick={() => onTipoSeleccionado("todos")}
      >
        Todos
      </button>
      {Object.entries(COLORES_TIPO).map(([tipo, color]) => (
        <button
          key={tipo}
          className={`type-button ${tipoSeleccionado === tipo ? "selected" : ""}`}
          onClick={() => onTipoSeleccionado(tipo)}
          style={{
            backgroundColor: color,
            color: ["normal", "eléctrico", "hada"].includes(tipo) ? "#000" : "#fff",
          }}
        >
          {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
        </button>
      ))}
      <button
        className={`type-button ${tipoSeleccionado === "especial" ? "selected" : ""}`}
        onClick={() => onTipoSeleccionado("especial")}
        style={{ backgroundColor: "#FFD700", color: "#000" }}
      >
        Especiales
      </button>
    </div>
  )
}

