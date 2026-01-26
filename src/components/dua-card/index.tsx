
'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Copy, Share2, Volume2, Heart, VolumeX, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { cn } from '@/lib/utils';

interface DuaCardProps {
  title: string;
  dua: string;
  category?: string;
  showActions?: boolean;
  isInitiallySaved?: boolean;
  onSaveToggle?: () => void;
  author?: string;
}

const DuaCard: React.FC<DuaCardProps> = ({
  title,
  dua,
  category = 'أدعية رمضان',
  showActions = true,
  isInitiallySaved = false,
  onSaveToggle,
  author,
}) => {
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const [savedDuas = [], setSavedDuas] = useLocalStorage<any[]>('saved_duas', []);

  // معالجة الـ Hydration لضمان توافق السيرفر مع الكلاينت
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        setVoices(window.speechSynthesis.getVoices());
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const isSaved = useMemo(
    () => isInitiallySaved || savedDuas.some(d => d?.dua === dua),
    [savedDuas, dua, isInitiallySaved]
  );

  if (!mounted) return null;

  // وظيفة النسخ
  const handleCopy = async () => {
    await navigator.clipboard.writeText(dua);
    setCopied(true);
    toast({ title: 'تم نسخ الدعاء' });
    setTimeout(() => setCopied(false), 2000);
  };

  // وظيفة الحفظ
  const handleSave = () => {
    if (onSaveToggle) return onSaveToggle();

    if (isSaved) {
      setSavedDuas(savedDuas.filter(d => d.dua !== dua));
      toast({ title: 'تمت الإزالة من أدعيتك' });
    } else {
      setSavedDuas([...savedDuas, { title, dua, category }]);
      toast({ title: 'تم الحفظ في أدعيتك' });
    }
  };

  // وظيفة المشاركة المتقدمة
  const handleShare = async () => {
    setSharing(true);
    try {
      const siteUrl = window.location.origin;
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: `${dua}\n\nتمت المشاركة من تطبيق أدعية رمضان`,
          url: siteUrl,
        });
      } else {
        const shareText = `${dua}\n\n🌐 ${siteUrl}`;
        await navigator.clipboard.writeText(shareText);
        toast({ title: 'تم نسخ رابط المشاركة' });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setSharing(false);
    }
  };

  // وظيفة القراءة الصوتية
  const handlePlayPause = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(dua);
    const arabicVoices = voices.filter(v => v.lang.startsWith('ar'));
    
    // محاولة اختيار صوت نسائي إذا وجد، وإلا أول صوت عربي
    utterance.voice = arabicVoices.find(v => v.name.includes('female') || v.name.includes('Zira')) || arabicVoices[0];
    utterance.lang = 'ar-SA';
    utterance.rate = 0.9;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Card className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden group transition-all hover:border-white/20">
      <CardHeader className="text-center pb-2">
        <div className="flex justify-between items-start mb-2">
          <span className="bg-gold/10 text-gold text-[10px] px-3 py-1 rounded-full border border-gold/20 uppercase tracking-wider">
            {category}
          </span>
          <button 
            onClick={handleSave}
            className="text-white/60 hover:text-gold transition-colors"
          >
            <Heart className={cn("w-5 h-5", isSaved && "fill-gold text-gold")} />
          </button>
        </div>
        <CardTitle className="text-gold text-2xl font-amiri tracking-wide">{title}</CardTitle>
        {author && <p className="text-xs text-white/50 font-cairo">بواسطة: {author}</p>}
      </CardHeader>

      <CardContent className="text-center px-8 py-6">
        <p className="text-white/90 text-2xl md:text-3xl leading-relaxed font-amiri whitespace-pre-line">
          {dua}
        </p>
      </CardContent>

      {showActions && (
        <CardFooter className="flex justify-center gap-4 py-6 bg-white/5">
          {/* زر النسخ */}
          <button
            onClick={handleCopy}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/5"
            title="نسخ"
          >
            {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
          </button>

          {/* زر المشاركة */}
          <button
            onClick={handleShare}
            disabled={sharing}
            className="p-3 rounded-full bg-gold/10 hover:bg-gold/20 text-gold transition-all border border-gold/20 disabled:opacity-50"
            title="مشاركة"
          >
            {sharing ? (
              <div className="w-5 h-5 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
            ) : (
              <Share2 className="w-5 h-5" />
            )}
          </button>

          {/* زر الصوت */}
          <button
            onClick={handlePlayPause}
            className={cn(
              "p-3 rounded-full transition-all border",
              isPlaying ? "bg-gold text-black border-gold" : "bg-white/5 text-white border-white/5 hover:bg-white/10"
            )}
            title="استماع"
          >
            {isPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </CardFooter>
      )}
    </Card>
  );
};

export default DuaCard;
