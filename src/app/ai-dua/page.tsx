"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FloatingStars, DecorativeDivider, Lantern } from '@/components/islamic-decorations';
import { Send, Sparkles, Loader2, RefreshCw, Share2, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import DuaCard from '@/components/dua-card';
import { supabase } from '@/lib/supabase';
import avatarImg from '/mnt/data/fcb1b373-6825-4cb9-be2c-5ee9bdf41234.png';

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
      toast({ variant: "destructive", title: "خطأ", description: "الرجاء كتابة نيتك أولاً." });
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

  const speakDua = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-EG';
      const voices = window.speechSynthesis.getVoices();
      utterance.voice = voices.find(v => v.lang.startsWith('ar')) || null;
      window.speechSynthesis.speak(utterance);
    } else console.warn('Speech synthesis not supported');
  };

  const shareToCommunity = async (text: string) => {
    const { data, error } = await supabase
      .from('community_duas')
      .insert([{ text, author: 'Anonymous', likes: 0 }])
      .select();

    if (error) console.error(error);
    else toast({ title: "تمت المشاركة", description: "تم نشر الدعاء في المجتمع." });
    return data;
  };

  return (
    <div className="min-h-screen bg-hero-gradient pt-32 pb-20 px-4">
      <FloatingStars />

      <div className="max-w-3xl mx-auto relative z-10 animate-fade-in">
        <div className="text-center mb-12">
          <div className="relative w-32 h-32 mx-auto animate-float mb-4">
            <Image src={avatarImg} alt="Avatar" width={128} height={128} className="rounded-full shadow-lg" />
          </div>

          <h1 className="font-amiri text-4xl md:text-5xl font-bold text-gold mb-4">تهادوا الحب غيباً بالدعاء</h1>
          <p className="text-cream/70 text-lg">
            اكتب حاجتك أو لمن تحب بصدق، وسيقوم النظام بصياغة دعاء مأثور ومناسب ببركة هذا الشهر
          </p>
        </div>

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

        {generatedDua && !isGenerating && (
          <div className="animate-fade-in space-y-6">
            <DecorativeDivider />
            <DuaCard title="الدعاء المصاغ" dua={generatedDua.duaText} showActions={true} />

            <div className="flex flex-col gap-2">
              <Button onClick={() => speakDua(generatedDua.duaText)} variant="outline" className="w-full py-3 border-2 border-blue-500/30 rounded-2xl text-blue-500 hover:bg-blue-500/5 hover:text-blue-500 flex items-center justify-center gap-2">
                <Volume2 className="w-5 h-5" /> استمع للدعاء
              </Button>

              <Button onClick={() => shareToCommunity(generatedDua.duaText)} variant="outline" className="w-full py-3 border-2 border-green-500/30 rounded-2xl text-green-500 hover:bg-green-500/5 hover:text-green-500 flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" /> مشاركة الدعاء
              </Button>

              <Button onClick={handleReset} variant="outline" className="w-full py-3 border-2 border-dashed border-gold/30 rounded-2xl text-gold hover:bg-gold/5 flex items-center justify-center gap-2">
                <RefreshCw className="w-5 h-5" /> صياغة دعاء جديد
              </Button>
            </div>
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
