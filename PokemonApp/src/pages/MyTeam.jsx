import PokemonList from "../components/PokemonList";
import { useAppContext } from "../context/AppContext";

function MyTeam() {
  const { myTeam, removeFromTeam } = useAppContext();

  return (
    <PokemonList
      title="My Team"
      pokemonList={myTeam}
      showRemoveButton={true}
      onRemove={removeFromTeam}
      emptyMessage="No Pokemon in your team yet."
    />
  );
}

export default MyTeam;