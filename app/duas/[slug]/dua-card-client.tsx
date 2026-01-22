'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Copy, Heart, Volume2, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { cn } from '@/lib/utils';

interface DuaCardClientProps {
  title: string;
  dua: string;
}

export default function DuaCardClient({ title, dua }: DuaCardClientProps) {
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [savedDuas, setSavedDuas] = useLocalStorage<any[]>('saved_duas', []);
  const isSaved = savedDuas.some(d => d.dua === dua);

  useEffect(() => {
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined)
      window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handlePlayPause = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) { window.speechSynthesis.cancel(); setIsPlaying(false); return; }
      const utter = new SpeechSynthesisUtterance(dua);
      const arabicVoices = voices.filter(v => v.lang.startsWith('ar'));
      utter.voice = arabicVoices[0] || null;
      utter.lang = 'ar-SA';
      utter.rate = 0.85;
      utter.onstart = () => setIsPlaying(true);
      utter.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utter);
    } else {
      toast({ title: 'غير مدعوم', description: 'المتصفح لا يدعم قراءة النصوص.', variant: 'destructive' });
    }
  };

  const handleCopy = () => { navigator.clipboard.writeText(dua); toast({ title: 'تم نسخ الدعاء' }); };
  const handleSave = () => {
    if (isSaved) setSavedDuas(savedDuas.filter(d => d.dua !== dua));
    else setSavedDuas([...savedDuas, { title, dua }]);
    toast({ title: isSaved ? 'تمت الإزالة من الأدعية' : 'تم الحفظ في الأدعية' });
  };

  return (
    <div className="bg-card p-6 rounded-3xl shadow-lg text-center text-2xl">
      <h1 className="text-gold text-3xl mb-4">{title}</h1>
      <p className="mb-6 whitespace-pre-line">{dua}</p>
      <div className="flex justify-center gap-6">
        <button onClick={handleCopy} className="text-cream hover:text-gold"><Copy /> نسخ</button>
        <button onClick={handleSave} className={cn('hover:text-gold', isSaved && 'text-gold')}><Heart /> حفظ</button>
        <button onClick={handlePlayPause} className="hover:text-gold">
          {isPlaying ? <VolumeX /> : <Volume2 />} استماع
        </button>
      </div>
    </div>
  );
}
