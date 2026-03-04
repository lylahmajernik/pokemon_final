import "./BattleDisplay.css";
// AI Used to help with div placement/classnames for css

function BattleDisplay({ selectedPokemon, selectedData, enemy, result, onFight }) {
  return (
    <div className="battle-display">
      <h2>Battle Arena</h2>

      <div className="battle-arena">
        {/* player */}
        <div className="fighter-card">
          {selectedPokemon && selectedData ? (
            <>
              <h3>{selectedPokemon.name.toUpperCase()}</h3>
              <img src={selectedPokemon.sprite} alt={selectedPokemon.name} />
              <p>Level: {selectedData.level}</p>
              <p>Stats Total: {selectedData.statsTotal}</p>
            </>
          ) : (
            <p>Add Pokemon to your team to start</p>
          )}
        </div>

        {/* enemy */}
        <div className="fighter-card">
          {enemy ? (
            <>
              <h3>{enemy.name.toUpperCase()}</h3>
              <img src={enemy.sprite} alt={enemy.name} />
              <p>Level: {enemy.level}</p>
              <p>Stats Total: {enemy.statsTotal}</p>
            </>
          ) : (
            <p>Search for opponent</p>
          )}
        </div>
      </div>

      {/* fight & result */}
      <div className="battle-controls">
        <button
          onClick={onFight}
          className="fight-button"
        >
          Fight!
        </button>

        {result && (
          <div className="battle-result">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}

export default BattleDisplay;
