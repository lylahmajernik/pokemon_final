import { Routes, Route } from "react-router-dom";
import Header from "./components/Header"
import PokemonDetails from "./pages/PokemonDetails";
import Favorites from "./pages/Favorites";
import MyTeam from "./pages/MyTeam"
import Battle from "./pages/Battle";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon-details/:id?" element={<PokemonDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/my-team" element={<MyTeam />} />
        <Route path="/battle" element={<Battle />} />
      </Routes>
    </>
  );
}

export default App;