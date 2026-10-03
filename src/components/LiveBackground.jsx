import React from 'react';
import { motion } from 'framer-motion';

function LiveBackground() {
  // Generate random particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${10 + Math.random() * 10}s`,
    size: `${5 + Math.random() * 15}px`,
  }));

  return (
    <div className="live-bg">
      <div className="particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default LiveBackground;
