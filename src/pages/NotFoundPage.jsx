import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

function NotFoundPage() {
  return (
    <motion.div 
      className="detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2>404 - Not Found</h2>
      <p style={{ margin: '20px 0' }}>Whoops! There's no Pokémon here.</p>
      <Link to="/" className="back-link">
        <ArrowLeft size={16} /> Back to list
      </Link>
    </motion.div>
  );
}

export default NotFoundPage;
