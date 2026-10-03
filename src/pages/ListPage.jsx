import SearchForm from "../components/SearchForm.jsx";
import PokemonList from "../components/PokemonList.jsx";
import { motion } from "framer-motion";

function ListPage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <SearchForm />
      <PokemonList />
    </motion.div>
  );
}

export default ListPage;
