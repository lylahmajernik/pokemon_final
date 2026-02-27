import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import "./TeamSelector.css";
// AI Used to help with div placement/classnames for css


function TeamSelector({ onPokemonSelect }) {
  const [team, setTeam] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const savedTeam = JSON.parse(localStorage.getItem("myTeam")) || [];
    setTeam(savedTeam);
  }, []);

  const handleSelect = (pokemon) => {
    setSelectedId(pokemon.id);
    onPokemonSelect(pokemon);
  };

  if (!team.length) {
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
