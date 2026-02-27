import PokemonCard from "./PokemonCard";
import "./PokemonList.css";
// AI Used to help with div placement/classnames for css


function PokemonList({ title, pokemonList, showRemoveButton = false, onRemove, showAddButton = false, onAdd, emptyMessage }) {
  if (!pokemonList || pokemonList.length === 0) {
    return <p className="pokemon-list-empty">{emptyMessage || "No Pokemon found."}</p>;
  }

  return (
    <div className="pokemon-list">
      <h1>{title}</h1>
      <div className="pokemon-grid">
        {pokemonList.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            showRemoveButton={showRemoveButton}
            onRemove={onRemove}
            showAddButton={showAddButton}
            onAdd={onAdd}
          />
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
