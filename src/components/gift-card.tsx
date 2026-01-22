"use client";

import React, { useState } from 'react';
import { Gift, Sparkles } from 'lucide-react';
import DuaCard from '@/components/dua-card';

interface GiftCardProps {
  dua: string;
}

export default function GiftCard({ dua }: GiftCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  if (isOpen) {
    return (
      <div className="relative">
        {/* الكونفيتي */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl animate-confetti"
                style={{
                  left: ⁠ ${50 + (Math.random() - 0.5) * 40}% ⁠,
                  top: '50%',
                  animationDelay: ⁠ ${Math.random() * 0.3}s ⁠,
                  animationDuration: ⁠ ${1.5 + Math.random() * 0.5}s ⁠
                }}
              >
                {['✨', '🌟', '💫', '⭐'][Math.floor(Math.random() * 4)]}
              </div>
            ))}
          </div>
        )}

        {/* الدعاء */}
        <div className="animate-scale-in">
          <DuaCard 
            title="تهادوا الحب غيباً بالدعاء" 
            dua={dua} 
            showActions={true}
          />

          {/* زر إعادة الإغلاق */}
          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 w-full py-3 bg-gold/10 border border-gold/30 rounded-2xl text-gold hover:bg-gold/20 transition-all text-sm font-cairo"
          >
            إعادة لف الهدية 🎁
          </button>
        </div>

        <style jsx>{`
          @keyframes confetti {
            0% {
              transform: translateY(0) translateX(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(-300px) translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 720}deg);
              opacity: 0;
            }
          }

          .animate-confetti {
            animation: confetti forwards;
          }

          @keyframes scale-in {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          .animate-scale-in {
            animation: scale-in 0.5s ease-out;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="relative animate-fade-in">
      {/* Gift Box */}
      <div 
        onClick={handleOpen}
        className="relative cursor-pointer group"
      >
        {/* الهدية */}
        <div className="bg-gradient-to-br from-gold/20 to-gold/5 border-2 border-gold/40 rounded-3xl p-12 text-center hover:shadow-2xl hover:shadow-gold/20 transition-all duration-500 min-h-[300px] flex flex-col justify-center transform hover:scale-[1.02]">
          
          {/* الشريطة العمودية */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-full bg-gradient-to-b from-gold via-gold-light to-gold/50 opacity-60" />
          
          {/* الشريطة الأفقية */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-16 bg-gradient-to-r from-gold via-gold-light to-gold/50 opacity-60" />
          
          {/* الفيونكة */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
            <div className="relative">
              <Gift className="w-16 h-16 text-gold drop-shadow-lg animate-float" />
              <Sparkles className="w-6 h-6 text-gold-light absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>

          {/* المحتوى */}
          <div className="relative z-10 mt-8">
            <h3 className="font-amiri text-3xl text-gold mb-4 animate-pulse">
              تهادوا الحب غيباً
            </h3>
            <p className="text-cream/60 text-lg font-cairo mb-6">
              اضغط لفتح هديتك الروحانية
            </p>
            
            {/* زخارف */}
            <div className="flex justify-center gap-2 text-gold/40">
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0s' }}>✨</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎁</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>✨</span>
            </div>
          </div>

          {/* تأثير التوهج */}
          <div className="absolute inset-0 bg-gradient-radial from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
