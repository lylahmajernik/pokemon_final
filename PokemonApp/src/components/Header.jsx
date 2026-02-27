import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
// AI Used to help with div placement/classnames for css


function Header() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

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
      </div>
    </header>
  );
}

export default Header;