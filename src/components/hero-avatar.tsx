'use client';

import React, { useState, useEffect } from 'react';
import { Feather, Sparkles, Moon, Star, Send } from 'lucide-react';

// Hero Avatar Component
const HeroAvatar = ({ isSpeaking = false, size = 420 }) => {
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
      className={`relative inline-block transition-all duration-1000 ${isSpeaking ? 'scale-[1.02]' : 'animate-float'}`}
      style={{ width: size, height: size * 1.3 }}
    >
      <div className={`absolute bottom-1/3 left-1/4 w-2/3 h-2/3 rounded-full blur-[120px] transition-all duration-1000 ${isSpeaking ? 'bg-[#ffcc33]/40 scale-125' : 'bg-[#d4af37]/20 scale-100'}`} />
      
      <svg 
        viewBox="0 0 200 260" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full drop-shadow-[0_35px_50px_rgba(0,0,0,0.6)]"
      >
        <defs>
          <radialGradient id="skinBase" cx="100" cy="100" r="80" fx="90" fy="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fffaf5" />
            <stop offset="50%" stopColor="#ffe8d6" />
            <stop offset="100%" stopColor="#f5d0b8" />
          </radialGradient>
          
          <linearGradient id="hairTexture" x1="100" y1="40" x2="100" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4a3228" />
            <stop offset="50%" stopColor="#3d2617" />
            <stop offset="100%" stopColor="#2a1a0f" />
          </linearGradient>

          <radialGradient id="eyeDeep" cx="50%" cy="50%" r="50%" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6d4c41" />
            <stop offset="60%" stopColor="#3e2723" />
            <stop offset="100%" stopColor="#1a0f0a" />
          </radialGradient>
        </defs>

        {/* Back Hair */}
        <path d="M30 95C15 125 10 185 20 220C35 252 65 258 100 258C135 258 165 252 180 220C190 185 185 125 170 95" fill="#1a0f0a" />
        
        {/* Dress */}
        <path d="M45 195C45 195 20 215 15 260H185C180 215 155 195 155 195L100 185L45 195Z" fill="#fcfaf7" />
        
        {/* Face */}
        <ellipse cx="100" cy="105" rx="52" ry="58" fill="url(#skinBase)" />
        
        {/* Blush */}
        <ellipse cx="72" cy="122" rx="14" ry="10" fill="#ff9a9e" fillOpacity="0.15" />
        <ellipse cx="128" cy="122" rx="14" ry="10" fill="#ff9a9e" fillOpacity="0.15" />
        
        {/* Hair/Hijab */}
        <path d="M42 98C42 55 62 35 100 35C138 35 158 55 158 98C158 122 153 142 145 158" 
              stroke="url(#hairTexture)" strokeWidth="14" strokeLinecap="round" fill="none" />
        <path d="M42 98C42 122 47 142 55 158" 
              stroke="url(#hairTexture)" strokeWidth="14" strokeLinecap="round" fill="none" />

        {/* Eyes */}
        <g transform="translate(100, 103)">
          {blink ? (
            <path d="M-36 -2Q-22 4 -8 -2 M8 -2Q22 4 36 -2" 
                  stroke="#3e2723" strokeWidth="3.5" strokeLinecap="round" />
          ) : (
            <>
              <path d="M-40 0Q-23 -20 -6 0Q-23 20 -40 0Z" fill="#ffffff" />
              <path d="M6 0Q23 -20 40 0Q23 20 6 0Z" fill="#ffffff" />
              <circle cx="-23" cy="0" r="10" fill="url(#eyeDeep)" />
              <circle cx="23" cy="0" r="10" fill="url(#eyeDeep)" />
              <circle cx="-23" cy="0" r="5" fill="#000000" />
              <circle cx="23" cy="0" r="5" fill="#000000" />
              <circle cx="-26" cy="-4" r="3.5" fill="white" fillOpacity="0.9" />
              <circle cx="20" cy="-4" r="3.5" fill="white" fillOpacity="0.9" />
            </>
          )}
        </g>

        {/* Eyebrows */}
        <path d="M62 88Q75 85 88 87" stroke="#3e2723" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
        <path d="M112 87Q125 85 138 88" stroke="#3e2723" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />

        {/* Mouth */}
        <g transform="translate(100, 142)">
          {!isSpeaking ? (
            <path d="M-12 0Q0 6 12 0" stroke="#c1727a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          ) : (
            <>
              {mouthState === 2 || mouthState === 3 ? (
                <path d={`M-13 0 Q0 ${mouthState === 3 ? 18 : 12} 13 0 Q0 ${mouthState === 3 ? 10 : 6} -13 0Z`} fill="#8b5a5f" />
              ) : (
                <path d="M-11 0 Q0 7 11 0" stroke="#c1727a" strokeWidth="4" strokeLinecap="round" fill="none" />
              )}
            </>
          )}
        </g>

        {/* Lantern */}
        <g transform="translate(25, 175) scale(0.68)">
          <path d="M20 10L10 30V80L20 100H40L50 80V30L40 10H20Z" fill="#c9a961" stroke="#5d3a24" strokeWidth="2.5" />
          <rect x="17" y="35" width="26" height="40" fill="#fffde7" opacity={isSpeaking ? "1" : "0.85"}>
            <animate attributeName="opacity" values="0.85;1;0.85" dur="0.3s" repeatCount="indefinite" />
          </rect>
          <path d="M15 35L45 75 M45 35L15 75 M10 55H50" stroke="#5d3a24" strokeWidth="1.8" />
        </g>
      </svg>
    </div>
  );
};

