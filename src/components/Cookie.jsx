import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import cookieImage from '../assets/cookie.jpg';

function Cookie() {
  const { incrementScore } = useGame();
  const [isAnimating, setIsAnimating] = useState(false);
  const [cookieSize, setCookieSize] = useState(240);

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
    incrementScore();
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 100);
  };

  return (
    <div className="flex justify-center items-center my-6 md:my-8">
      <button
        onClick={handleClick}
        className={`
          transition-all duration-100 ease-in-out
          ${isAnimating ? 'scale-95 rotate-3' : 'scale-100 rotate-0'}
          hover:scale-105 active:scale-95
          focus:outline-none focus:ring-4 focus:ring-amber-400/50
          rounded-full
        `}
        aria-label="Click the cookie"
        style={{ touchAction: 'manipulation' }}
      >
        <div className="relative">
          <img 
            src={cookieImage} 
            alt="Cookie" 
            className="select-none rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
            style={{
              width: `${cookieSize}px`,
              height: `${cookieSize}px`,
              pointerEvents: 'none',
            }}
            draggable="false"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
      </button>
    </div>
  );
}

export default Cookie;