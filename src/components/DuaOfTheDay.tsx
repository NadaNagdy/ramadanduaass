"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Volume2, VolumeX, PlayCircle } from 'lucide-react';
import { dailyDuas } from '@/lib/duas';
import { Button } from './ui/button';
import Link from 'next/link';

interface DuaOfTheDayProps {
  dua: typeof dailyDuas[0];
}

const DuaOfTheDay: React.FC<DuaOfTheDayProps> = ({ dua }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    setSynth(window.speechSynthesis);
  }, []);

  const handleSpeak = () => {
    if (!synth) return;

    if (isPlaying) {
      synth.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(dua.dua);
    utterance.lang = 'ar-SA';

    // محاولة العثور على صوت نسائي متاح في النظام
    const voices = synth.getVoices();
    const femaleVoice = voices.find(
      (voice) => 
        (voice.lang.includes('ar') && voice.name.toLowerCase().includes('female')) ||
        (voice.lang.includes('ar') && voice.name.toLowerCase().includes('zira')) || // صوت مشهور في ويندوز
        (voice.lang.includes('ar') && voice.name.toLowerCase().includes('leila'))   // صوت مشهور في أبل
    );

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    synth.speak(utterance);
  };

  return (
    <section className="py-20 animate-fade-in">
      <div className="container mx-auto px-4">
        <Card className="bg-card-gradient text-cream rounded-3xl shadow-2xl max-w-3xl mx-auto overflow-hidden border border-gold/20">
          <CardHeader className="flex flex-row items-center justify-between p-6">
            <CardTitle className="flex items-center gap-3 text-2xl font-cairo text-gold">
              <Star className="w-7 h-7 text-gold animate-float [animation-duration:5s]" />
              دعاء اليوم
            </CardTitle>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSpeak}
                className="text-gold hover:bg-gold/10 rounded-full"
                title={isPlaying ? "إيقاف" : "استماع لصوت نسائي"}
              >
                {isPlaying ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </Button>
              <span className="bg-gold/10 text-gold text-sm font-bold px-4 py-1.5 rounded-full">
                اليوم {dua.day} من رمضان
              </span>
            </div>
          </CardHeader>
          <CardContent className="px-10 pb-10 pt-4">
            <p className="text-3xl font-amiri leading-relaxed text-center mb-6">
              {dua.dua}
            </p>
            <div className="text-center space-y-4">
              <Link href={`/daily-duas/${dua.day}`}>
                <Button variant="link" className="text-gold/80 hover:text-gold">
                  عرض التفاصيل والمصادر
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DuaOfTheDay;
