import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import "./PokemonDetails.css";
import { useAppContext } from "../context/AppContext";
// After code was written, asked AI to format doc logically & label


function PokemonDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    const { favorites, addFavorite, removeFavorite, myTeam, addToTeam, removeFromTeam } = useAppContext();

    // Fetch Pokemon data
    useEffect(() => {
        async function fetchPokemon(pokemonId) {
            setLoading(true);
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId.toLowerCase()}`);
                if (!res.ok) throw new Error("Pokemon not found");
                const data = await res.json();
                setPokemon(data);
            } catch (err) {
                console.error(err);
                setPokemon(null);
            } finally {
                setLoading(false);
            }
        }

        // If no ID, pick random
        if (!id) {
            const randomId = Math.floor(Math.random() * 1010) + 1;
            navigate(`/pokemon-details/${randomId}`, { replace: true });
        } else {
            fetchPokemon(id);
        }
    }, [id, navigate]);

    const toggleFavorite = () => {
        if (!pokemon) return;
        if (favorites.some(fav => fav.id === pokemon.id)) {
            removeFavorite(pokemon.id);
        } else {
            addFavorite({ id: pokemon.id, name: pokemon.name, sprite: pokemon.sprites.front_default });
        }
    };

        const isFavorite = pokemon && favorites.some(fav => fav.id === pokemon.id);
        const [teamMessage, setTeamMessage] = useState("");

        const toggleTeam = () => {
            if (!pokemon) return;
            if (myTeam.some(p => p.id === pokemon.id)) {
                removeFromTeam(pokemon.id);
                setTeamMessage(`${pokemon.name} removed from team`);
            } else {
                const res = addToTeam({ id: pokemon.id, name: pokemon.name, sprite: pokemon.sprites.front_default });
                if (!res.ok) {
                    setTeamMessage(res.reason === "full" ? "Your team can only have 6 Pokemon!" : "Already on team");
                    setTimeout(() => setTeamMessage(""), 2000);
                    return;
                }
                setTeamMessage(`${pokemon.name} added to team`);
            }
            setTimeout(() => setTeamMessage(""), 2000);
        };
    
    return (
        <div className="pokemon-details">
            <SearchBar />

            {loading && <p className="loading">Loading...</p>}
            {!loading && !pokemon && <p className="error-message">Pokemon not found.</p>}
            {!loading && pokemon && (
                <div className="pokemon-info">
                    <h1>{pokemon.name.toUpperCase()}</h1>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <p>Height: {pokemon.height}</p>
                    <p>Weight: {pokemon.weight}</p>
                    <p>Types: {pokemon.types.map(t => t.type.name).join(", ")}</p>
                    <div className="button-group">
                        <button onClick={toggleFavorite}>
                            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                        </button>
                        {/* Used ai to help with random function */}
                        <button onClick={() => {
                            const randomId = Math.floor(Math.random() * 1010) + 1;
                            navigate(`/pokemon-details/${randomId}`);
                        }}>
                            Random Pokemon
                        </button>
                        <button onClick={toggleTeam}>
                            {pokemon &&
                             JSON.parse(localStorage.getItem("myTeam") || "[]").some(p => p.id === pokemon.id)
                               ? "Remove from Team 👥"
                               : "Add to Team 👥"}
                        </button>
                    </div>
                    {teamMessage && <p className={`team-message ${teamMessage.includes("only") ? "error" : ""}`}>{teamMessage}</p>}
                </div>
            )}
        </div>
    );
}

export default PokemonDetails;