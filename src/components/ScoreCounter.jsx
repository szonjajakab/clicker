import React from 'react';
import { useGame } from '../contexts/GameContext';

function ScoreCounter() {
  const { score } = useGame();

  return (
    <div className="text-center py-4 md:py-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-amber-800/90 tracking-tight">
        Score
      </h2>
      <div className="mt-2 md:mt-3 bg-white/80 rounded-xl p-4 shadow-inner">
        <p className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
          {score.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default ScoreCounter;