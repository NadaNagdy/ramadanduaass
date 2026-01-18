'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Volume2, VolumeX } from 'lucide-react';
import { getRandomReflection, type Reflection } from '@/lib/reflections';

const RamadanReflection = () => {
  const [reflection, setReflection] = useState<Reflection | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setReflection(getRandomReflection());
  }, []);

  useEffect(() => {
    if (reflection) {
      const newUtterance = new SpeechSynthesisUtterance(reflection.dua);
      newUtterance.lang = 'ar-SA'; // اللغة العربية
      newUtterance.rate = 0.8; // سرعة القراءة
      newUtterance.pitch = 1; // نبرة الصوت
      
      newUtterance.onend = () => {
        setIsPlaying(false);
      };

      setUtterance(newUtterance);
    }

    return () => {
      window.speechSynthesis.cancel();
    };
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

  if (!reflection) {
    return null;
  }

  return (
    <section className="py-20 animate-fade-in" style={{ animationDelay: '0.5s' }}>
      <div className="container mx-auto px-4">
        <Card className="bg-card-gradient text-cream rounded-3xl shadow-2xl max-w-3xl mx-auto overflow-hidden border border-gold/20">
          <CardHeader className="flex flex-row items-center justify-center p-6">
            <CardTitle className="flex items-center gap-3 text-3xl font-cairo text-gold">
              <Sparkles className="w-7 h-7 text-gold animate-pulse" />
              تأملات رمضانية
              <Sparkles className="w-7 h-7 text-gold animate-pulse" />
            </CardTitle>
          </CardHeader>
          <CardContent className="px-10 pb-10 pt-4" dir="rtl">
            <div className="space-y-6 text-right">
              <h3 className="text-3xl font-amiri text-gold text-center">
                {reflection.title}
              </h3>
              
              <div className="bg-cream/5 p-6 rounded-xl">
                <p className="text-xl font-amiri leading-relaxed text-center italic">
                  "{reflection.verse}"
                </p>
                <p className="text-sm text-gold/80 text-center mt-2">
                  {reflection.verseReference}
                </p>
              </div>

              <p className="text-lg font-amiri leading-relaxed">
                {reflection.reflection}
              </p>

              <div className="bg-gold/10 p-4 rounded-xl relative">
                <p className="text-lg font-amiri leading-relaxed italic pr-12">
                  {reflection.dua}
                </p>
                
                {/* زر الاستماع */}
                <button
                  onClick={togglePlayPause}
                  className="absolute top-4 left-4 bg-gold/20 hover:bg-gold/30 text-gold p-2 rounded-full transition-all duration-300 hover:scale-110"
                  aria-label={isPlaying ? 'إيقاف الاستماع' : 'الاستماع للدعاء'}
                >
                  {isPlaying ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RamadanReflection;
