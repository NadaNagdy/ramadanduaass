'use client';

import React, { useState, useEffect } from 'react';

interface HeroAvatarProps {
  isSpeaking?: boolean;
  size?: number;
  className?: string;
}

const HeroAvatar: React.FC<HeroAvatarProps> = ({
  isSpeaking={true}
  size={400}
  className="border-2 border-red-500",
}) => {
  const [blink, setBlink] = useState(false);
  const [mouthState, setMouthState] = useState(0);

  // Blink effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 4500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Mouth movement when speaking
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isSpeaking) {
      interval = setInterval(() => {
        setMouthState((prev) => (prev + 1) % 4);
      }, 110);
    } else {
      setMouthState(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSpeaking]);

  return (
    <div
      className={`relative inline-block transition-all duration-1000 ${className} ${
        isSpeaking ? 'scale-[1.02]' : 'animate-float'
      }`}
      style={{ width: size, height: size * 1.3 }}
    >
      <div
        className={`absolute bottom-1/3 left-1/4 w-2/3 h-2/3 rounded-full blur-[120px] transition-all duration-1000 ${
          isSpeaking ? 'bg-[#ffcc33]/40 scale-125' : 'bg-[#d4af37]/20 scale-100'
        }`}
      />

      {/* SVG avatar */}
      <svg
        viewBox="0 0 200 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full drop-shadow-[0_35px_50px_rgba(0,0,0,0.6)]"
      >
        {/* Gradients */}
        <defs>
          <radialGradient id="skinBase" cx="100" cy="100" r="80" fx="90" fy="90">
            <stop offset="0%" stopColor="#fffaf5" />
            <stop offset="50%" stopColor="#ffe8d6" />
            <stop offset="100%" stopColor="#f5d0b8" />
          </radialGradient>

          <linearGradient id="hairTexture" x1="100" y1="40" x2="100" y2="240">
            <stop offset="0%" stopColor="#4a3228" />
            <stop offset="50%" stopColor="#3d2617" />
            <stop offset="100%" stopColor="#2a1a0f" />
          </linearGradient>

          <radialGradient id="eyeDeep" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6d4c41" />
            <stop offset="60%" stopColor="#3e2723" />
            <stop offset="100%" stopColor="#1a0f0a" />
          </radialGradient>
        </defs>

        {/* Body */}
        <path d="M30 95C15 125 10 185 20 220C35 252 65 258 100 258C135 258 165 252 180 220C190 185 185 125 170 95" fill="#1a0f0a" />
        <path d="M45 195C45 195 20 215 15 260H185C180 215 155 195 155 195L100 185L45 195Z" fill="#fcfaf7" />

        {/* Face */}
        <ellipse cx="100" cy="105" rx="52" ry="58" fill="url(#skinBase)" />
        <ellipse cx="72" cy="122" rx="14" ry="10" fill="#ff9a9e" fillOpacity={0.15} />
        <ellipse cx="128" cy="122" rx="14" ry="10" fill="#ff9a9e" fillOpacity={0.15} />

        {/* Hair */}
        <path
          d="M42 98C42 55 62 35 100 35C138 35 158 55 158 98C158 122 153 142 145 158"
          stroke="url(#hairTexture)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M42 98C42 122 47 142 55 158"
          stroke="url(#hairTexture)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />

        {/* Eyes */}
        <g transform="translate(100, 103)">
          {blink ? (
            <path d="M-36 -2Q-22 4 -8 -2 M8 -2Q22 4 36 -2" stroke="#3e2723" strokeWidth="3.5" strokeLinecap="round" />
          ) : (
            <>
              <path d="M-40 0Q-23 -20 -6 0Q-23 20 -40 0Z" fill="#ffffff" />
              <path d="M6 0Q23 -20 40 0Q23 20 6 0Z" fill="#ffffff" />
              <circle cx="-23" cy="0" r="10" fill="url(#eyeDeep)" />
              <circle cx="23" cy="0" r="10" fill="url(#eyeDeep)" />
              <circle cx="-23" cy="0" r="5" fill="#000000" />
              <circle cx="23" cy="0" r="5" fill="#000000" />
              <circle cx="-26" cy="-4" r="3.5" fill="white" fillOpacity={0.9} />
              <circle cx="20" cy="-4" r="3.5" fill="white" fillOpacity={0.9} />
            </>
          )}
        </g>

        {/* Mouth */}
        <g transform="translate(100, 142)">
          {!isSpeaking ? (
            <path d="M-12 0Q0 6 12 0" stroke="#c1727a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          ) : (
            <>
              {mouthState === 2 || mouthState === 3 ? (
                <path
                  d={`M-13 0 Q0 ${mouthState === 3 ? 18 : 12} 13 0 Q0 ${mouthState === 3 ? 10 : 6} -13 0Z`}
                  fill="#8b5a5f"
                />
              ) : (
                <path d="M-11 0 Q0 7 11 0" stroke="#c1727a" strokeWidth="4" strokeLinecap="round" fill="none" />
              )}
            </>
          )}
        </g>
      </svg>
    </div>
  );
};

export default HeroAvatar;
