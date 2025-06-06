// src/components/AnimatedStars.tsx
import React, { useEffect, useState } from 'react';

interface StarProps {
  id: number;
  style: React.CSSProperties;
}

const Star: React.FC<StarProps> = ({ style }) => {
  return <div className="star" style={style}></div>;
};

const AnimatedStars: React.FC<{ count?: number }> = ({ count = 70 }) => {
  const [stars, setStars] = useState<StarProps[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: StarProps[] = [];
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2.5 + 0.5; 
        const delay = Math.random() * 6;        
        const duration = Math.random() * 5 + 4; 
        
        newStars.push({
          id: i,
          style: {
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            opacity: Math.random() * 0.3 + 0.2, 
          },
        });
      }
      setStars(newStars);
    };
    
    generateStars();
    
  }, [count]);

  return (
    <div className="hero-pattern-bg" aria-hidden="true">
      {/* The ::before pseudo-element from CSS (in index.css) will create the static dot grid */}
      
      {stars.map(starData => (
        <Star key={starData.id} id={starData.id} style={starData.style} />
      ))}
    </div>
  );
};

export default AnimatedStars;