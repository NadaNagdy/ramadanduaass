'use client';

import React, { useState, useEffect } from 'react';
import { FloatingStars, DecorativeDivider, Lantern } from '@/components/islamic-decorations';
import { Send, Sparkles, Loader2, RefreshCw, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import DuaCard from '@/components/dua-card';
import HeroAvatar from '@/components/hero-avatar';

type RephraseDuaOutput = {
  duaText: string;
  simplifiedMeaning: string;
  spiritualTouch: string;
};

export default function AiDuaClient() {
  const [intention, setIntention] = useState('');
  const [generatedDua, setGeneratedDua] = useState<RephraseDuaOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

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
      
      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Lantern className="w-20 h-20 text-gold mx-auto mb-6" />
          <h1 className="font-amiri text-5xl text-cream mb-4">
            <Sparkles className="inline-block w-8 h-8 ml-2 text-gold" />
            دعاء بالذكاء الاصطناعي
          </h1>
          <p className="text-cream/70 text-lg max-w-2xl mx-auto">
            اكتب نيتك وحاجتك، وسنساعدك في صياغة دعاء جميل بإذن الله
          </p>
          <DecorativeDivider className="mt-6" />
        </div>

        {/* Input Form */}
        <div className="bg-navy/40 backdrop-blur-sm rounded-3xl p-8 border border-gold/20 shadow-2xl mb-8 animate-slide-up">
          <div className="mb-6">
            <label className="block text-cream font-amiri text-xl mb-3 text-right">
              ما هي نيتك؟
            </label>
            <Textarea
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="مثال: أريد دعاء للنجاح في الدراسة، أو دعاء لشفاء والدتي، أو دعاء للتوفيق في عمل..."
              className="w-full min-h-[150px] p-4 bg-navy/60 border-gold/30 text-cream placeholder:text-cream/40 rounded-xl text-right font-amiri text-lg resize-none focus:border-gold focus:ring-2 focus:ring-gold/20"
              disabled={isGenerating}
            />
            {isTyping && (
              <p className="text-cream/50 text-sm mt-2 text-right">جاري الكتابة...</p>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !intention.trim()}
              className="flex-1 bg-gold text-navy font-bold py-6 text-lg rounded-xl hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="ml-2 animate-spin" size={20} />
                  جاري الإنشاء...
                </>
              ) : (
                <>
                  <Send className="ml-2" size={20} />
                  أنشئ الدعاء
                </>
              )}
            </Button>

            {generatedDua && (
              <Button
                onClick={handleReset}
                variant="outline"
                className="px-6 py-6 border-gold/30 text-cream hover:bg-gold/10 rounded-xl"
              >
                <RefreshCw size={20} />
              </Button>
            )}
          </div>
        </div>

        {/* Generated Dua Display */}
        {generatedDua && (
          <div className="animate-fade-in space-y-6">
            {/* Main Dua Card */}
            <div className="bg-gradient-to-br from-gold/20 to-navy/40 backdrop-blur-sm rounded-3xl p-8 border-2 border-gold/30 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <HeroAvatar className="w-12 h-12" />
                <h2 className="font-amiri text-2xl text-gold">دعاؤك المُقترح</h2>
              </div>
              
              <p className="font-amiri text-3xl text-cream leading-relaxed text-right mb-6">
                {generatedDua.duaText}
              </p>

              <DecorativeDivider className="my-6" />

              {/* Meaning Section */}
              <div className="bg-navy/40 rounded-2xl p-6 mb-4">
                <h3 className="text-gold font-bold text-lg mb-3 text-right">المعنى المبسط:</h3>
                <p className="text-cream/90 text-right leading-relaxed">
                  {generatedDua.simplifiedMeaning}
                </p>
              </div>

              {/* Spiritual Touch */}
              <div className="bg-navy/40 rounded-2xl p-6">
                <h3 className="text-gold font-bold text-lg mb-3 text-right flex items-center justify-end gap-2">
                  <Sparkles size={18} />
                  لمسة روحانية:
                </h3>
                <p className="text-cream/90 text-right leading-relaxed italic">
                  {generatedDua.spiritualTouch}
                </p>
              </div>

              {/* Share Button */}
              <div className="mt-6 text-center">
                <Button
                  onClick={handleShare}
                  className="bg-cream/10 text-cream border border-gold/30 hover:bg-gold/20 px-8 py-3 rounded-xl"
                >
                  <Share2 className="ml-2" size={18} />
                  شارك الدعاء
                </Button>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-navy/30 backdrop-blur-sm rounded-2xl p-6 border border-cream/10 text-center">
              <p className="text-cream/60 text-sm">
                💡 نذكرك أن الدعاء المقترح هو اجتهاد بشري بمساعدة الذكاء الاصطناعي.
                يمكنك تعديله كما تشاء، والأهم أن يكون من قلبك.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
