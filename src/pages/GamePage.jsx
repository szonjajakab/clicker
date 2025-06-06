import React from 'react';
import Cookie from '../components/Cookie';
import ScoreCounter from '../components/ScoreCounter';
import { useGame } from '../contexts/GameContext';

function GamePage() {
  const { sessionId } = useGame();
  
  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center py-6 md:py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight font-['Instrument_Serif']">
            Tap the sigil of the sacred deer to awaken the God.
          </h1>
        </header>
        
        <main className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
          <ScoreCounter />
          <Cookie />
        </main>
      </div>
    </div>
  );
}

export default GamePage;