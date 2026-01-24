"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FloatingStars, Lantern } from '@/components/islamic-decorations';
import GiftCard from '@/components/gift-card';
import { Sparkles } from 'lucide-react';

function ShareContent() {
  const searchParams = useSearchParams();
  const [dua, setDua] = useState('');
  const [senderName, setSenderName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const duaParam = searchParams.get('dua');
      const nameParam = searchParams.get('from');
      
      console.log('URL Params:', { duaParam, nameParam }); // للتشخيص
      
      if (duaParam) {
        setDua(decodeURIComponent(duaParam));
      } else {
        setError('لم يتم العثور على الدعاء في الرابط');
      }
      
      if (nameParam) {
        setSenderName(decodeURIComponent(nameParam));
      }
    } catch (err) {
      console.error('Error parsing URL params:', err);
      setError('حدث خطأ في قراءة البيانات');
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gold mx-auto mb-4"></div>
          <p className="text-gold font-amiri text-xl animate-pulse">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (error || !dua) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-2xl font-bold text-gold mb-4 font-amiri">
            {error || 'لم يتم العثور على الدعاء'}
          </h1>
          <p className="text-cream/60 mb-6 font-cairo">
            تأكد من صحة الرابط أو حاول مرة أخرى
          </p>
          
            href="/ai-dua"
            className="inline-block bg-gold text-navy py-3 px-6 rounded-2xl font-bold hover:bg-gold-light transition-all"
          >
            إنشاء دعاء جديد
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero-gradient pt-20 pb-20 px-4">
      <FloatingStars />
      
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block p-4 bg-gold/10 rounded-full mb-6 animate-float">
            <Sparkles className="w-12 h-12 text-gold" />
          </div>
          
          {senderName && (
            <h1 className="font-amiri text-3xl md:text-4xl text-gold mb-4">
              {senderName} أرسل لك هدية روحانية 🎁
            </h1>
          )}
          
          <p className="text-cream/70 text-lg font-cairo">
            دعاء خاص من القلب
          </p>
        </div>

        {/* Gift Card */}
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <GiftCard dua={dua} senderName={senderName} />
        </div>

        {/* Footer Message */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-cream/60 font-amiri text-lg italic mb-4">
            "تهادوا تحابوا"
          </p>
          <p className="text-gold/40 text-sm mt-2 font-cairo mb-6">
            شارك الخير مع من تحب
          </p>
          
          
            href="/ai-dua"
            className="inline-block bg-gold/20 border-2 border-gold/40 text-gold py-3 px-6 rounded-2xl font-bold hover:bg-gold/30 transition-all"
          >
            إنشاء دعاء جديد
          </a>
        </div>

        {/* Decorative Lanterns */}
        <div className="mt-20 opacity-30 pointer-events-none flex justify-center gap-20">
          <Lantern className="w-16 h-16 text-gold animate-float" />
          <Lantern className="w-16 h-16 text-gold animate-float" style={{ animationDelay: '1.5s' }} />
        </div>
      </div>
    </div>
  );
}

export default function SharePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gold mx-auto mb-4"></div>
          <p className="text-gold font-amiri text-xl animate-pulse">جاري التحميل...</p>
        </div>
      </div>
    }>
      <ShareContent />
    </Suspense>
  );
}
