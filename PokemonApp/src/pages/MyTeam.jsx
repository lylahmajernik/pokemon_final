import { useState, useEffect } from "react";
import PokemonList from "../components/PokemonList";
// After code was written, asked AI to format doc logically & label


function MyTeam() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const savedTeam = JSON.parse(localStorage.getItem("myTeam")) || [];
    setTeam(savedTeam);
  }, []);

  const removeFromTeam = (id) => {
    const updated = team.filter(p => p.id !== id);
    setTeam(updated);
    localStorage.setItem("myTeam", JSON.stringify(updated));
  };

  return (
    <PokemonList
      title="My Team"
      pokemonList={team}
      showRemoveButton={true}
      onRemove={removeFromTeam}
      emptyMessage="No Pokemon in your team yet."
    />
  );
}

export default MyTeam;