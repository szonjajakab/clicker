import React from 'react';
import { useGame } from '../contexts/GameContext';

function ScoreCounter() {
  const { score } = useGame();

  return (
    <div className="text-center py-4 md:py-6 bg-black rounded-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
        Sacred Touch
      </h2>
      <div className="mt-2 md:mt-3 bg-black rounded-2xl p-4 shadow-inner">
        <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
          {score.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default ScoreCounter;