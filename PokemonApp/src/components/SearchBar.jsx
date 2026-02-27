import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
// AI Used to help with div placement/classnames for css


function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    navigate(`/pokemon-details/${searchInput.toLowerCase()}`);
    setSearchInput("");
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search Pokemon by name or ID..."
      />
      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
