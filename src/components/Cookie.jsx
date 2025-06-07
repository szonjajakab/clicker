import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import deerImage from '../assets/deer.png';
import brokenDeerImage from '../assets/broken_deer.png';
import { supabase } from '../services/supabaseService';

function Cookie() {
  const { incrementScore } = useGame();
  const [isAnimating, setIsAnimating] = useState(false);
  const [cookieSize, setCookieSize] = useState(240);
  const [totalScore, setTotalScore] = useState(0);

  // Fetch total score from Supabase
  const fetchTotalScore = async () => {
    const { data, error } = await supabase
      .from('clicker')
      .select('score');
    if (!error && data) {
      const total = data.reduce((sum, player) => sum + (player.score || 0), 0);
      setTotalScore(total);
    }
  };

  useEffect(() => {
    fetchTotalScore();
    // Optionally, subscribe to changes for real-time updates
    const channel = supabase
      .channel('cookie_score_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'clicker',
        },
        () => {
          fetchTotalScore();
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const updateCookieSize = () => {
      const width = window.innerWidth;
      if (width < 360) {
        setCookieSize(160);
      } else if (width < 640) {
        setCookieSize(200);
      } else if (width < 768) {
        setCookieSize(240);
      } else {
        setCookieSize(280);
      }
    };

    updateCookieSize();
    window.addEventListener('resize', updateCookieSize);
    return () => window.removeEventListener('resize', updateCookieSize);
  }, []);

  const handleClick = () => {
    if (totalScore >= 33333) return;
    incrementScore();
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 100);
    fetchTotalScore(); // Update after click
  };

  const imageToShow = totalScore >= 33333 ? brokenDeerImage : deerImage;

  return (
    <div className="flex justify-center items-center my-6 md:my-8">
      <button
        onClick={handleClick}
        className={`
          transition-all duration-100 ease-in-out
          ${isAnimating ? 'scale-95 rotate-3' : 'scale-100 rotate-0'}
          hover:scale-105 active:scale-95
          focus:outline-none
          ${totalScore >= 33333 ? 'opacity-60 cursor-not-allowed' : ''}
        `}
        aria-label="Click the cookie"
        style={{ touchAction: 'manipulation' }}
        disabled={totalScore >= 33333}
      >
        <div className="relative">
          <img 
            src={imageToShow} 
            alt="Cookie" 
            className="select-none shadow-lg hover:shadow-xl transition-shadow duration-300"
            style={{
              width: `${cookieSize}px`,
              height: `${cookieSize}px`,
              pointerEvents: 'none',
            }}
            draggable="false"
          />
        </div>
      </button>
    </div>
  );
}

export default Cookie;