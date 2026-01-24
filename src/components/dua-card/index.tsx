'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Copy, Share2, Volume2, Heart, VolumeX } from 'lucide-react';
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
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [mounted, setMounted] = useState(false);

  const [savedDuas = [], setSavedDuas] =
    useLocalStorage<any[]>('saved_duas', []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isSaved = useMemo(
    () => isInitiallySaved || savedDuas.some(d => d?.dua === dua),
    [savedDuas, dua, isInitiallySaved]
  );

  // تحميل الأصوات بعد الـ mount
  useEffect(() => {
    if (!mounted || !('speechSynthesis' in window)) return;

    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [mounted]);

  if (!mounted) return null; // ⬅️ مهم جدًا

  const handleCopy = () => {
    navigator.clipboard.writeText(dua);
    toast({ title: 'تم نسخ الدعاء' });
  };

  const handleSave = () => {
    if (onSaveToggle) return onSaveToggle();

    if (isSaved) {
      setSavedDuas(savedDuas.filter(d => d.dua !== dua));
      toast({ title: 'تمت الإزالة من أدعيتك' });
    } else {
      setSavedDuas([...savedDuas, { title, dua }]);
      toast({ title: 'تم الحفظ في أدعيتك' });
    }
  };

  const handlePlayPause = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(dua);
    const arabicVoices = voices.filter(v => v.lang.startsWith('ar'));

    utterance.voice = arabicVoices[0];
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const shareLink = `/generate-card?title=${encodeURIComponent(title)}&dua=${encodeURIComponent(dua)}`;

  return (
    <Card className="bg-card-gradient text-white rounded-3xl shadow-2xl font-amiri">
      <CardHeader className="text-center">
        <CardTitle className="text-gold text-2xl">{title}</CardTitle>
        {author && <p className="text-sm opacity-70">بواسطة: {author}</p>}
      </CardHeader>

      <CardContent className="text-center text-3xl leading-loose px-6 py-8">
        <p className="whitespace-pre-line">{dua}</p>
      </CardContent>

      {showActions && (
        <CardFooter className="flex justify-center gap-6 bg-black/20">
          <button onClick={handleCopy}><Copy /></button>

          <Link href={shareLink}><Share2 /></Link>

          <button onClick={handleSave}>
            <Heart className={cn(isSaved && 'fill-current text-gold')} />
          </button>

          <button onClick={handlePlayPause}>
            {isPlaying ? <VolumeX className="text-gold" /> : <Volume2 />}
          </button>

          {audioUrl && <audio ref={audioRef} src={audioUrl} />}
        </CardFooter>
      )}
    </Card>
  );
};

export default DuaCard;
