import { useState } from "react";
import PokemonList from "../components/PokemonList";
import { useAppContext } from "../context/AppContext";
// AI used to help format doccument and add labeling

function Favorites() {
  const { favorites, removeFromFavorites, addToTeam: contextAddToTeam } = useAppContext();
  const [teamMessage, setTeamMessage] = useState("");

  const handleAddToTeam = (pokemon) => {
    const res = contextAddToTeam({ id: pokemon.id, name: pokemon.name, sprite: pokemon.sprite });
    if (!res.ok) {
      if (res.reason === "already") setTeamMessage("Already on team");
      else if (res.reason === "full") setTeamMessage("Team full");
      setTimeout(() => setTeamMessage(""), 2000);
      return;
    }
    setTeamMessage(`${pokemon.name} added to team`);
    setTimeout(() => setTeamMessage(""), 2000);
  };

  return (
    <div>
      <PokemonList
        title="Favorites"
        pokemonList={favorites}
        showRemoveButton={true}
        onRemove={removeFromFavorites}
        showAddButton={true}
        onAdd={handleAddToTeam}
        emptyMessage="No favorite Pokemon yet."
      />
      {teamMessage && (
        <div className="team-message" style={{ textAlign: "center", marginTop: "10px", color: "green" }}>
          {teamMessage}
        </div>
      )}
    </div>
  );
}

export default Favorites;