// Floating Stars
const FloatingStars = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`
        }}
      >
        <Star className="w-2 h-2 text-yellow-200/30" fill="currentColor" />
      </div>
    ))}
  </div>
);

// Crescent Moon
const CrescentMoon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor">
    <path d="M50,10 A40,40 0 1,0 50,90 A30,30 0 1,1 50,10 Z" />
  </svg>
);

// Main Share Dua Page
export default function ShareDuaPage() {
  const [duaText, setDuaText] = useState('');
  const [author, setAuthor] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (duaText.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 500);
      return () => clearTimeout(timer);
    }
  }, [duaText]);

  const handleSubmit = () => {
    if (!duaText.trim()) return;

    const newDua = {
      id: Date.now(),
      text: duaText.trim(),
      author: author.trim() || 'زائر كريم',
      likes: 0,
      timestamp: Date.now()
    };

    const saved = JSON.parse(localStorage.getItem('community_duas') || '[]');
    localStorage.setItem('community_duas', JSON.stringify([newDua, ...saved]));

    setSubmitted(true);
    setTimeout(() => {
      setDuaText('');
      setAuthor('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 relative overflow-hidden">
      <FloatingStars />
      
      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <CrescentMoon className="w-12 h-12 text-yellow-500 mx-auto mb-4 animate-pulse" />
          <h1 className="font-serif text-4xl md:text-5xl text-amber-50 mb-3">
            صياغة الدعاء
          </h1>
          <p className="text-amber-50/70 text-lg">
            شاركنا دعاءك ليؤمّن عليه إخوانك المسلمون
          </p>
          
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-yellow-600/50 to-yellow-600/50"></div>
            <Sparkles className="w-4 h-4 text-yellow-600" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-yellow-600/50 to-yellow-600/50"></div>
          </div>
        </div>

        {/* Main Content - Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Avatar Side */}
          <div className="flex flex-col items-center justify-center animate-slideRight">
            <HeroAvatar isSpeaking={isTyping} size={420} />
            
            <div className="mt-8 text-center px-6 py-4 bg-blue-950/30 backdrop-blur-sm rounded-2xl border border-yellow-600/20">
              <p className="text-amber-50/70 text-base font-serif">
                {isTyping ? (
                  <span className="flex items-center justify-center gap-2">
                    ✍️ تكتب دعاءً مباركاً...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    🤲 في انتظار دعائك الجميل
                  </span>
                )}
              </p>
            </div>

            {duaText.length > 0 && (
              <div className="mt-4 text-center animate-fadeIn">
                <p className="text-yellow-500/80 text-sm font-serif">
                  {duaText.length} حرف - بارك الله فيك ✨
                </p>
              </div>
            )}
          </div>

          {/* Form Side */}
          <div className="bg-gradient-to-br from-blue-950/40 via-blue-900/30 to-blue-950/40 backdrop-blur-sm p-8 rounded-3xl border border-yellow-600/20 shadow-2xl animate-slideLeft">
            {submitted ? (
              <div className="text-center py-12 animate-fadeIn">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif text-amber-50 mb-2">تم بنجاح!</h3>
                <p className="text-amber-50/60">آمين، تقبل الله دعاءك 🤲</p>
              </div>
            ) : (
              <div className="space-y-6" dir="rtl">
                <div>
                  <label className="block text-amber-50 mb-2 font-serif text-lg flex items-center gap-2">
                    <Moon className="w-5 h-5 text-yellow-500" />
                    اسمك (اختياري)
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="زائر كريم"
                    className="w-full px-5 py-4 bg-blue-950/50 border border-yellow-600/20 rounded-2xl text-amber-50 placeholder:text-amber-50/30 focus:outline-none focus:border-yellow-600/50 focus:ring-2 focus:ring-yellow-600/20 transition-all"
                    maxLength={50}
                  />
                </div>

                <div>
                  <label className="block text-amber-50 mb-2 font-serif text-lg flex items-center gap-2">
                    <Feather className="w-5 h-5 text-yellow-500" />
                    دعاؤك *
                  </label>
                  <textarea
                    value={duaText}
                    onChange={(e) => setDuaText(e.target.value)}
                    placeholder="اللهم..."
                    className="w-full px-5 py-4 bg-blue-950/50 border border-yellow-600/20 rounded-2xl text-amber-50 placeholder:text-amber-50/30 focus:outline-none focus:border-yellow-600/50 focus:ring-2 focus:ring-yellow-600/20 transition-all min-h-[220px] font-serif text-xl leading-loose resize-none"
                    maxLength={500}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-amber-50/40 text-sm">
                      {duaText.length}/500 حرف
                    </p>
                    {duaText.length > 0 && (
                      <p className="text-yellow-500/60 text-xs animate-pulse">
                        ✨ جميل! استمر...
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!duaText.trim()}
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-blue-950 font-bold py-5 px-8 rounded-2xl text-lg hover:from-yellow-500 hover:to-yellow-400 shadow-xl shadow-yellow-600/30 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                >
                  <Send className="w-5 h-5" />
                  شارك الدعاء
                </button>

                <p className="text-amber-50/40 text-sm text-center pt-2">
                  سيظهر دعاؤك في صفحة المجتمع ليؤمّن عليه الجميع 🌙
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slideRight {
          animation: slideRight 0.8s ease-out;
        }

        .animate-slideLeft {
          animation: slideLeft 0.8s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
