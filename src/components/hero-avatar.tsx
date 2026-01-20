'use client';

import React, { useState, useEffect } from 'react';

interface HeroAvatarProps {
  size?: number;
  className?: string;
  isSpeaking?: boolean;
}

const HeroAvatar: React.FC<HeroAvatarProps> = ({
  size = 200,
  className = '',
  isSpeaking = false,
}) => {
  const [mouthState, setMouthState] = useState(0);

  // Animate mouth when speaking
  useEffect(() => {
    if (!isSpeaking) {
      setMouthState(0);
      return;
    }

    const interval = setInterval(() => {
      setMouthState((prev) => (prev === 2 ? 0 : prev + 1));
    }, 300);

    return () => clearInterval(interval);
  }, [isSpeaking]);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle */}
      <defs>
        <radialGradient id="bg-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE8D6" />
          <stop offset="100%" stopColor="#F5D0B8" />
        </radialGradient>
      </defs>
      
      <circle cx="100" cy="100" r="95" fill="url(#bg-gradient)" />

      {/* Hijab Back Layer */}
      <ellipse
        cx="100"
        cy="90"
        rx="75"
        ry="85"
        fill="#E6C9B3"
      />
      
      {/* Hijab Front Layers with draping effect */}
      <path
        d="M 40 90 Q 40 60 100 50 Q 160 60 160 90 L 160 130 Q 100 140 40 130 Z"
        fill="#F5E0C8"
      />
      
      {/* Hijab shadow/fold */}
      <path
        d="M 50 95 Q 75 100 100 95 Q 125 100 150 95"
        stroke="#D4B5A0"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />

      {/* Face */}
      <ellipse
        cx="100"
        cy="115"
        rx="48"
        ry="58"
        fill="#FFD6B3"
      />
      
      {/* Left Eyebrow */}
      <path
        d="M 72 98 Q 77 95 85 96"
        stroke="#8B4513"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Right Eyebrow */}
      <path
        d="M 115 96 Q 123 95 128 98"
        stroke="#8B4513"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Left Eye */}
      <ellipse
        cx="80"
        cy="108"
        rx="9"
        ry="13"
        fill="white"
      />
      <ellipse
        cx="80"
        cy="110"
        rx="7"
        ry="10"
        fill="#5D4037"
      />
      <circle
        cx="82"
        cy="108"
        r="2.5"
        fill="white"
      />
      
      {/* Right Eye */}
      <ellipse
        cx="120"
        cy="108"
        rx="9"
        ry="13"
        fill="white"
      />
      <ellipse
        cx="120"
        cy="110"
        rx="7"
        ry="10"
        fill="#5D4037"
      />
      <circle
        cx="122"
        cy="108"
        r="2.5"
        fill="white"
      />
      
      {/* Nose */}
      <path
        d="M 100 118 L 98 125 Q 100 127 102 125 Z"
        fill="#E6A57E"
        opacity="0.3"
      />
      <circle
        cx="98"
        cy="125"
        r="1.5"
        fill="#D4906B"
        opacity="0.5"
      />
      
      {/* Left Blush */}
      <ellipse
        cx="67"
        cy="125"
        rx="10"
        ry="7"
        fill="#FFB6B9"
        opacity="0.5"
      />
      
      {/* Right Blush */}
      <ellipse
        cx="133"
        cy="125"
        rx="10"
        ry="7"
        fill="#FFB6B9"
        opacity="0.5"
      />
      
      {/* Mouth - changes based on speaking state */}
      {mouthState === 0 && (
        <path
          d="M 88 138 Q 100 142 112 138"
          stroke="#D97D7D"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      )}
      
      {mouthState === 1 && (
        <ellipse
          cx="100"
          cy="140"
          rx="8"
          ry="6"
          fill="#D97D7D"
        />
      )}
      
      {mouthState === 2 && (
        <ellipse
          cx="100"
          cy="140"
          rx="6"
          ry="4"
          fill="#D97D7D"
        />
      )}
      
      {/* Neck/Shoulders */}
      <path
        d="M 60 165 Q 100 175 140 165 L 145 200 L 55 200 Z"
        fill="#F5E0C8"
      />
      
      {/* Clothing detail */}
      <path
        d="M 50 175 Q 100 185 150 175 L 160 200 L 40 200 Z"
        fill="#E6C9B3"
      />

      {/* Optional flower decoration on hijab */}
      <g opacity="0.6">
        <circle cx="130" cy="70" r="4" fill="#FFB6B9" />
        <circle cx="125" cy="75" r="3.5" fill="#FFD6B9" />
        <circle cx="135" cy="75" r="3.5" fill="#FFE8D6" />
      </g>
    </svg>
  );
};

export default HeroAvatar;
