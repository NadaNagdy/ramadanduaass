'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Volume2, VolumeX, link as LinkIcon } from 'lucide-react'; // أضفنا أيقونة الرابط
import Link from 'next/link';
import { getRandomReflection, type Reflection } from '@/lib/reflections';

const RamadanReflection = () => {
  const [reflection, setReflection] = useState<Reflection | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  // مصفوفة الأقسام التي تحتاج لدعم الأرشفة (الـ 18 صفحة)
  const priorityLinks = [
    { href: '/categories/adeyat-nisf-shaban', label: 'أدعية نصف شعبان' },
    { href: '/categories/adeyat-alrezq', label: 'أدعية الرزق والبركة' },
    { href: '/categories/adeyat-almared', label: 'أدعية الشفاء للمريض' },
    { href: '/categories/adeyat-alzawaj', label: 'أدعية تيسير الزواج' },
    { href: '/blog/fadl-istighfar', label: 'أسرار الاستغفار' },
  ];

  useEffect(() => {
    setReflection(getRandomReflection());
  }, []);

  useEffect(() => {
    if (reflection && typeof window !== 'undefined') {
      const newUtterance = new SpeechSynthesisUtterance(reflection.dua);
      newUtterance.lang = 'ar-SA';
      newUtterance.rate = 0.8;
      newUtterance.onend = () => setIsPlaying(false);
      setUtterance(newUtterance);
    }
    return () => window.speechSynthesis?.cancel();
  }, [reflection]);

  const togglePlayPause = () => {
    if (!utterance) return;
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  if (!reflection) return null;

  return (
    <section className="py-20 animate-fade-in">
      <div className="container mx-auto px-4">
        <Card className="bg-card-gradient text-cream rounded-3xl shadow-2xl max-w-3xl mx-auto overflow-hidden border border-gold/20">
          <CardHeader className="flex flex-row items-center justify-center p-6 border-b border-gold/10">
            <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl font-cairo text-gold">
              <Sparkles className="w-6 h-6 animate-pulse" />
              تأملات رمضانية 2026
              <Sparkles className="w-6 h-6 animate-pulse" />
            </CardTitle>
          </CardHeader>

          <CardContent className="px-6 md:px-10 pb-8 pt-6" dir="rtl">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-amiri text-gold text-center font-bold">
                {reflection.title}
              </h3>
              
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <p className="text-lg md:text-xl font-amiri leading-relaxed text-center italic">
                  "{reflection.verse}"
                </p>
                <p className="text-xs text-gold/80 text-center mt-3 font-cairo uppercase tracking-widest">
                  {reflection.verseReference}
                </p>
              </div>

              <p className="text-lg font-amiri leading-relaxed text-right text-cream/90">
                {reflection.reflection}
              </p>

              <div className="bg-gold/10 p-5 rounded-2xl relative border border-gold/20">
                <p className="text-lg font-amiri leading-relaxed italic pr-2 pl-12 text-gold-light">
                  {reflection.dua}
                </p>
                <button
                  onClick={togglePlayPause}
                  className="absolute bottom-4 left-4 bg-gold text-navy p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform"
                  aria-label="استمع للدعاء"
                >
                  {isPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>

              {/* قسم الروابط الذكي لحل مشكلة الـ Indexing */}
              <div className="mt-8 pt-6 border-t border-gold/10">
                <p className="text-xs font-cairo text-gold/60 mb-4 text-center">أدعية قد تحتاجها الآن:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {priorityLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      className="text-xs font-cairo bg-white/5 hover:bg-gold/20 border border-white/10 hover:border-gold/50 px-3 py-1.5 rounded-full transition-all text-cream/80 hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RamadanReflection;
