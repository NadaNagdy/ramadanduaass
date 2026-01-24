"use client";

import { Suspense, useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { FloatingStars, DecorativeDivider } from '@/components/islamic-decorations';
import { Heart, Download, Share2, Copy, Check, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import GiftCard from '@/components/gift-card';
import html2canvas from 'html2canvas';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

function SharedDuaContent() {
  const searchParams = useSearchParams();
  const duaId = searchParams?.get('id');
  
  const [dua, setDua] = useState('');
  const [fromName, setFromName] = useState('');
  const [copied, setCopied] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enhancedDua, setEnhancedDua] = useState<{
    duaText: string;
    simplifiedMeaning: string;
    spiritualTouch: string;
  } | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const { toast } = useToast();
  const giftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (duaId) {
      loadDuaById(duaId);
    } else {
      // Fallback: لو في دعاء في الـ URL القديم
      const duaParam = searchParams.get('dua');
      const fromParam = searchParams.get('from');
      
      if (duaParam) {
        setDua(decodeURIComponent(duaParam));
        if (fromParam) setFromName(decodeURIComponent(fromParam));
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  }, [duaId, searchParams]);

  const loadDuaById = async (id: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('shared_duas')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      if (data) {
        setDua(data.text || data.dua || '');
        setFromName(data.from_name || data.author || '');
      }
    } catch (error) {
      console.error('Error loading dua:', error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "لم نتمكن من تحميل الدعاء"
      });
    } finally {
      setLoading(false);
    }
  };

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
    } finally { 
      setIsEnhancing(false); 
    }
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
        backgroundColor: '#0a1628', 
        scale: 2, 
        logging: false, 
        useCORS: true, 
        allowTaint: true
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
    } finally { 
      setIsCapturing(false); 
    }
  };

  const shareDua = async () => {
    const shareText = enhancedDua 
      ? `🎁 هدية روحانية\n\n${enhancedDua.duaText}\n\n💚 تهادوا تحابوا`
      : `🎁 هدية روحانية\n\n${dua}\n\n💚 تهادوا تحابوا`;

    if (navigator.share) {
      try { 
        await navigator.share({ 
          title: 'هدية دعاء 🎁', 
          text: shareText, 
          url: window.location.href 
        }); 
      } catch { 
        console.log('Share cancelled'); 
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: "تم نسخ الرابط! 🔗", description: "يمكنك مشاركته مع من تحب" });
    }
  };

  const displayDua = enhancedDua?.duaText || dua;

  if (loading) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
        <FloatingStars />
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-gold animate-spin mx-auto mb-4" />
          <p className="text-gold font-amiri text-2xl">جاري تحميل الدعاء...</p>
        </div>
      </div>
    );
  }

  if (!dua) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
        <FloatingStars />
        <div className="text-center">
          <div className="text-8xl mb-6">😔</div>
          <h2 className="text-gold font-amiri text-3xl mb-4">لم يتم العثور على الدعاء</h2>
          <p className="text-cream/70 font-cairo mb-8">قد يكون الرابط غير صحيح أو الدعاء غير موجود</p>
          <Link href="/">
            <Button className="bg-gold text-navy hover:bg-gold-light font-cairo font-bold">
              العودة للرئيسية
            </Button>
          </Link>
        </div>
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

        {/* Enhanced Dua Details */}
        {enhancedDua && (
          <div className="mb-8 bg-white/5 backdrop-blur-md border-2 border-gold/30 rounded-3xl p-6 animate-fade-in">
            {enhancedDua.simplifiedMeaning && (
              <div className="mb-4">
                <h3 className="text-gold font-amiri text-xl mb-2 text-right">💡 المعنى المبسط:</h3>
                <p className="text-cream/90 font-cairo text-lg leading-relaxed text-right">
                  {enhancedDua.simplifiedMeaning}
                </p>
              </div>
            )}
            {enhancedDua.spiritualTouch && (
              <div>
                <h3 className="text-gold font-amiri text-xl mb-2 text-right">✨ لمسة روحانية:</h3>
                <p className="text-cream/90 font-cairo text-lg leading-relaxed text-right">
                  {enhancedDua.spiritualTouch}
                </p>
              </div>
            )}
          </div>
        )}

        {/* أزرار التفاعل */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button 
            onClick={copyDua} 
            variant="outline" 
            className="py-6 flex flex-col items-center gap-2 bg-white/5 border-gold/30 hover:bg-gold/10 text-cream"
          >
            {copied ? <Check className="w-6 h-6 text-green-400"/> : <Copy className="w-6 h-6"/>}
            <span className="text-sm font-bold font-cairo">{copied ? 'تم النسخ!' : 'نسخ النص'}</span>
          </Button>

          <Button 
            onClick={downloadAsImage} 
            disabled={isCapturing} 
            variant="outline" 
            className="py-6 flex flex-col items-center gap-2 bg-white/5 border-gold/30 hover:bg-gold/10 text-cream disabled:opacity-50"
          >
            {isCapturing ? <Loader2 className="w-6 h-6 animate-spin"/> : <Download className="w-6 h-6"/>}
            <span className="text-sm font-bold font-cairo">{isCapturing ? 'جاري...' : 'حفظ صورة'}</span>
          </Button>

          <Button 
            onClick={shareDua} 
            variant="outline" 
            className="py-6 flex flex-col items-center gap-2 bg-white/5 border-gold/30 hover:bg-gold/10 text-cream"
          >
            <Share2 className="w-6 h-6"/>
            <span className="text-sm font-bold font-cairo">مشاركة</span>
          </Button>

          <Button 
            onClick={enhanceDua} 
            disabled={isEnhancing || !!enhancedDua} 
            variant="outline" 
            className="py-6 flex flex-col items-center gap-2 bg-white/5 border-gold/30 hover:bg-gold/10 text-cream disabled:opacity-50"
          >
            {isEnhancing ? <Loader2 className="w-6 h-6 animate-spin"/> : <Sparkles className="w-6 h-6"/>}
            <span className="text-sm font-bold font-cairo">
              {isEnhancing ? 'جاري...' : enhancedDua ? 'تم التحسين!' : 'تحسين AI'}
            </span>
          </Button>
        </div>

        {/* رسالة آمين */}
        <div className="bg-gold/10 backdrop-blur-sm rounded-2xl p-6 border border-gold/20 mb-8 text-center">
          <p className="text-cream/80 text-lg font-amiri leading-relaxed">
            🤲 آمين على الدعاء
            <br />
            <span className="text-sm text-cream/60">
              من دعا لأخيه بظهر الغيب، قالت الملائكة: ولك بمثل
            </span>
          </p>
        </div>

        {/* رابط الصفحة الرئيسية */}
        <div className="text-center">
          <Link 
            href="/"
            className="inline-block text-gold/70 hover:text-gold transition-all font-cairo text-lg underline decoration-wavy decoration-gold/30"
          >
            🌟 اصنع دعاءك الخاص
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function SharedDuaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <FloatingStars />
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-gold animate-spin mx-auto mb-4" />
          <p className="text-gold font-amiri text-xl">جاري التحميل...</p>
        </div>
      </div>
    }>
      <SharedDuaContent />
    </Suspense>
  );
}
