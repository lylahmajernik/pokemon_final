import { useState } from "react";
import TeamSelector from "../components/TeamSelector";
import EnemySearch from "../components/EnemySearch";
import BattleDisplay from "../components/BattleDisplay";
// After code was written, asked AI to format doc logically & label

function Battle() {
  const [enemy, setEnemy] = useState(null);
  const [result, setResult] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  // Select Pokemon + fetch full stats
  const selectPokemon = async (pokemon) => {
    setSelectedPokemon(pokemon);

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
    const data = await res.json();

    setSelectedData({
      height: data.height,
      weight: data.weight,
      baseExperience: data.base_experience,
      level: Math.floor(Math.random() * 50) + 50,
      statsTotal: data.stats.reduce((sum, s) => sum + s.base_stat, 0),
    });

    setResult("");
  };

  // Handle enemy fetch from EnemySearch component
  const handleEnemyFetch = (enemyData) => {
    if (enemyData) {
      setEnemy(enemyData);
      setResult("");
    } else {
      setEnemy(null);
      setResult("Pokemon not found.");
    }
  };

  // Battle logic
  const fight = () => {
    if (!selectedData || !enemy) {
      setResult("Select a Pokemon and an opponent first!");
      return;
    }

    if (selectedData.statsTotal > enemy.statsTotal) {
      setResult(`${selectedPokemon.name.toUpperCase()} wins!`);
    } else {
      setResult(`${enemy.name.toUpperCase()} wins!`);
    }
  };

  return (
    <div className="battle-container">
      <h1>Battle Arena</h1>

      <TeamSelector onPokemonSelect={selectPokemon} />

      <EnemySearch onEnemyFetch={handleEnemyFetch} />

      <BattleDisplay
        selectedPokemon={selectedPokemon}
        selectedData={selectedData}
        enemy={enemy}
        result={result}
        onFight={fight}
      />
    </div>
  );
}

export default Battle;