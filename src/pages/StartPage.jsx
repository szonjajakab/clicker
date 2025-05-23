import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';

const AVATAR_OPTIONS = [
  '/avatars/avatar1.png',
  '/avatars/avatar2.png',
  '/avatars/avatar3.png',
  '/avatars/avatar4.png',
];

function StartPage() {
  const navigate = useNavigate();
  const { setNickname, setAvatar } = useGame();
  const [selectedNickname, setSelectedNickname] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);
  const [error, setError] = useState('');

  const handleStartGame = (e) => {
    e.preventDefault();
    if (!selectedNickname.trim()) {
      setError('Please enter a nickname');
      return;
    }
    setNickname(selectedNickname.trim());
    setAvatar(selectedAvatar);
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 p-4 md:p-8">
      <div className="max-w-md mx-auto">
        <header className="text-center py-6 md:py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4 tracking-tight">
            Cookie Clicker
          </h1>
          <p className="text-sm text-amber-600/80 font-medium mb-8">
            Start your cookie clicking adventure!
          </p>
        </header>

        <main className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
          <form onSubmit={handleStartGame} className="space-y-6">
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-amber-800 mb-2">
                Enter your nickname
              </label>
              <input
                type="text"
                id="nickname"
                value={selectedNickname}
                onChange={(e) => setSelectedNickname(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                placeholder="Your nickname"
              />
              {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2">
                Choose your avatar
              </label>
              <div className="grid grid-cols-2 gap-4">
                {AVATAR_OPTIONS.map((avatar) => (
                  <button
                    key={avatar}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`p-2 rounded-lg border-2 transition-all ${
                      selectedAvatar === avatar
                        ? 'border-amber-400 bg-amber-50'
                        : 'border-transparent hover:border-amber-200'
                    }`}
                  >
                    <img
                      src={avatar}
                      alt="Avatar option"
                      className="w-full h-auto rounded-lg"
                    />
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
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