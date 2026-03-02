import { Link } from "react-router-dom";
import "./PokemonCard.css";
// AI Used to help with div placement/classnames for css


function PokemonCard({ pokemon, isSelected = false, onClick, showRemoveButton = false, onRemove, showAddButton = false, onAdd, disableLink = false }) {
  const cardContent = (
    <>
      <img
        src={pokemon.sprite}
        alt={pokemon.name}
      />
      <p>{pokemon.name.toUpperCase()}</p>
    </>
  );

// Wanted to reuse this component on all pages, so had AI help me figure out how to disable link
// on the battle page specifically bc it would always link to details page
  const content = disableLink ? (
    <div>{cardContent}</div>
  ) : (
    <Link to={`/pokemon-details/${pokemon.id}`}>{cardContent}</Link>
  );

  return (
    <div
      className={`pokemon-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      {content}
      <div className="card-buttons">
        {showRemoveButton && onRemove && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove(pokemon.id);
            }}
          >
            Remove
          </button>
        )}
        {showAddButton && onAdd && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAdd(pokemon);
            }}
          >
            Add to Team
          </button>
        )}
      </div>
    </div>
  );
}

export default PokemonCard;
