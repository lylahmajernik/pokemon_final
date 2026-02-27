import { useState } from "react";
import "./EnemySearch.css";
// AI Used to help with div placement/classnames for css

function EnemySearch({ onEnemyFetch }) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`
      );
      if (!res.ok) throw new Error("Not found");

      const data = await res.json();

      onEnemyFetch({
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default,
        height: data.height,
        weight: data.weight,
        baseExperience: data.base_experience,
        level: Math.floor(Math.random() * 50) + 50,
        statsTotal: data.stats.reduce((sum, s) => sum + s.base_stat, 0),
      });

      setSearchInput("");
    } catch {
      onEnemyFetch(null);
    }
  };

  const handleRandomize = () => {
    const randomId = Math.floor(Math.random() * 1010) + 1;
    handleSearch({ preventDefault: () => {}, target: { value: randomId } });
  };

  return (
    <div className="enemy-search">
      <h2>Find an Opponent</h2>
      <form onSubmit={handleSearch} className="enemy-search-form">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by Pokemon name or ID..."
        />
        <button type="submit">
          Search
        </button>
        <button
          type="button"
          onClick={handleRandomize}
          className="random-button"
        >
          Random
        </button>
      </form>
    </div>
  );
}

export default EnemySearch;
