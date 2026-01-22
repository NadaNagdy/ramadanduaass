'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Copy, Share2, Volume2, Heart, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { cn } from '@/lib/utils';

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
  
  // حل مشكلة Hydration (اختلاف السيرفر عن الكلاينت)
  const [isMounted, setIsMounted] = useState(false);
  const [savedDuas, setSavedDuas] = useLocalStorage<any[]>('saved_duas', []);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // التحقق من الحفظ يتم فقط بعد تحميل الصفحة في المتصفح
  const isSaved = isInitiallySaved || (isMounted && savedDuas.some(savedDua => savedDua.dua === dua));
  
  useEffect(() => {
    setIsMounted(true);
    
    const loadVoices = () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      }
    };

    loadVoices();
    if (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // دالة النسخ المحسنة
  const handleCopy = () => {
    navigator.clipboard.writeText(`${title}\n\n${dua}\n\nتم النسخ من منصة الأدعية`);
    toast({ title: '✅ تم نسخ الدعاء', description: "يمكنك لصقه الآن في أي مكان." });
  };

  // دالة المشاركة الذكية (Native Share)
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `${title}\n\n${dua.substring(0, 100)}...\n\nلقراءة الدعاء كاملاً:`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('User cancelled share');
      }
    } else {
      handleCopy();
      toast({ title: 'تم نسخ الرابط للمشاركة' });
    }
  };

  // دالة تشغيل الصوت
  const handlePlayPause = () => {
    // الأولوية لملف الصوت الخارجي إذا وجد
    if (audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      return;
    }

    // استخدام قارئ النصوص المدمج
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(dua);
        
        // اختيار صوت عربي مناسب
        const arabicVoices = voices.filter(voice => voice.lang.includes('ar'));
        const preferredVoice = arabicVoices.find(voice => {
            const name = voice.name.toLowerCase();
            return name.includes('google') || name.includes('leila') || name.includes('mariam');
        }) || arabicVoices[0];

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
        
        utterance.lang = 'ar-SA';
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        
        window.speechSynthesis.speak(utterance);
      }
    } else {
      toast({
        variant: "destructive",
        title: "عذراً",
        description: "جهازك لا يدعم قراءة النصوص العربية.",
      });
    }
  };

  // تنظيف الصوت عند الخروج
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  const handleSave = () => {
    if (onSaveToggle) {
        onSaveToggle();
        return;
    }
    if (isSaved) {
      setSavedDuas(savedDuas.filter(d => d.dua !== dua));
      toast({ title: 'تمت الإزالة من المفضلة' });
    } else {
      setSavedDuas([...savedDuas, { title, dua }]);
      toast({ title: '❤️ تم الحفظ في أدعيتك' });
    }
  };

  return (
    <Card className="bg-white border-none shadow-xl rounded-3xl overflow-hidden font-amiri ring-1 ring-gray-100 my-4" dir="rtl">
      <CardHeader className="text-center bg-gray-50/50 pb-6 pt-8">
        <CardTitle className="text-emerald-700 text-3xl font-bold">{title}</CardTitle>
        {author && <p className="text-gray-400 text-sm mt-2">المصدر: {author}</p>}
      </CardHeader>

      <CardContent className="text-center px-6 sm:px-12 py-8">
        <p className="text-2xl sm:text-3xl leading-[2.2] text-gray-800 font-medium whitespace-pre-line selection:bg-emerald-100 selection:text-emerald-900">
            {dua}
        </p>
      </CardContent>

      {showActions && (
        <CardFooter className="bg-gray-50/80 p-6 flex justify-center items-center gap-4 sm:gap-8 border-t border-gray-100 flex-wrap">
          
          {/* زر النسخ */}
          <button onClick={handleCopy} className="group flex flex-col items-center gap-2 text-gray-500 hover:text-emerald-600 transition-all min-w-[60px]">
            <div className="p-3 bg-white rounded-full shadow-sm group-hover:shadow-md border border-gray-100 group-hover:border-emerald-200 transition-all">
                <Copy className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold">نسخ</span>
          </button>
          
          {/* زر المشاركة */}
          <button onClick={handleShare} className="group flex flex-col items-center gap-2 text-gray-500 hover:text-blue-600 transition-all min-w-[60px]">
            <div className="p-3 bg-white rounded-full shadow-sm group-hover:shadow-md border border-gray-100 group-hover:border-blue-200 transition-all">
                <Share2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold">مشاركة</span>
          </button>

          {/* زر الحفظ */}
          <button onClick={handleSave} className="group flex flex-col items-center gap-2 text-gray-500 hover:text-red-500 transition-all min-w-[60px]">
            <div className="p-3 bg-white rounded-full shadow-sm group-hover:shadow-md border border-gray-100 group-hover:border-red-200 transition-all">
                 <Heart className={cn("w-5 h-5 transition-all", isSaved && "fill-red-500 text-red-500 scale-110")} />
            </div>
            <span className="text-xs font-semibold">{isSaved ? 'محفوظ' : 'حفظ'}</span>
          </button>
          
          {/* زر الاستماع */}
          <button 
            onClick={handlePlayPause} 
            className="group flex flex-col items-center gap-2 text-gray-500 hover:text-emerald-600 transition-all min-w-[60px]"
          >
            <div className="p-3 bg-white rounded-full shadow-sm group-hover:shadow-md border border-gray-100 group-hover:border-emerald-200 transition-all relative">
                {isPlaying ? (
                    <span className="absolute inset-0 rounded-full animate-ping bg-emerald-100 opacity-75"></span>
                ) : null}
                {isPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </div>
            <span className="text-xs font-semibold">{isPlaying ? 'إيقاف' : 'استماع'}</span>
          </button>
          
          {audioUrl && <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />}
        </CardFooter>
      )}
    </Card>
  );
};

export default DuaCard;
