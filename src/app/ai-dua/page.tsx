"use client";

import React, { useState } from 'react';
import { FloatingStars, DecorativeDivider, Lantern } from '@/components/islamic-decorations';
import { Send, Sparkles, RefreshCw, Share2, FileText, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import DuaCard from '@/components/dua-card';
import ListeningAnimation from '@/components/listening-animation';
import GiftCard from '@/components/gift-card';

// استيراد مكونات القائمة المنسدلة (تأكد من وجودها في مشروعك)
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type RephraseDuaOutput = {
  duaText: string;
  simplifiedMeaning: string;
  spiritualTouch: string;
};

export default function AiDuaPage() {
  const [intention, setIntention] = useState('');
  const [generatedDua, setGeneratedDua] = useState<RephraseDuaOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
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

  // دالة المشاركة المعدلة لتقبل نوع المشاركة
  const handleShare = (type: 'original' | 'ai-full') => {
    if (!generatedDua) return;

    let textToShare = "";
    let message = "";

    if (type === 'original') {
      // الخيار الأول: الدعاء فقط كما هو
      textToShare = generatedDua.duaText;
      message = "تم نسخ نص الدعاء للحافظة";
    } else {
      // الخيار الثاني: الصياغة الكاملة (الدعاء + المعنى + اللمسة)
      textToShare = `🤲 *دعاء:* ${generatedDua.duaText}\n\n✨ *المعنى:* ${generatedDua.simplifiedMeaning}\n\n💡 *لمسة روحانية:* ${generatedDua.spiritualTouch}`;
      message = "تم نسخ الصياغة الكاملة للحافظة";
    }

    const shareUrl = window.location.href;
    const fullText = `${textToShare}\n\n🔗 ${shareUrl}`;

    // استخدام Web Share API إذا كانت مدعومة (للموبايل)
    if (navigator.share) {
      navigator.share({
        title: 'دعاء من AiDua',
        text: fullText,
      }).catch(console.error);
    } else {
      // النسخ للحافظة (للمتصفحات الأخرى)
      navigator.clipboard.writeText(fullText);
      toast({
        title: "تم النسخ",
        description: message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient pt-32 pb-20 px-4">
      <FloatingStars />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Animation Side */}
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
                
                <DuaCard 
                  title="تهادوا الحب غيباً بالدعاء" 
                  dua={generatedDua.duaText} 
                  showActions={true}
                />
                
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

                  {/* استبدال زر المشاركة العادي بقائمة منسدلة */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline"
                        className="flex-1 py-6 border-2 border-dashed border-green-500/30 rounded-2xl text-green-500 hover:bg-green-500/5 transition-all flex items-center justify-center gap-2"
                      >
                        <Share2 className="w-5 h-5" />
                        مشاركة
                      </Button>
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent className="w-56 bg-card border-gold/20" align="end">
                      {/* الخيار الأول: مشاركة الدعاء فقط */}
                      <DropdownMenuItem 
                        onClick={() => handleShare('original')}
                        className="flex items-center gap-2 justify-end cursor-pointer text-right hover:bg-gold/10 focus:bg-gold/10 py-3"
                      >
                        <span>مشاركة نص الدعاء فقط</span>
                        <FileText className="w-4 h-4 text-gold" />
                      </DropdownMenuItem>
                      
                      {/* الخيار الثاني: مشاركة الصياغة الكاملة من الـ AI */}
                      <DropdownMenuItem 
                        onClick={() => handleShare('ai-full')}
                        className="flex items-center gap-2 justify-end cursor-pointer text-right hover:bg-gold/10 focus:bg-gold/10 py-3"
                      >
                        <span>مشاركة الصياغة الكاملة (AI)</span>
                        <Wand2 className="w-4 h-4 text-gold" />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

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
    </div>
  );
}
