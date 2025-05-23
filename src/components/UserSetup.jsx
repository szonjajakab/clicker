import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { supabase } from '../services/supabaseService';
import catAvatar from '../assets/avatars/cat.png';

const avatars = [
  { src: catAvatar, label: 'Cat' },
  // Add more avatars here as you add them
];

function UserSetup() {
  const { setNickname, setAvatar, sessionId } = useGame();
  const [nicknameInput, setNicknameInput] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0].src);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nicknameInput.trim()) {
      setError('Please enter a nickname.');
      return;
    }

    setIsLoading(true);
    try {
      const { error: supabaseError } = await supabase
        .from('clicker')
        .upsert({
          session_id: sessionId,
          nickname: nicknameInput.trim(),
          score: 0,
          created_at: new Date().toISOString()
        }, { onConflict: ['session_id'] });

      if (supabaseError) {
        throw supabaseError;
      }

      setNickname(nicknameInput.trim());
      setAvatar(selectedAvatar);
    } catch (err) {
      setError('Failed to save your nickname. Please try again.');
      console.error('Error saving nickname:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 p-4">
      <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-amber-800 text-center mb-2">Welcome!</h2>
        <label className="block">
          <span className="text-amber-700 font-medium">Nickname</span>
          <input
            type="text"
            className="mt-1 w-full rounded-lg border border-amber-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 text-lg"
            value={nicknameInput}
            onChange={e => setNicknameInput(e.target.value)}
            maxLength={20}
            placeholder="Enter your nickname"
            required
            disabled={isLoading}
          />
        </label>
        <div>
          <span className="text-amber-700 font-medium block mb-2">Pick an avatar</span>
          <div className="flex gap-4 justify-center">
            {avatars.map(avatar => (
              <button
                type="button"
                key={avatar.src}
                className={`rounded-full border-4 transition-all duration-200 ${selectedAvatar === avatar.src ? 'border-amber-500 scale-110' : 'border-transparent scale-100'} focus:outline-none`}
                onClick={() => setSelectedAvatar(avatar.src)}
                aria-label={avatar.label}
                disabled={isLoading}
              >
                <img src={avatar.src} alt={avatar.label} className="w-20 h-20 object-cover rounded-full" />
              </button>
            ))}
          </div>
        </div>
        {error && <div className="text-red-600 text-center">{error}</div>}
        <button
          type="submit"
          className={`mt-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 rounded-lg transition-colors text-lg shadow-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Starting...' : 'Start Playing'}
        </button>
      </form>
    </div>
  );
}

export default UserSetup; 