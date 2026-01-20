'use client';

import React, { useState, useEffect } from 'react';

interface HeroAvatarProps {
  size?: number;
  className?: string;
  isSpeaking?: boolean;
}

const HeroAvatar: React.FC<HeroAvatarProps> = ({ size = 300, className = '', isSpeaking = false }) => {
  const [mouthState, setMouthState] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouth animation when speaking
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isSpeaking) {
      interval = setInterval(() => {
        setMouthState((prev) => (prev + 1) % 3);
      }, 150);
    } else {
      setMouthState(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSpeaking]);

  // Mouse tracking for face movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate face translation based on mouse
  const translateX = (mousePos.x / window.innerWidth - 0.5) * 10; // ±5px
  const translateY = (mousePos.y / window.innerHeight - 0.5) * 10;

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{
        width: size,
        height: size * 1.3,
        transform: `translate(${translateX}px, ${translateY}px)`,
        transition: 'transform 0.05s ease-out',
      }}
    >
      {/* CIRCLE BACKGROUND / SHADOW */}
      <div
        className={`absolute inset-0 rounded-full`}
        style={{ background: 'radial-gradient(circle at center, #ffe8d6 0%, #f5d0b8 100%)' }}
      />

      {/* Hijab */}
      <div
        className="absolute top-0 left-0 w-full h-full rounded-full"
        style={{
          background: 'linear-gradient(180deg, #f5e0c8 0%, #e0cbbf 100%)',
          zIndex: 1,
        }}
      />

      {/* Flower Crown */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: `hsl(${100 + i * 20}, 70%, 60%)`,
            }}
          />
        ))}
      </div>

      {/* Face */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-3/4 h-2/3 rounded-full"
        style={{ backgroundColor: '#ffd6b3', zIndex: 2 }}
      >
        {/* Eyes */}
        <div className="absolute top-1/3 left-1/4 w-6 h-6 rounded-full bg-brown-800">
          <div className="absolute w-3 h-3 rounded-full bg-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-brown-800">
          <div className="absolute w-3 h-3 rounded-full bg-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        {/* Eyebrows */}
        <div className="absolute top-1/4 left-1/4 w-6 h-1 rounded-full bg-brown-700 rotate-3" />
        <div className="absolute top-1/4 right-1/4 w-6 h-1 rounded-full bg-brown-700 -rotate-3" />
        {/* Mouth */}
        <div
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2"
          style={{
            width: 20,
            height: mouthState === 0 ? 2 : mouthState === 1 ? 6 : 4,
            backgroundColor: '#d97d7d',
            borderRadius: 10,
          }}
        />
      </div>
    </div>
  );
};

export default HeroAvatar;
