import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function SearchForm() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const name = query.trim().toLowerCase();

    if (name === "") {
      setError("Type a Pokémon name first.");
      return;
    }

    setError(null);
    navigate(`/pokemon/${name}`);
  }

  return (
    <div className="search">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search a Pokémon by name…"
          className="search-input"
        />
        <button type="submit" className="search-button" title="Search">
          <Search size={20} />
        </button>
      </form>

      {error && <p className="status status-error">{error}</p>}
    </div>
  );
}

export default SearchForm;
