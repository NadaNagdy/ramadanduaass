"use client";

import React, { useState } from 'react';
import { Gift, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DuaCard from './dua-card';

interface GiftCardProps {
  dua: string;
}

export default function GiftCard({ dua }: GiftCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="gift"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative"
          >
            {/* Gift Box */}
            <div 
              onClick={() => setIsOpen(true)}
              className="relative cursor-pointer group"
            >
              {/* الهدية */}
              <div className="bg-gradient-to-br from-gold/20 to-gold/5 border-2 border-gold/40 rounded-3xl p-12 text-center hover:shadow-2xl hover:shadow-gold/20 transition-all duration-500">
                
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
                    <span className="text-2xl">✨</span>
                    <span className="text-2xl">🎁</span>
                    <span className="text-2xl">✨</span>
                  </div>
                </div>

                {/* تأثير التوهج */}
                <div className="absolute inset-0 bg-gradient-radial from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            {/* الكونفيتي */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    y: 0, 
                    x: Math.random() * 100 - 50,
                    opacity: 1,
                    scale: 1
                  }}
                  animate={{ 
                    y: -200, 
                    x: Math.random() * 200 - 100,
                    opacity: 0,
                    scale: 0.5,
                    rotate: Math.random() * 360
                  }}
                  transition={{ 
                    duration: 1.5,
                    delay: Math.random() * 0.3
                  }}
                  className="absolute top-1/2 left-1/2 text-2xl"
                >
                  {['✨', '🌟', '💫', '⭐'][Math.floor(Math.random() * 4)]}
                </motion.div>
              ))}
            </div>

            {/* الدعاء */}
            <DuaCard 
              title="تهادوا الحب غيباً" 
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
