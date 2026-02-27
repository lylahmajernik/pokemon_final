import { useState, useEffect } from "react";
import PokemonList from "../components/PokemonList";
// AI used to help format doccument and add labeling

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [teamMessage, setTeamMessage] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  const removeFromFavorites = (id) => {
    const updated = favorites.filter((fav) => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const addToTeam = (pokemon) => {
    const currentTeam = JSON.parse(localStorage.getItem("myTeam")) || [];
    if (currentTeam.some((p) => p.id === pokemon.id)) {
      setTeamMessage("Already on team");
      setTimeout(() => setTeamMessage(""), 2000);
      return;
    }
    if (currentTeam.length >= 6) {
      setTeamMessage("Team full");
      setTimeout(() => setTeamMessage(""), 2000);
      return;
    }
    const updatedTeam = [...currentTeam, { id: pokemon.id, name: pokemon.name, sprite: pokemon.sprite }];
    localStorage.setItem("myTeam", JSON.stringify(updatedTeam));
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
        onAdd={addToTeam}
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