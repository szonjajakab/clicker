import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Update player score
export const updateScore = async (sessionId, score) => {
  const { data, error } = await supabase
    .from('clicker')
    .upsert({ 
      session_id: sessionId, 
      score: score,
      created_at: new Date().toISOString()
    }, { onConflict: 'session_id' });
    
  if (error) console.error('Error updating score:', error);
  return data;
};

// Mark player as inactive
export const markPlayerInactive = async (sessionId) => {
  const { error } = await supabase
    .from('clicker')
    .update({ active: false })
    .eq('session_id', sessionId);
    
  if (error) console.error('Error marking player inactive:', error);
};

// Subscribe to real-time updates (for admin panel)
export const subscribeToPlayers = (callback) => {
  const subscription = supabase
    .from('clicker')
    .on('*', payload => {
      callback(payload);
    })
    .subscribe();
    
  return subscription;
};

// Get all active players
export const getActivePlayers = async () => {
  const { data, error } = await supabase
    .from('clicker')
    .select('*')
    .eq('active', true);
    
  if (error) console.error('Error fetching players:', error);
  return data || [];
};

// Reset player score
export const resetPlayerScore = async (sessionId) => {
  const { error } = await supabase
    .from('clicker')
    .update({ score: 0 })
    .eq('session_id', sessionId);
    
  if (error) console.error('Error resetting score:', error);
};

// Reset all scores
export const resetAllScores = async () => {
  const { error } = await supabase
    .from('clicker')
    .update({ score: 0 })
    .eq('active', true);
    
  if (error) console.error('Error resetting all scores:', error);
};