import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseService';

function AdminPage() {
  const [totalClicks, setTotalClicks] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Initial fetch of total clicks
    const fetchTotalClicks = async () => {
      const { data, error } = await supabase
        .from('clicker')
        .select('score');

      if (error) {
        console.error('Error fetching scores:', error);
        return;
      }

      // Calculate total clicks
      const total = data.reduce((sum, player) => sum + (player.score || 0), 0);
      setTotalClicks(total);
    };

    fetchTotalClicks();

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
          fetchTotalClicks(); // Refresh the total when any change occurs
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const handleResetAllScores = async () => {
    try {
      // First, get all session IDs
      const { data: players, error: fetchError } = await supabase
        .from('clicker')
        .select('session_id');

      if (fetchError) {
        throw fetchError;
      }

      // Update each player's score to 0
      const updatePromises = players.map(player => 
        supabase
          .from('clicker')
          .update({ score: 0 })
          .eq('session_id', player.session_id)
      );

      await Promise.all(updatePromises);
      
      // Update local state
      setTotalClicks(0);
    } catch (error) {
      console.error('Error resetting scores:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center py-6 md:py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight font-['Instrument_Serif']">
            Admin Dashboard
          </h1>
        </header>

        <main className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white font-['Instrument_Serif']">Total Clicks</h2>
            <button
              onClick={handleResetAllScores}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors font-['Instrument_Serif']"
            >
              Reset All Scores
            </button>
          </div>

          <div className="text-center py-8">
            <div className="bg-gray-800/80 rounded-xl p-8 shadow-inner">
              <p className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent font-['Instrument_Serif']">
                {totalClicks.toLocaleString()}
              </p>
              <p className="mt-4 text-lg text-white/80 font-medium font-['Instrument_Serif']">
                Total Clicks Generated
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminPage;
