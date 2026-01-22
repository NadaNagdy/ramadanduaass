"use client";

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FloatingStars, Lantern } from '@/components/islamic-decorations';
import GiftCard from '@/components/gift-card';
import { Sparkles } from 'lucide-react';

// Component داخلي يستخدم useSearchParams
function SharedDuaContent() {
  const searchParams = useSearchParams();
  const [dua, setDua] = useState('');
  const [senderName, setSenderName] = useState('');
  
  useEffect(() => {
    const duaParam = searchParams.get('dua');
    const nameParam = searchParams.get('from');
    
    if (duaParam) {
      setDua(decodeURIComponent(duaParam));
    }
    if (nameParam) {
      setSenderName(decodeURIComponent(nameParam));
    }
  }, [searchParams]);

  if (!dua) {
    return (
      <div className="text-center text-gold font-amiri text-2xl">
        جاري التحميل...
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="inline-block p-4 bg-gold/10 rounded-full mb-6 animate-float">
          <Sparkles className="w-12 h-12 text-gold" />
        </div>
        
        {senderName && (
          <h1 className="font-amiri text-3xl md:text-4xl text-gold mb-4">
            {senderName} أرسل لك هدية روحانية 🎁
          </h1>
        )}
        
        <p className="text-cream/70 text-lg font-cairo">
          دعاء خاص من القلب
        </p>
      </div>

      {/* Gift Card */}
      <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <GiftCard dua={dua} />
      </div>

      {/* Footer Message */}
      <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <p className="text-cream/60 font-amiri text-lg italic">
          "تهادوا تحابوا"
        </p>
        <p className="text-gold/40 text-sm mt-2 font-cairo">
          شارك الخير مع من تحب
        </p>
      </div>

      {/* Decorative Lanterns */}
      <div className="mt-20 opacity-30 pointer-events-none flex justify-center gap-20">
        <Lantern className="w-16 h-16 text-gold animate-float" />
        <Lantern className="w-16 h-16 text-gold animate-float" style={{ animationDelay: '1.5s' }} />
      </div>
    </>
  );
}

// الـ Component الرئيسي
export default function SharedDuaPage() {
  return (
    <div className="min-h-screen bg-hero-gradient pt-20 pb-20 px-4">
      <FloatingStars />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <Suspense fallback={
          <div className="text-center text-gold font-amiri text-2xl animate-pulse">
            جاري التحميل...
          </div>
        }>
          <SharedDuaContent />
        </Suspense>
      </div>
    </div>
  );
}
