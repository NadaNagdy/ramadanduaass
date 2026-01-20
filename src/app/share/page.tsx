'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FloatingStars, CrescentMoon, DecorativeDivider } from '@/components/islamic-decorations';
import { Send, User, Sparkles, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import DuaCard from '@/components/dua-card';
import { toPng } from 'html-to-image';
import HeroAvatar from '@/components/hero-avatar';

export default function ShareDuaClient() {
  const [name, setName] = useState('');
  const [dua, setDua] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRephrasing, setIsRephrasing] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  const duaCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dua.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 500);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [dua]);

  const handleRephrase = () => {
    if (!dua.trim()) return;
    setIsRephrasing(true);
    setTimeout(() => {
      setDua(dua + ' ✨'); // مثال تحسين دعاء
      setIsRephrasing(false);
      toast({ title: 'تم تحسين الدعاء' });
    }, 800);
  };

  const handleSubmit = () => {
    if (!dua.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsShared(true);
      toast({ title: 'تمت المشاركة بنجاح!' });
    }, 1000);
  };

  const handleShare = async () => {
    if (!duaCardRef.current) return;
    const dataUrl = await toPng(duaCardRef.current);
    const link = document.createElement('a');
    link.download = 'dua-card.png';
    link.href = dataUrl;
    link.click();
  };

  if (isShared) {
    return (
      <div className="min-h-screen bg-hero-gradient pt-32 pb-16 px-4 flex flex-col items-center justify-center">
        <FloatingStars />
        <div ref={duaCardRef}>
          <DuaCard title="دعاء من القلب" dua={dua} author={name.trim() || 'زائر كريم'} />
        </div>
        <h1 className="font-amiri text-4xl text-cream mb-4">شكراً لمشاركتك</h1>
        <Button onClick={handleShare} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl text-lg mb-4">
          <Share2 className="w-5 h-5 ml-2" /> مشاركة كصورة
        </Button>
        <Button onClick={() => { setIsShared(false); setDua(''); setName(''); }} className="bg-gold hover:bg-gold-light text-navy font-bold py-3 px-6 rounded-xl text-lg">
          مشاركة دعاء آخر
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero-gradient pt-32 pb-16 px-4">
      <FloatingStars />
      {/* ... باقي الكود كما هو ... */}
    </div>
  );
}
