import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../config.js";
import { getIdFromUrl, capitalize, getSpriteUrl } from "../utils.js";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(`${API_BASE_URL}/pokemon?limit=20`);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadPokemons(url) {
    if (!url) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      const data = await response.json();
      setPokemons(prev => [...prev, ...data.results]);
      setNextUrl(data.next);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // Only load initial if empty
    if (pokemons.length === 0) {
      loadPokemons(`${API_BASE_URL}/pokemon?limit=20`);
    }
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div>
      {error && <p className="status status-error">Couldn't load the list: {error}</p>}
      
      <motion.ul 
        className="pokemon-list"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {pokemons.map((pokemon, idx) => {
          const id = getIdFromUrl(pokemon.url);
          return (
            <motion.li key={pokemon.name + idx} variants={itemAnim}>
              <Link to={`/pokemon/${pokemon.name}`} className="pokemon-link">
                <span className="pokemon-id">#{id.padStart(3, "0")}</span>
                <img
                  className="pokemon-sprite"
                  src={getSpriteUrl(id)}
                  alt={pokemon.name}
                  loading="lazy"
                />
                <span className="pokemon-name">{capitalize(pokemon.name)}</span>
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>

      {nextUrl && (
        <button 
          className="load-more-btn" 
          onClick={() => loadPokemons(nextUrl)}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load More Pokémon"}
        </button>
      )}
    </div>
  );
}

export default PokemonList;
