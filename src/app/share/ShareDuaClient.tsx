'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Share2, 
  Copy, 
  Check, 
  MessageCircle, 
  Facebook, 
  Twitter,
  Download,
  Sparkles,
  Heart
} from 'lucide-react';

export default function ShareClient() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [dua, setDua] = useState('');
  const [fromName, setFromName] = useState('');

  useEffect(() => {
    // استخراج البيانات من URL
    const duaParam = searchParams.get('dua');
    const fromParam = searchParams.get('from');
    
    if (duaParam) setDua(decodeURIComponent(duaParam));
    if (fromParam) setFromName(decodeURIComponent(fromParam));
  }, [searchParams]);

  // نسخ الرابط
  const copyShareLink = async () => {
    try {
      const shareUrl = window.location.href;
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "تم النسخ! 🔗",
        description: "تم نسخ رابط المشاركة بنجاح",
      });
    } catch (error) {
      console.error('Failed to copy:', error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "لم نتمكن من نسخ الرابط",
      });
    }
  };

  // نسخ النص فقط
  const copyDuaText = async () => {
    if (!dua) return;
    
    try {
      await navigator.clipboard.writeText(dua);
      toast({
        title: "تم النسخ! 📋",
        description: "تم نسخ الدعاء بنجاح",
      });
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // مشاركة على واتساب
  const shareToWhatsApp = () => {
    const text = fromName 
      ? `🎁 ${fromName} أرسل لك هدية روحانية\n\n${dua}\n\n💚 تهادوا تحابوا`
      : `🎁 هدية روحانية\n\n${dua}`;
    
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  // مشاركة على فيسبوك
  const shareToFacebook = () => {
    const shareUrl = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  // مشاركة على تويتر
  const shareToTwitter = () => {
    const text = `🎁 هدية روحانية: ${dua}`;
    const shareUrl = window.location.href;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  // مشاركة عامة (Web Share API)
  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'هدية دعاء روحانية 🎁',
          text: dua,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // البديل: نسخ الرابط
      copyShareLink();
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block p-4 bg-gold/10 rounded-full mb-6 animate-float">
            <Heart className="w-12 h-12 text-gold fill-gold" />
          </div>
          
          <h1 className="font-amiri text-4xl md:text-5xl font-bold text-gold mb-4">
            {fromName ? `${fromName} أرسل لك هدية روحانية 💝` : 'هدية دعاء 🎁'}
          </h1>
          
          {dua && (
            <div className="bg-card border-2 border-gold/30 rounded-3xl p-8 mb-8 shadow-2xl">
              <p className="font-amiri text-2xl md:text-3xl text-gold leading-relaxed text-center">
                {dua}
              </p>
            </div>
          )}
        </div>

        {/* أزرار المشاركة */}
        <div className="bg-card/80 backdrop-blur-sm border border-gold/20 rounded-3xl p-8 shadow-xl">
          <h2 className="font-amiri text-2xl text-gold text-center mb-6">
            شارك الهدية مع من تحب 💝
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            
            {/* نسخ الرابط */}
            <Button
              onClick={copyShareLink}
              className="py-6 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl flex flex-col items-center gap-2 transition-all"
            >
              {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
              <span className="font-bold">
                {copied ? 'تم النسخ!' : 'نسخ الرابط'}
              </span>
            </Button>

            {/* نسخ النص */}
            <Button
              onClick={copyDuaText}
              className="py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex flex-col items-center gap-2 transition-all"
            >
              <Copy className="w-6 h-6" />
              <span className="font-bold">نسخ النص</span>
            </Button>

            {/* واتساب */}
            <Button
              onClick={shareToWhatsApp}
              className="py-6 bg-green-600 hover:bg-green-700 text-white rounded-2xl flex flex-col items-center gap-2 transition-all"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="font-bold">واتساب</span>
            </Button>

            {/* فيسبوك */}
            <Button
              onClick={shareToFacebook}
              className="py-6 bg-blue-700 hover:bg-blue-800 text-white rounded-2xl flex flex-col items-center gap-2 transition-all"
            >
              <Facebook className="w-6 h-6" />
              <span className="font-bold">فيسبوك</span>
            </Button>

            {/* تويتر */}
            <Button
              onClick={shareToTwitter}
              className="py-6 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl flex flex-col items-center gap-2 transition-all"
            >
              <Twitter className="w-6 h-6" />
              <span className="font-bold">تويتر</span>
            </Button>

            {/* مشاركة عامة */}
            <Button
              onClick={shareNative}
              className="py-6 bg-gold hover:bg-gold-light text-navy rounded-2xl flex flex-col items-center gap-2 transition-all font-bold"
            >
              <Share2 className="w-6 h-6" />
              <span className="font-bold">مشاركة</span>
            </Button>
          </div>

          {/* معلومة */}
          <div className="bg-gold/10 border border-gold/30 rounded-2xl p-4 text-center">
            <p className="text-cream/80 text-sm font-cairo">
              💡 اختر طريقة المشاركة المناسبة لك وانشر الخير
            </p>
          </div>
        </div>

        {/* رسالة تشجيعية */}
        <div className="mt-8 bg-gradient-to-r from-gold/10 to-gold/5 border-r-4 border-gold rounded-2xl p-6">
          <p className="text-cream/90 text-center font-amiri text-lg leading-relaxed">
            💚 تَهَادَوْا تَحَابُّوا - شارك الدعاء وكن سبباً في الخير
          </p>
        </div>

        {/* رابط العودة */}
        <div className="text-center mt-8">
          <a 
            href="/ai-dua"
            className="inline-flex items-center gap-2 text-gold/70 hover:text-gold transition-all font-cairo text-lg underline decoration-wavy decoration-gold/30"
          >
            <Sparkles className="w-5 h-5" />
            اصنع دعاءك الخاص
          </a>
        </div>
      </div>
    </div>
  );
}
