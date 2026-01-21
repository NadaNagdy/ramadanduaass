'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Share2, Volume2, Save, Check, Printer, Heart, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface DuaCardProps {
  day?: number;
  title: string;
  dua: string;
  audioUrl?: string;
  showActions?: boolean;
  isInitiallySaved?: boolean;
  onSaveToggle?: () => void;
  author?: string;
}

const DuaCard: React.FC<DuaCardProps> = ({ 
  day,
  title, 
  dua, 
  audioUrl,
  showActions = true,
  isInitiallySaved = false,
  onSaveToggle,
  author,
}) => {
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [savedDuas, setSavedDuas] = useLocalStorage<any[]>('saved_duas', []);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const isSaved = isInitiallySaved || savedDuas.some(savedDua => savedDua.dua === dua);
  
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(dua);
    toast({ title: 'تم نسخ الدعاء' });
  };

  const handlePlayPause = () => {
    if (audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      return;
    }

    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(dua);
        
        // --- منطق اختيار الصوت النسائي ---
        const arabicVoices = voices.filter(voice => voice.lang.startsWith('ar'));
        
        // البحث عن كلمات دلالية للأصوات النسائية المشهورة
        const femaleVoice = arabicVoices.find(voice => {
          const name = voice.name.toLowerCase();
          return (
            name.includes('female') || 
            name.includes('leila') ||   // macOS/iOS
            name.includes('mariam') ||  // Windows/Google
            name.includes('zira') ||    // Windows
            name.includes('muna') ||    // macOS
            name.includes('hoda')       // Google
          );
        });

        // إذا لم نجد صوتاً نسائياً محدداً، نأخذ أول صوت عربي متاح
        const finalVoice = femaleVoice || arabicVoices[0];
        
        if (finalVoice) {
          utterance.voice = finalVoice;
        }
        
        utterance.lang = 'ar-SA';
        utterance.rate = 0.85; // سرعة هادئة ووقورة
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = (event) => {
          console.error('Speech error:', event);
          setIsPlaying(false);
        };
        
        window.speechSynthesis.speak(utterance);
      }
    } else {
      toast({
        variant: "destructive",
        title: "غير مدعوم",
        description: "المتصفح لا يدعم قراءة النصوص.",
      });
    }
  };

  useEffect(() => {
    return () => {
      if (isPlaying) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying]);
  
  const handleSave = () => {
    if (onSaveToggle) {
        onSaveToggle();
        return;
    }
    if (isSaved) {
      setSavedDuas(savedDuas.filter(d => d.dua !== dua));
      toast({ title: 'تمت الإزالة من أدعيتك' });
    } else {
      setSavedDuas([...savedDuas, { title, dua }]);
      toast({ title: 'تم الحفظ في أدعيتك' });
    }
  };

  const shareLink = `/generate-card?title=${encodeURIComponent(title)}&dua=${encodeURIComponent(dua)}`;

  return (
    <Card className="bg-card-gradient text-white border-gold/30 rounded-3xl shadow-2xl font-amiri overflow-hidden">
      <CardHeader className="text-center">
        <CardTitle className="text-gold text-2xl">{title}</CardTitle>
        {author && <p className="text-cream/70 text-sm mt-1">بواسطة: {author}</p>}
      </CardHeader>
      <CardContent className="text-center text-3xl leading-loose px-6 sm:px-12 py-8">
        <p className="whitespace-pre-line">{dua}</p>
      </CardContent>
      {showActions && (
        <CardFooter className="bg-black/20 p-4 flex justify-center items-center gap-6">
          <button onClick={handleCopy} className="flex flex-col items-center gap-1 text-[#f8f1e7]/60 hover:text-[#d4af37] transition-colors">
            <Copy className="w-5 h-5" />
            <span className="text-[10px]">نسخ</span>
          </button>
          
          <Link href={shareLink} legacyBehavior>
            <a className="flex flex-col items-center gap-1 text-[#f8f1e7]/60 hover:text-[#d4af37] transition-colors">
              <Share2 className="w-5 h-5" />
              <span className="text-[10px]">مشاركة</span>
            </a>
          </Link>

          <button onClick={handleSave} className="flex flex-col items-center gap-1 text-[#f8f1e7]/60 hover:text-[#d4af37] transition-colors">
             <Heart className={cn("w-5 h-5", isSaved && "fill-current text-gold")} />
            <span className="text-[10px]">حفظ</span>
          </button>
          
          <button 
            onClick={handlePlayPause} 
            className="flex flex-col items-center gap-1 text-[#f8f1e7]/60 hover:text-[#d4af37] transition-colors" 
          >
            {isPlaying ? (
              <VolumeX className="w-5 h-5 text-gold animate-pulse" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
            <span className="text-[10px]">{isPlaying ? 'إيقاف' : 'استماع'}</span>
          </button>
          
          {audioUrl && <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />}
        </CardFooter>
      )}
    </Card>
  );
};

export default DuaCard;
