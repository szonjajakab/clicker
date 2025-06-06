import React, { createContext, useState, useEffect, useContext } from 'react';
import { initializeSocket } from '../services/socketService';
import { supabase } from '../services/supabaseService';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [score, setScore] = useState(0);
  const [sessionId, setSessionId] = useState(null);
  const [socket, setSocket] = useState(null);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    // Generate a random session ID if not exists
    const newSessionId = sessionId || `player-${Math.random().toString(36).substring(2, 9)}`;
    setSessionId(newSessionId);
    
    // Initialize socket connection
    const socketInstance = initializeSocket(newSessionId);
    setSocket(socketInstance);

    // Load user data from Supabase
    const loadUserData = async () => {
      const { data, error } = await supabase
        .from('clicker')
        .select('*')
        .eq('session_id', newSessionId)
        .single();

      if (data) {
        setScore(data.score || 0);
        setNickname(data.nickname || '');
      }
    };

    loadUserData();

    // Setup event listener for admin-triggered reset
    const handleResetEvent = () => resetScore();
    window.addEventListener('resetScore', handleResetEvent);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
      window.removeEventListener('resetScore', handleResetEvent);
    };
  }, []);

  // Save score to Supabase whenever it changes
  useEffect(() => {
    const saveScore = async () => {
      if (sessionId && nickname) {
        const { error } = await supabase
          .from('clicker')
          .upsert({ 
            session_id: sessionId,
            score: score,
            nickname: nickname,
            created_at: new Date().toISOString()
          }, { onConflict: ['session_id'] });

        if (error) console.error('Error saving score:', error);
      }
    };

    saveScore();
    
    // Emit score update to server if socket exists
    if (socket) {
      socket.emit('scoreUpdate', { sessionId, score });
    }
  }, [score, socket, sessionId, nickname]);

  const incrementScore = () => {
    setScore(prevScore => prevScore + 1);
  };

  const resetScore = async () => {
    setScore(0);
    if (sessionId) {
      const { error } = await supabase
        .from('clicker')
        .update({ score: 0 })
        .eq('session_id', sessionId);
      
      if (error) console.error('Error resetting score:', error);
    }
  };

  return (
    <GameContext.Provider value={{ score, incrementScore, resetScore, sessionId, nickname, setNickname }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);