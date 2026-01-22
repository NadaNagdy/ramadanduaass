"use client";

import React, { useState } from 'react';
import { FloatingStars, DecorativeDivider, Lantern } from '@/components/islamic-decorations';
import { Send, Sparkles, RefreshCw, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import GiftCard from '@/components/gift-card';
import ListeningAnimation from '@/components/listening-animation';

type RephraseDuaOutput = {
  duaText: string;
  simplifiedMeaning: string;
  spiritualTouch: string;
};

export default function AiDuaPage() {
  const [intention, setIntention] = useState('');
  const [generatedDua, setGeneratedDua] = useState<RephraseDuaOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [senderName, setSenderName] = useState('');
  const { toast } = useToast();

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ intention }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate dua');
      }

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
    setShowShareDialog(true);
  };

  const confirmShare = async () => {
    if (!generatedDua) return;

    const duaText = generatedDua.duaText;
    const fromName = senderName.trim() || 'صديقك';
    
    const shareUrl = `${window.location.origin}/shared-dua?dua=${encodeURIComponent(duaText)}&from=${encodeURIComponent(fromName)}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      
      toast({
        title: "تم نسخ الرابط! 🎁",
        description: "شارك الهدية الروحانية مع من تحب",
      });
      
      setShowShareDialog(false);
      setSenderName('');
      
      // محاولة فتح نافذة المشاركة إذا كانت متاحة
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'هدية دعاء 🎁',
            text: `${fromName} أرسل لك هدية روحانية من القلب`,
            url: shareUrl,
          });
        } catch (error) {
          console.log('Share cancelled');
        }
      }
    } catch (error) {
      toast({
        title: "رابط المشاركة",
        description: shareUrl,
      });
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient pt-32 pb-20 px-4">
      <FloatingStars />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Grid Layout - Animation على اليسار، المحتوى على اليمين */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Animation Side - تظهر دائماً */}
          <div className="flex flex-col items-center justify-center animate-fade-in">
            <ListeningAnimation />
            <div className="mt-6 text-center">
              <p className="text-gold font-amiri text-xl">
                {isGenerating ? (
                  <span className="animate-pulse">🎙️ أستمع لنيتك وأصيغ دعاءك...</span>
                ) : generatedDua ? (
                  <span>✨ تم صياغة دعائك بنجاح</span>
                ) : (
                  <span>🤲 في انتظار نيتك الجميلة</span>
                )}
              </p>
            </div>
          </div>

          {/* Content Side */}
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-gold/10 rounded-full mb-4 animate-float">
                <Sparkles className="w-10 h-10 text-gold" />
              </div>
              <h1 className="font-amiri text-4xl md:text-5xl font-bold text-gold mb-4">
                تهادوا الحب غيباً بالدعاء
              </h1>
              <p className="text-cream/70 text-lg">
                اكتب حاجتك أو لمن تحب بصدق، وسيقوم النظام بصياغة دعاء مأثور ومناسب
              </p>
            </div>

            {!generatedDua && (
              <form onSubmit={handleGenerate} className="mb-8">
                <div className="relative group h-48">
                  <Textarea
                    value={intention}
                    onChange={(e) => setIntention(e.target.value)}
                    placeholder="مثلاً: أدعو بالشفاء لصديق، أو بالسكينة في قلبي، أو بالنجاح في عملي..."
                    className="w-full h-40 bg-card border border-gold/30 rounded-3xl p-6 text-cream text-lg focus:outline-none focus:border-gold transition-all resize-none shadow-inner font-amiri"
                    dir="rtl"
                    disabled={isGenerating}
                  />
                  <Button
                    type="submit"
                    disabled={isGenerating || !intention.trim()}
                    className="absolute bottom-4 left-4 bg-gold text-navy px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-gold-light transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    <Send className="w-5 h-5" />
                    {isGenerating ? 'جاري الصياغة...' : 'صياغة الدعاء'}
                  </Button>
                </div>
              </form>
            )}

            {generatedDua && !isGenerating && (
              <div className="animate-fade-in space-y-6">
                <DecorativeDivider />
                
                {/* استبدلنا DuaCard بـ GiftCard */}
                <GiftCard dua={generatedDua.duaText} />
                
                <div className="bg-gold/10 border border-gold/20 rounded-3xl p-6">
                  <h4 className="font-amiri text-lg text-gold flex items-center gap-2 justify-end mb-3">
                    <Sparkles className="w-5 h-5" />
                    <span>المعنى المبسط</span>
                  </h4>
                  <p className="font-cairo text-cream/80 text-right leading-relaxed">
                    {generatedDua.simplifiedMeaning}
                  </p>
                </div>
                
                <div className="bg-gold/10 border border-gold/20 rounded-3xl p-6">
                  <h4 className="font-amiri text-lg text-gold flex items-center gap-2 justify-end mb-3">
                    <Sparkles className="w-5 h-5" />
                    لمسة روحانية
                  </h4>
                  <p className="text-cream/80 leading-relaxed italic font-amiri text-xl text-right">
                    {generatedDua.spiritualTouch}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={handleReset}
                    variant="outline"
                    className="flex-1 py-6 border-2 border-dashed border-gold/30 rounded-2xl text-gold hover:bg-gold/5 transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    صياغة دعاء جديد
                  </Button>

                  <Button 
                    onClick={handleShare}
                    variant="outline"
                    className="flex-1 py-6 border-2 border-dashed border-green-500/30 rounded-2xl text-green-500 hover:bg-green-500/5 transition-all flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    مشاركة هدية
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Decorative Lanterns */}
        <div className="mt-20 opacity-30 pointer-events-none flex justify-center gap-20">
          <Lantern className="w-20 h-20 text-gold animate-float" />
          <Lantern className="w-20 h-20 text-gold animate-float" style={{ animationDelay: '1.5s' }} />
        </div>
      </div>

      {/* Share Dialog */}
      {showShareDialog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-card rounded-3xl p-8 max-w-md w-full animate-scale-in border-2 border-gold/30 shadow-2xl">
            <h3 className="text-gold font-amiri text-2xl text-center mb-2">
              من المرسل؟ 💝
            </h3>
            <p className="text-cream/60 text-sm text-center mb-6 font-cairo">
              سيظهر اسمك للمستقبِل مع الهدية
            </p>
            
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="اكتب اسمك (اختياري)"
              className="w-full bg-navy/50 border border-gold/30 rounded-2xl p-4 text-cream text-center font-amiri text-lg focus:outline-none focus:border-gold mb-6"
              dir="rtl"
              autoFocus
            />
            
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setShowShareDialog(false);
                  setSenderName('');
                }}
                variant="outline"
                className="flex-1 border-gold/30 text-cream hover:bg-gold/10"
              >
                إلغاء
              </Button>
              
              <Button
                onClick={confirmShare}
                className="flex-1 bg-gold text-navy hover:bg-gold-light font-bold"
              >
                مشاركة 🎁
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
