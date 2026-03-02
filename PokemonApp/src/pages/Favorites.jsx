import { useState } from "react";
import PokemonList from "../components/PokemonList";
import { useAppContext } from "../context/AppContext";

function Favorites() {
  const { favorites, removeFavorite, addToTeam } = useAppContext();
  const [teamMessage, setTeamMessage] = useState("");

  const handleAdd = (pokemon) => {
    const res = addToTeam({ id: pokemon.id, name: pokemon.name, sprite: pokemon.sprite });
    if (!res.ok) {
      setTeamMessage(res.reason === "already" ? "Already on team" : "Team full");
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
        onRemove={removeFavorite}
        showAddButton={true}
        onAdd={handleAdd}
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