import React from 'react';
import './FloatingShapes.css';

const FloatingShapes = () => {
  return (
    <ul className="floating-shapes">
      {Array.from({ length: 10 }).map((_, i) => (
        <li key={i}>
          <span className="shape">💰</span>
        </li>
      ))}
    </ul>
  );
};

export default FloatingShapes;