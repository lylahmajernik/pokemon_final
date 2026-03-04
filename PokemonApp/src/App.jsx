import { Routes, Route } from "react-router-dom";
import Header from "./components/Header"
import PokemonDetails from "./pages/PokemonDetails";
import Favorites from "./pages/Favorites";
import MyTeam from "./pages/MyTeam"
import Battle from "./pages/Battle";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon-details/:id?" element={<PokemonDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/my-team" element={<ProtectedRoute><MyTeam /></ProtectedRoute>} />
        <Route path="/battle" element={<ProtectedRoute><Battle /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;