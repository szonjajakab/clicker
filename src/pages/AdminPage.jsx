import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseService';

function AdminPage() {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Initial fetch of players
    const fetchPlayers = async () => {
      const { data, error } = await supabase
        .from('clicker')
        .select('*')
        .order('score', { ascending: false });

      if (error) {
        console.error('Error fetching players:', error);
        return;
      }

      setPlayers(data || []);
    };

    fetchPlayers();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('clicker_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'clicker'
        },
        (payload) => {
          fetchPlayers(); // Refresh the entire list when any change occurs
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const handleResetAllScores = async () => {
    const { error } = await supabase
      .from('clicker')
      .update({ score: 0 });

    if (error) {
      console.error('Error resetting scores:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center py-6 md:py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4 tracking-tight">
            Admin Dashboard
          </h1>
        </header>

        <main className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-amber-800">Player Scores</h2>
            <button
              onClick={handleResetAllScores}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Reset All Scores
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b-2 border-amber-200">
                  <th className="pb-3 text-amber-800">Player</th>
                  <th className="pb-3 text-amber-800">Avatar</th>
                  <th className="pb-3 text-amber-800">Score</th>
                  <th className="pb-3 text-amber-800">Session ID</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr key={player.session_id} className="border-b border-amber-100">
                    <td className="py-3 text-amber-900">{player.nickname}</td>
                    <td className="py-3">
                      {player.avatar && (
                        <img
                          src={player.avatar}
                          alt="Player avatar"
                          className="w-8 h-8 rounded-full border-2 border-amber-400"
                        />
                      )}
                    </td>
                    <td className="py-3 text-amber-900 font-semibold">{player.score}</td>
                    <td className="py-3 text-amber-900/70 text-sm">{player.session_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminPage;
