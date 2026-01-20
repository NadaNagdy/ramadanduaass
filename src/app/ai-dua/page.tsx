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

    // ✅ استخدام window داخل client فقط
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
      {/* نفس باقي الكود بدون تغيير */}
    </div>
  );
}
