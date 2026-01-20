'use client';

import React, { useState, useEffect } from 'react';

interface HeroAvatarProps {
  isSpeaking?: boolean;
  size?: number;
  className?: string;
}

const HeroAvatar: React.FC<HeroAvatarProps> = ({ isSpeaking = false, size = 300, className = '' }) => {
  const [blink, setBlink] = useState(false);
  const [mouthState, setMouthState] = useState(0);

  // Blink animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 4000 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Mouth animation
  useEffect(() => {
    let interval: NodeJS.Timer;

    if (isSpeaking) {
      interval = setInterval(() => {
        setMouthState((prev) => (prev + 1) % 3);
      }, 150);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSpeaking]);

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size * 1.4 }}
    >
      {/* Glow */}
      <div
        className={`absolute bottom-0 left-1/4 w-2/3 h-2/3 rounded-full transition-all duration-500 ${isSpeaking ? 'bg-yellow-400/40 scale-110' : 'bg-yellow-300/20 scale-100'}`}
      />

      <svg viewBox="0 0 200 280" className="relative z-10 w-full h-full">
        <defs>
          <radialGradient id="skin" cx="100" cy="100" r="80">
            <stop offset="0%" stopColor="#fff1e6" />
            <stop offset="100%" stopColor="#f2c1a0" />
          </radialGradient>
          <radialGradient id="eyeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6d4c41" />
            <stop offset="100%" stopColor="#1a0f0a" />
          </radialGradient>
        </defs>

        {/* الحجاب */}
        <path
          d="M20 80 C20 20, 180 20, 180 80 L180 200 C180 250, 20 250, 20 200 Z"
          fill="#5A3E36"
        />

        {/* الوجه */}
        <ellipse cx="100" cy="120" rx="55" ry="70" fill="url(#skin)" />

        {/* العيون */}
        {blink ? (
          <>
            <line x1="70" y1="120" x2="90" y2="120" stroke="#3e2723" strokeWidth="3" strokeLinecap="round" />
            <line x1="110" y1="120" x2="130" y2="120" stroke="#3e2723" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="75" cy="120" r="8" fill="url(#eyeGrad)" />
            <circle cx="125" cy="120" r="8" fill="url(#eyeGrad)" />
            <circle cx="75" cy="120" r="4" fill="#000" />
            <circle cx="125" cy="120" r="4" fill="#000" />
          </>
        )}

        {/* Mouth */}
        <g transform="translate(100, 160)">
          {mouthState === 0 && <path d="M-10 0 Q0 5 10 0" stroke="#c1727a" strokeWidth="3" fill="none" />}
          {mouthState === 1 && <path d="M-10 0 Q0 10 10 0 Q0 5 -10 0Z" fill="#c1727a" />}
          {mouthState === 2 && <path d="M-12 0 Q0 15 12 0 Q0 7 -12 0Z" fill="#c1727a" />}
        </g>
      </svg>
    </div>
  );
};

export default HeroAvatar;

