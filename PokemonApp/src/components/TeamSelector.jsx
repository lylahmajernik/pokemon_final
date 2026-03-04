import { useState } from "react";
import PokemonCard from "./PokemonCard";
import { useAppContext } from "../context/AppContext";
import "./TeamSelector.css";
// AI Used to help with div placement/classnames for css


function TeamSelector({ onPokemonSelect }) {
  const { myTeam: team } = useAppContext();
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (pokemon) => {
    setSelectedId(pokemon.id);
    onPokemonSelect(pokemon);
  };

  if (!team || !team.length) {
    return <p className="team-selector-empty">No Pokemon in your team. Go to My Team to add some!</p>;
  }

  return (
    <div className="team-selector">
      <h2>Your Team (Select One)</h2>
      <div className="team-grid">
        {team.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isSelected={selectedId === pokemon.id}
            onClick={() => handleSelect(pokemon)}
            disableLink={true}
          />
        ))}
      </div>
    </div>
  );
}

export default TeamSelector;
