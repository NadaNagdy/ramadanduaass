'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FloatingStars, CrescentMoon, DecorativeDivider } from '@/components/islamic-decorations';
import { Send, User, Sparkles, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { rephraseDua } from '@/ai/flows/rephrase-dua-flow';
import { useLocalStorage } from '@/hooks/use-local-storage';
import DuaCard from '@/components/dua-card';
import { toPng } from 'html-to-image';
import { HeroAvatar } from '@/components/hero-avatar';

type SavedDua = {
  title: string;
  dua: string;
};

type CommunityDua = {
  id: number;
  author: string;
  text: string;
  amens: number;
};

export default function ShareDuaPage() {
  const [name, setName] = useState('');
  const [dua, setDua] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRephrasing, setIsRephrasing] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  const [savedDuas, setSavedDuas] = useLocalStorage<SavedDua[]>('saved_duas', []);
  const [communityDuas, setCommunityDuas] = useLocalStorage<CommunityDua[]>('community_duas_shared', []);
  const duaCardRef = useRef<HTMLDivElement>(null);

  // Detect typing for avatar animation
  useEffect(() => {
    if (dua.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 500);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [dua]);

  const handleRephrase = async () => {
    if (!dua.trim()) {
      toast({
        variant: 'destructive',
        title: 'خطأ',
        description: 'الرجاء كتابة الدعاء قبل إعادة الصياغة.',
      });
      return;
    }
    setIsRephrasing(true);
    try {
      const result = await rephraseDua({ intention: dua });
      setDua(result.duaText);
      toast({
        title: 'تمت إعادة الصياغة',
        description: 'تم تحسين دعاءك بفضل الذكاء الاصطناعي.',
      });
    } catch (error) {
      console.error('Error rephrasing dua:', error);
      toast({
        variant: 'destructive',
        title: 'خطأ',
        description:
          'حدث خطأ أثناء إعادة صياغة الدعاء. الرجاء المحاولة مرة أخرى.',
      });
    }
    setIsRephrasing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dua.trim()) {
      toast({
        variant: 'destructive',
        title: 'خطأ',
        description: 'الرجاء كتابة الدعاء قبل الإرسال.',
      });
      return;
    }
    setIsSubmitting(true);
    
    const authorName = name.trim() || 'زائر كريم';
    const newDua: CommunityDua = {
        id: Date.now(),
        author: authorName,
        text: dua,
        amens: 0,
    };

    setSavedDuas((prev) => [...prev, { title: 'دعاء شخصي', dua: dua }]);
    setCommunityDuas((prev) => [newDua, ...prev]);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsShared(true);
      toast({
        title: 'تمت المشاركة بنجاح!',
        description: 'شكراً لمساهمتك، جزاك الله خيراً.',
      });
    }, 1000);
  };

  const handleShare = async () => {
    if (duaCardRef.current === null) {
      return;
    }

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
            <p className="text-cream/70 text-lg mb-8">
                دعاؤك الآن جزء من مجتمعنا. يمكنك رؤيته في صفحة{' '}
                <a href="/community-duas" className="text-gold font-bold hover:underline">دعاء المشاركين</a>.
            </p>
            <Button onClick={handleShare}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl text-lg mb-4"
            >
                <Share2 className="w-5 h-5 ml-2" />
                مشاركة كصورة
            </Button>
            <Button onClick={() => {
                setIsShared(false);
                setDua('');
                setName('');
            }}
            className="bg-gold hover:bg-gold-light text-navy font-bold py-3 px-6 rounded-xl text-lg"
            >
                مشاركة دعاء آخر
            </Button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero-gradient pt-32 pb-16 px-4">
      <FloatingStars />
      
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <CrescentMoon className="w-16 h-16 text-gold mx-auto mb-4" />
          <h1 className="font-amiri text-4xl text-cream mb-2">شاركنا دعاءً</h1>
          <p className="text-cream/60 mb-6">
            اكتب دعاءً من قلبك ليكون صدقة جارية، ويؤمّن عليه الآخرون
          </p>
          <DecorativeDivider className="mb-8" />
        </div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Avatar Side */}
          <div className="flex flex-col items-center justify-center space-y-6 animate-fade-in">
            <HeroAvatar 
              isSpeaking={isTyping || isRephrasing} 
              size={320}
              className="transform transition-all duration-500"
            />
            
            <div className="text-center px-6 py-4 bg-card/30 backdrop-blur-sm rounded-2xl border border-gold/10">
              <p className="text-cream/70 text-sm font-cairo">
                {isRephrasing ? (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold animate-pulse" />
                    أُحسّن دعاءك بالذكاء الاصطناعي...
                  </span>
                ) : isTyping ? (
                  <span className="flex items-center justify-center gap-2">
                    ✍️ تكتب دعاءً مباركاً...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    🤲 في انتظار دعائك الجميل
                  </span>
                )}
              </p>
            </div>

            {dua.length > 0 && (
              <div className="text-center animate-fade-in">
                <p className="text-gold/80 text-xs font-cairo">
                  {dua.length} حرف - استمر بارك الله فيك ✨
                </p>
              </div>
            )}
          </div>

          {/* Form Side */}
          <div className="space-y-6 text-right bg-card/20 backdrop-blur-sm p-8 rounded-3xl border border-gold/10 animate-fade-in">
            <div>
              <label
                htmlFor="name"
                className="inline-block mb-2 font-cairo text-cream/80"
              >
                الاسم (اختياري)
              </label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50" />
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="اسمك الكريم"
                  className="w-full bg-card border border-gold/20 rounded-xl p-4 pr-10 text-cream text-lg font-cairo focus-visible:ring-gold"
                  dir="rtl"
                  disabled={isSubmitting || isRephrasing}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="dua"
                className="inline-block mb-2 font-cairo text-cream/80"
              >
                نص الدعاء
              </label>
              <Textarea
                id="dua"
                value={dua}
                onChange={(e) => setDua(e.target.value)}
                placeholder="اللهم..."
                className="w-full h-64 bg-card border border-gold/20 rounded-2xl p-4 text-cream text-lg font-amiri focus-visible:ring-gold leading-loose resize-none"
                dir="rtl"
                disabled={isSubmitting || isRephrasing}
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="w-full bg-transparent border-gold/50 hover:bg-gold/10 text-gold font-bold py-6 rounded-xl text-lg transition-all hover:scale-105"
                onClick={handleRephrase}
                disabled={isSubmitting || isRephrasing || !dua.trim()}
              >
                <Sparkles className="w-5 h-5 ml-2" />
                <span>
                  {isRephrasing ? 'جار التحسين...' : 'تحسين بالذكاء الاصطناعي'}
                </span>
              </Button>
              
              <Button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-gold hover:bg-gold-light text-navy font-bold py-6 rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-gold/20"
                disabled={isSubmitting || isRephrasing || !dua.trim()}
              >
                <Send className="w-5 h-5 ml-2" />
                <span>{isSubmitting ? 'جار النشر...' : 'نشر الدعاء'}</span>
              </Button>
            </div>

            <p className="text-cream/40 text-sm text-center pt-4 border-t border-gold/10">
              سيظهر دعاؤك في صفحة المجتمع ليؤمّن عليه الجميع 🌙
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
