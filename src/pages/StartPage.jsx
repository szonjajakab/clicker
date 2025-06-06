import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';

function StartPage() {
  const navigate = useNavigate();
  const { setNickname } = useGame();
  const [selectedNickname, setSelectedNickname] = useState('');
  const [error, setError] = useState('');

  const handleStartGame = (e) => {
    e.preventDefault();
    if (!selectedNickname.trim()) {
      setError('Please enter a nickname');
      return;
    }
    setNickname(selectedNickname.trim());
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 p-4 md:p-8">
      <div className="max-w-md mx-auto">
        <header className="text-center py-6 md:py-8">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500 mb-4">
            Cookie Clicker
          </h1>
          <p className="mt-4 text-lg font-medium text-gray-300">
            Start your cookie clicking adventure!
          </p>
        </header>

        <main className="bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700 p-6 md:p-8">
          <form onSubmit={handleStartGame} className="space-y-8">
            <div>
              <label htmlFor="nickname" className="block text-lg font-medium text-gray-200 mb-3">
                Enter your nickname
              </label>
              <input
                type="text"
                id="nickname"
                value={selectedNickname}
                onChange={(e) => setSelectedNickname(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border-2 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Your nickname"
              />
              {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-purple-500/25"
            >
              Start Game
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default StartPage; 