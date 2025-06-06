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
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <main className="bg-gray-900/50 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-800 flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <button
              onClick={handleStartGame}
              className="w-full max-w-xl bg-black hover:bg-gray-800 text-white font-semibold py-6 px-8 text-2xl rounded-2xl transition-all transform hover:scale-[1.03] active:scale-[0.98] shadow-lg font-['Instrument_Serif']"
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