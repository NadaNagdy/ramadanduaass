'use client';

import React, { useState, useEffect } from 'react';

interface HeroAvatarProps {
  size?: number;
  className?: string;
}

const HeroAvatar: React.FC<HeroAvatarProps> = ({ size = 300, className = '' }) => {
  const [blink, setBlink] = useState(false);
  const [mouthState, setMouthState] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Blink animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 4000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Mouth moves with scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setMouthState(Math.floor((window.scrollY / 50) % 3));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Face moves with mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.body.getBoundingClientRect();
      const x = (e.clientX / rect.width - 0.5) * 2; // -1 to 1
      const y = (e.clientY / rect.height - 0.5) * 2; // -1 to 1
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size * 1.5 }}
    >
      {/* Glow */}
      <div
        className={`absolute bottom-0 left-1/4 w-2/3 h-2/3 rounded-full transition-all duration-500`}
        style={{
          backgroundColor: scrollY > 0 ? 'rgba(255,200,51,0.4)' : 'rgba(255,200,51,0.2)',
          transform: scrollY > 0 ? 'scale(1.1)' : 'scale(1)',
        }}
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

        {/* تاج ورد */}
        <g transform="translate(100, 30)">
          <circle cx="-30" cy="0" r="8" fill="#ff6b81" />
          <circle cx="-15" cy="-5" r="6" fill="#ffb6b9" />
          <circle cx="0" cy="0" r="7" fill="#ff6b81" />
          <circle cx="15" cy="-5" r="6" fill="#ffb6b9" />
          <circle cx="30" cy="0" r="8" fill="#ff6b81" />
        </g>

        {/* الوجه يتحرك مع الماوس */}
        <g
          transform={`translate(${100 + mousePos.x * 10}, ${120 + mousePos.y * 10})`}
        >
          {/* Face */}
          <ellipse cx="0" cy="0" rx="55" ry="70" fill="url(#skin)" />

          {/* الحواجب */}
          <path d="M-35 -25 Q-25 -35 -15 -25" stroke="#3e2723" strokeWidth="3" strokeLinecap="round" />
          <path d="M15 -25 Q25 -35 35 -25" stroke="#3e2723" strokeWidth="3" strokeLinecap="round" />

          {/* العيون + رموش */}
          {blink ? (
            <>
              <line x1="-25" y1="0" x2="-5" y2="0" stroke="#3e2723" strokeWidth="3" strokeLinecap="round" />
              <line x1="5" y1="0" x2="25" y2="0" stroke="#3e2723" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="-20" cy="0" r="8" fill="url(#eyeGrad)" />
              <circle cx="20" cy="0" r="8" fill="url(#eyeGrad)" />
              <circle cx="-20" cy="0" r="4" fill="#000" />
              <circle cx="20" cy="0" r="4" fill="#000" />
              {/* رموش */}
              <line x1="-27" y1="-8" x2="-21" y2="-5" stroke="#3e2723" strokeWidth="1.5" />
              <line x1="-13" y1="-8" x2="-9" y2="-5" stroke="#3e2723" strokeWidth="1.5" />
              <line x1="13" y1="-8" x2="17" y2="-5" stroke="#3e2723" strokeWidth="1.5" />
              <line x1="27" y1="-8" x2="33" y2="-5" stroke="#3e2723" strokeWidth="1.5" />
            </>
          )}

          {/* Mouth */}
          <g transform="translate(0, 40)">
            {mouthState === 0 && <path d="M-10 0 Q0 5 10 0" stroke="#c1727a" strokeWidth="3" fill="none" />}
            {mouthState === 1 && <path d="M-10 0 Q0 10 10 0 Q0 5 -10 0Z" fill="#c1727a" />}
            {mouthState === 2 && <path d="M-12 0 Q0 15 12 0 Q0 7 -12 0Z" fill="#c1727a" />}
          </g>
        </g>
      </svg>
    </div>
  );
};

export default HeroAvatar;
