'use client';

import React, { useState, useEffect } from 'react';
import { FloatingStars, DecorativeDivider, Lantern } from '@/components/islamic-decorations';
import { Send, Sparkles, Loader2, RefreshCw, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import DuaCard from '@/components/dua-card';
import HeroAvatar from '@/components/hero-avatar'; // المسار الصح للملف

type RephraseDuaOutput = {
  duaText: string;
  simplifiedMeaning: string;
  spiritualTouch: string;
};

export default function AiDuaPage() {
  const [intention, setIntention] = useState('');
  const [generatedDua, setGeneratedDua] = useState<RephraseDuaOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  // كشف الكتابة لتفعيل HeroAvatar
  useEffect(() => {
    if (intention.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 500);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [intention]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!intention.trim()) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "الرجاء كتابة نيتك أولاً.",
      });
      return;
    }
    
    setIsGenerating(true);
    setGeneratedDua(null);
    
    try {
      const response = await fetch('/api/rephrase-dua', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intention }),
      });

      if (!response.ok) throw new Error('Failed to generate dua');

      const result = await response.json();
      setGeneratedDua(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "لم نتمكن من إنشاء الدعاء، يرجى التأكد من إعدادات مفتاح API والمحاولة مرة أخرى.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setGeneratedDua(null);
    setIntention('');
  };

  const handleShare = () => {
    if (!generatedDua) return;

    const duaText = generatedDua.duaText;
    const shareUrl = window.location.href;
    const socialMedia = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(duaText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(duaText)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(duaText + ' ' + shareUrl)}`,
    };
    console.log('Share Links:', socialMedia);

    toast({
      title: "مشاركة الدعاء",
      description: "يمكنك الآن مشاركة الدعاء عبر مواقع التواصل الاجتماعي أو تضمينه في موقعك.",
    });
  };

  return (
    <div className="min-h-screen bg-hero-gradient pt-32 pb-20 px-4 relative overflow-hidden">
      <FloatingStars />

      <div className="max-w-3xl mx-auto relative z-10 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-gold/10 rounded-full mb-4 animate-float">
            <Sparkles className="w-10 h-10 text-gold" />
          </div>
          <h1 className="font-amiri text-4xl md:text-5xl font-bold text-gold mb-4">اصنع دعاءك</h1>
          <p className="text-cream/70 text-lg">
            اكتب حاجتك أو لمن تحب بصدق، وسيقوم النظام بصياغة دعاء مأثور ومناسب.
          </p>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <HeroAvatar 
            isSpeaking={isTyping} 
            size={250} 
            className="mb-4" 
          />
          <p className="text-cream/70 text-lg">
            {isTyping ? '✍️ تكتب نيتك...' : '🤲 في انتظار نيتك'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleGenerate} className="mb-12">
          <div className="relative group h-48">
            <Textarea
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="مثلاً: أدعو بالشفاء لصديق، أو بالسكينة في قلبي، أو بالنجاح في عملي..."
              className="w-full h-40 bg-card border border-gold/30 rounded-3xl p-6 text-cream text-lg focus:outline-none focus:border-gold transition-all resize-none shadow-inner"
              dir="rtl"
              disabled={isGenerating}
            />
            <Button
              type="submit"
              disabled={isGenerating || !intention.trim()}
              className="absolute bottom-4 left-4 bg-gold text-navy px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-gold-light transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              {isGenerating ? "جاري الصياغة..." : "صياغة الدعاء"}
            </Button>
          </div>
        </form>

        {/* Result */}
        {generatedDua && !isGenerating && (
          <div className="animate-fade-in space-y-8">
            <DecorativeDivider />
            <DuaCard 
              title="الدعاء المصاغ" 
              dua={generatedDua.duaText} 
              showActions={true}
            />
            
            <div className="bg-gold/10 border border-gold/20 rounded-3xl p-8">
               <h4 className="font-amiri text-lg text-gold flex items-center gap-2 justify-end mb-2">
                <Sparkles className="w-5 h-5" />
                <span>المعنى المبسط</span>
              </h4>
              <p className="font-cairo text-cream/80 text-right">{generatedDua.simplifiedMeaning}</p>
            </div>
            
            <div className="bg-gold/10 border border-gold/20 rounded-3xl p-8">
              <h4 className="font-amiri text-lg text-gold flex items-center gap-2 justify-end mb-2">
                <Sparkles className="w-5 h-5" />
                لمسة روحانية
              </h4>
              <p className="text-cream/80 leading-relaxed italic font-amiri text-xl text-right">
                {generatedDua.spiritualTouch}
              </p>
            </div>

            <Button 
              onClick={handleReset}
              variant="outline"
              className="w-full py-6 border-2 border-dashed border-gold/30 rounded-2xl text-gold hover:bg-gold/5 hover:text-gold transition-all flex items-center justify-center gap-2 text-lg"
            >
              <RefreshCw className="w-5 h-5" />
              صياغة دعاء جديد
            </Button>

            <Button 
              onClick={handleShare}
              variant="outline"
              className="w-full py-6 border-2 border-dashed border-green-500/30 rounded-2xl text-green-500 hover:bg-green-500/5 hover:text-green-500 transition-all flex items-center justify-center gap-2 text-lg"
            >
              <Share2 className="w-5 h-5" />
              مشاركة الدعاء
            </Button>
          </div>
        )}

        <div className="mt-20 opacity-30 pointer-events-none flex justify-center gap-20">
          <Lantern className="w-20 h-20 text-gold animate-float" />
          <Lantern className="w-20 h-20 text-gold animate-float" style={{ animationDelay: '1.5s' }} />
        </div>
      </div>
    </div>
  );
}
