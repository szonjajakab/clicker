import React from 'react';
import Cookie from '../components/Cookie';
import ScoreCounter from '../components/ScoreCounter';
import { useGame } from '../contexts/GameContext';

function GamePage() {
  const { sessionId, nickname, avatar } = useGame();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center py-6 md:py-8 flex flex-col items-center gap-2 md:gap-3">
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-2">
            {avatar && (
              <img
                src={avatar}
                alt="Avatar"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-amber-400 shadow-sm object-cover bg-white"
                style={{ minWidth: '2.5rem', minHeight: '2.5rem' }}
              />
            )}
            {nickname && (
              <span className="text-lg md:text-xl font-semibold text-amber-800 truncate max-w-xs" title={nickname}>
                {nickname}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-2 tracking-tight">
            Cookie Clicker
          </h1>
          <p className="text-sm text-amber-600/80 font-medium">
            Session ID: {sessionId}
          </p>
        </header>
        
        <main className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
          <ScoreCounter />
          <Cookie />
        </main>
        
        <footer className="text-center text-amber-700/80 text-sm mt-8 font-medium">
          <p className="animate-pulse">Tap the cookie to increase your score!</p>
        </footer>
      </div>
    </div>
  );
}

export default GamePage;