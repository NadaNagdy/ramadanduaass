'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Moon, Sparkles } from 'lucide-react';

const RamadanCountdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState<any>(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const calculate = () => {
      const diff = +new Date(targetDate) - +new Date();
      if (diff <= 0) {
        setIsFinished(true);
        return;
      }
      setTimeLeft({
        يوم: Math.floor(diff / (1000 * 60 * 60 * 24)),
        ساعة: Math.floor((diff / (1000 * 60 * 60)) % 24),
        دقيقة: Math.floor((diff / 1000 / 60) % 60),
        ثانية: Math.floor((diff / 1000) % 60),
      });
    };

    const timer = setInterval(calculate, 1000);
    calculate();
    return () => clearInterval(timer);
  }, [targetDate]);

  if (isFinished) {
    return (
      <div className="animate-pulse bg-gold p-6 rounded-2xl text-navy font-bold text-center shadow-2xl border-2 border-white/20">
        <Sparkles className="inline-block mb-2 w-6 h-6" />
        <p className="text-xl">مبارك عليكم شهر رمضان المبارك!</p>
        <Link href="/daily-duas/day-1" className="inline-block mt-3 px-6 py-2 bg-navy text-gold rounded-full hover:bg-navy/90 transition-colors text-sm">
          ابدأ أدعية اليوم الأول
        </Link>
      </div>
    );
  }

  if (!timeLeft) return null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2 md:gap-4" dir="ltr">
        {Object.entries(timeLeft).map(([label, value]: any) => (
          <div key={label} className="flex flex-col items-center">
            <div className="relative bg-navy/80 border-2 border-gold/30 rounded-2xl w-full py-4 shadow-lg flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-2xl md:text-4xl font-bold text-gold font-mono drop-shadow-sm">
                {value.toString().padStart(2, '0')}
              </span>
            </div>
            <span className="text-[10px] md:text-xs font-cairo text-gold/90 mt-2 font-bold uppercase tracking-wider">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RamadanCountdown;
