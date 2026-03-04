import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";
// AI Used to help with div placement/classnames for css


function Header() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput) return;
    navigate(`/pokemon-details/${searchInput.toLowerCase()}`);
    setSearchInput("");
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/pokemon-details" className="nav-link">PokemonDetails</Link>
        <Link to="/favorites" className="nav-link">Favorites</Link>
        <Link to="/my-team" className="nav-link">My Team</Link>
        <Link to="/battle" className="nav-link">Battle</Link>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="header-search-form">
          <input
            type="text"
            placeholder="Search Pokemon by name or ID"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <div className="auth-links">
          {isAuthenticated ? (
            <>
              <span className="nav-user">{user?.username}</span>
              <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;