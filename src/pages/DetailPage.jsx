import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { API_BASE_URL } from "../config.js";
import { capitalize, typeColors } from "../utils.js";

function DetailPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    async function loadPokemon() {
      setIsLoading(true);
      setError(null);
      setPokemon(null);

      try {
        const response = await fetch(`${API_BASE_URL}/pokemon/${name.toLowerCase()}`);

        if (!response.ok) {
          throw new Error(`No Pokémon named "${name}" — check the spelling.`);
        }

        const data = await response.json();

        if (isCurrent) {
          setPokemon(data);
        }
      } catch (err) {
        if (isCurrent) {
          setError(err.message);
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    loadPokemon();

    return () => {
      isCurrent = false;
    };
  }, [name]);

  if (isLoading) return <p className="status">Loading {name}…</p>;
  if (error) return (
    <div className="detail-page">
      <Link to="/" className="back-link"><ArrowLeft size={16} /> Back to list</Link>
      <p className="status status-error">{error}</p>
    </div>
  );

  const mainType = pokemon.types[0].type.name;
  const bgColor = typeColors[mainType] || '#ccc';

  return (
    <motion.div 
      className="detail-page"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", bounce: 0.4 }}
    >
      <Link to="/" className="back-link">
        <ArrowLeft size={16} /> Back to list
      </Link>
      
      <div 
        style={{ 
          background: `radial-gradient(circle at center, ${bgColor}40 0%, transparent 70%)`,
          borderRadius: '50%',
          padding: '20px'
        }}
      >
        <img
          className="detail-image"
          src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
          alt={pokemon.name}
          width={250}
          height={250}
        />
      </div>
      
      <h2>{capitalize(pokemon.name)} <span style={{color: '#888'}}>#{String(pokemon.id).padStart(3, '0')}</span></h2>
      
      <div style={{ marginBottom: '24px' }}>
        {pokemon.types.map((t) => (
          <span 
            key={t.type.name} 
            className="type-badge"
            style={{ backgroundColor: typeColors[t.type.name] || '#777' }}
          >
            {t.type.name}
          </span>
        ))}
      </div>
      
      <ul className="stat-list">
        {pokemon.stats.map((s) => {
          // Max base stat is ~255
          const percentage = Math.min(100, (s.base_stat / 255) * 100);
          return (
            <li key={s.stat.name} className="stat-item">
              <div className="stat-header">
                <span className="stat-name">{s.stat.name.replace('-', ' ')}</span>
                <span className="stat-value">{s.base_stat}</span>
              </div>
              <div className="stat-bar-bg">
                <motion.div 
                  className="stat-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  style={{ backgroundColor: bgColor }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

export default DetailPage;
