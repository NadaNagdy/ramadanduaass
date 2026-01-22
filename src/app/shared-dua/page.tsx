"use client";

import { Suspense, useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { FloatingStars, DecorativeDivider } from '@/components/islamic-decorations';
import { Heart, Download, Share2, Copy, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import GiftCard from '@/components/gift-card';
import html2canvas from 'html2canvas';

export const dynamic = 'force-dynamic';

function SharedDuaContent() {
  const searchParams = useSearchParams();
  const [dua, setDua] = useState('');
  const [fromName, setFromName] = useState('');
  const [copied, setCopied] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [enhancedDua, setEnhancedDua] = useState<{
    duaText: string;
    simplifiedMeaning: string;
    spiritualTouch: string;
  } | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const { toast } = useToast();
  const giftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const duaParam = searchParams.get('dua');
    const fromParam = searchParams.get('from');
    
    if (duaParam) setDua(decodeURIComponent(duaParam));
    if (fromParam) setFromName(decodeURIComponent(fromParam));
  }, [searchParams]);

  const enhanceDua = async () => {
    if (!dua.trim()) return;
    setIsEnhancing(true);
    try {
      const response = await fetch('/api/rephrase-dua', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intention: dua }),
      });
      if (!response.ok) throw new Error('Failed to enhance dua');
      const result = await response.json();
      setEnhancedDua(result);
      toast({ title: "✨ تم التحسين!", description: "تم تحسين الدعاء بنجاح" });
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "حدث خطأ", description: "لم نتمكن من تحسين الدعاء" });
    } finally { setIsEnhancing(false); }
  };

  const copyDua = async () => {
    const textToCopy = enhancedDua 
      ? `${enhancedDua.duaText}\n\n${enhancedDua.simplifiedMeaning}` 
      : dua;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: "تم النسخ! 📋", description: "تم نسخ الدعاء بنجاح" });
    } catch (error) {
      toast({ variant: "destructive", title: "خطأ", description: "لم نتمكن من نسخ النص" });
    }
  };

  const downloadAsImage = async () => {
    if (!giftRef.current) return;
    setIsCapturing(true);
    try {
      const canvas = await html2canvas(giftRef.current, {
        backgroundColor: '#0a1628', scale: 2, logging: false, useCORS: true, allowTaint: true
      });
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => (b ? resolve(b) : reject('Failed')), 'image/png');
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `هدية-دعاء-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast({ title: "تم التنزيل! 🎁", description: "تم حفظ الهدية كصورة" });
    } catch (error) {
      toast({ variant: "destructive", title: "خطأ", description: "لم نتمكن من إنشاء الصورة" });
    } finally { setIsCapturing(false); }
  };

  const shareDua = async () => {
    const shareText = enhancedDua 
      ? `🎁 هدية روحانية\n\n${enhancedDua.duaText}\n\n💚 تهادوا تحابوا`
      : `🎁 هدية روحانية\n\n${dua}\n\n💚 تهادوا تحابوا`;

    if (navigator.share) {
      try { await navigator.share({ title: 'هدية دعاء 🎁', text: shareText, url: window.location.href }); }
      catch { console.log('Share cancelled'); }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: "تم نسخ الرابط! 🔗", description: "يمكنك مشاركته مع من تحب" });
    }
  };

  const displayDua = enhancedDua?.duaText || dua;

  if (!dua) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
        <div className="text-center text-gold font-amiri text-2xl">⚠️ لم يتم العثور على الدعاء</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero-gradient pt-32 pb-20 px-4">
      <FloatingStars />
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block p-4 bg-gold/10 rounded-full mb-6 animate-float">
            <Heart className="w-12 h-12 text-gold fill-gold" />
          </div>
          <h1 className="font-amiri text-4xl md:text-5xl font-bold text-gold mb-4">
            {fromName ? `${fromName} أرسل لك هدية روحانية 💝` : 'هدية روحانية 🎁'}
          </h1>
          <p className="text-cream/70 text-lg font-cairo max-w-2xl mx-auto">
            وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ
          </p>
        </div>

        <DecorativeDivider />

        {/* GiftCard */}
        <div className="mb-8 animate-scale-in" ref={giftRef}>
          <GiftCard dua={displayDua} />
        </div>

        {/* أزرار التفاعل */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button onClick={copyDua} variant="outline" className="py-6 flex flex-col items-center gap-2">
            {copied ? <Check className="w-6 h-6"/> : <Copy className="w-6 h-6"/>}
            <span className="text-sm font-bold">{copied ? 'تم النسخ!' : 'نسخ النص'}</span>
          </Button>

          <Button onClick={downloadAsImage} disabled={isCapturing} variant="outline" className="py-6 flex flex-col items-center gap-2">
            <Download className="w-6 h-6"/>
            <span className="text-sm font-bold">{isCapturing ? 'جاري...' : 'حفظ صورة'}</span>
          </Button>

          <Button onClick={shareDua} variant="outline" className="py-6 flex flex-col items-center gap-2">
            <Share2 className="w-6 h-6"/>
            <span className="text-sm font-bold">مشاركة</span>
          </Button>

          <Button onClick={enhanceDua} disabled={isEnhancing || !!enhancedDua} variant="outline" className="py-6 flex flex-col items-center gap-2">
            <Sparkles className="w-6 h-6"/>
            <span className="text-sm font-bold">{isEnhancing ? 'جاري...' : enhancedDua ? 'تم التحسين!' : 'تحسين AI'}</span>
          </Button>
        </div>

        {/* رابط الصفحة الرئيسية */}
        <div className="text-center mt-12">
          <a 
            href="/"
            className="inline-block text-gold/70 hover:text-gold transition-all font-cairo text-lg underline decoration-wavy decoration-gold/30"
          >
            🌟 اصنع دعاءك الخاص
          </a>
        </div>

      </div>
    </div>
  );
}

export default function SharedDuaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gold font-amiri text-xl">جاري التحميل...</p>
        </div>
      </div>
    }>
      <SharedDuaContent />
    </Suspense>
  );
}
