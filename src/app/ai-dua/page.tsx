'use client';

import React, { useState, useEffect } from 'react';
import { Feather, Sparkles, Moon, Star, Send } from 'lucide-react';

/* =========================
   Hero Avatar Types
========================= */
interface HeroAvatarProps {
  isSpeaking?: boolean;
  size?: number;
  className?: string;
}

/* =========================
   Hero Avatar Component
========================= */
const HeroAvatar = ({
  isSpeaking = false,
  size = 420,
  className = '',
}: HeroAvatarProps) => {
  const [blink, setBlink] = useState(false);
  const [mouthState, setMouthState] = useState(0);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 4500);
    return () => clearInterval(blinkInterval);
  }, []);

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
      className={`relative inline-block transition-all duration-1000 ${
        isSpeaking ? 'scale-[1.02]' : 'animate-float'
      } ${className}`}
      style={{ width: size, height: size * 1.3 }}
    >
      <div
        className={`absolute bottom-1/3 left-1/4 w-2/3 h-2/3 rounded-full blur-[120px] transition-all duration-1000 ${
          isSpeaking
            ? 'bg-[#ffcc33]/40 scale-125'
            : 'bg-[#d4af37]/20 scale-100'
        }`}
      />

      <svg
        viewBox="0 0 200 260"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full drop-shadow-[0_35px_50px_rgba(0,0,0,0.6)]"
      >
        <defs>
          <radialGradient id="skinBase" cx="100" cy="100" r="80">
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

        {/* Hair Back */}
        <path
          d="M30 95C15 125 10 185 20 220C35 252 65 258 100 258C135 258 165 252 180 220C190 185 185 125 170 95"
          fill="#1a0f0a"
        />

        {/* Dress */}
        <path
          d="M45 195C20 215 15 260 15 260H185C185 260 180 215 155 195L100 185L45 195Z"
          fill="#fcfaf7"
        />

        {/* Face */}
        <ellipse cx="100" cy="105" rx="52" ry="58" fill="url(#skinBase)" />

        {/* Eyes */}
        <g transform="translate(100, 103)">
          {blink ? (
            <path
              d="M-36 -2Q-22 4 -8 -2 M8 -2Q22 4 36 -2"
              stroke="#3e2723"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          ) : (
            <>
              <circle cx="-23" cy="0" r="10" fill="url(#eyeDeep)" />
              <circle cx="23" cy="0" r="10" fill="url(#eyeDeep)" />
            </>
          )}
        </g>
      </svg>
    </div>
  );
};

/* =========================
   Floating Stars
========================= */
const FloatingStars = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      >
        <Star className="w-2 h-2 text-yellow-200/30" fill="currentColor" />
      </div>
    ))}
  </div>
);

/* =========================
   Crescent Moon
========================= */
const CrescentMoon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor">
    <path d="M50,10 A40,40 0 1,0 50,90 A30,30 0 1,1 50,10 Z" />
  </svg>
);

/* =========================
   Page
========================= */
export default function AIDuaPage() {
  const [duaText, setDuaText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (duaText.length > 0) {
      setIsTyping(true);
      const t = setTimeout(() => setIsTyping(false), 400);
      return () => clearTimeout(t);
    }
  }, [duaText]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 relative overflow-hidden">
      <FloatingStars />

      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <CrescentMoon className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl text-amber-50 mb-3 font-serif">
            صياغة الدعاء
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <HeroAvatar isSpeaking={isTyping} size={420} />
          </div>

          <div className="bg-blue-950/40 p-8 rounded-3xl border border-yellow-600/20">
            <textarea
              value={duaText}
              onChange={(e) => setDuaText(e.target.value)}
              placeholder="اللهم..."
              className="w-full min-h-[220px] p-5 rounded-2xl bg-blue-950/50 text-amber-50 text-xl"
              maxLength={500}
            />

            <button className="mt-6 w-full bg-yellow-600 py-4 rounded-2xl text-blue-950 font-bold">
              <Send className="inline w-5 h-5 ml-2" />
              شارك الدعاء
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
