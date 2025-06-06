import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';

function StartPage() {
  const navigate = useNavigate();
  const { sessionId } = useGame();

  const handleStartGame = () => {
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-md mx-auto">
        <header className="text-center py-6 md:py-8">
          {/* <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white mb-4 font-['Instrument_Serif']">
            Enter the ritual
          </h1> */}
        </header>
        <main className="bg-gray-900/50 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-800 p-6 md:p-8">
          <div className="space-y-8">
            <button
              onClick={handleStartGame}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg font-['Instrument_Serif']"
            >
              Enter the ritual
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default StartPage; 