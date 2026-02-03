'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { CrescentMoon } from '@/components/islamic-decorations';
import { FloatingStars } from '@/components/islamic-decorations';

export default function HeroSection() {
    return (
        <section className="relative text-white text-center py-28 md:py-40 px-4 overflow-hidden">
            {/* الخلفية المتحركة - تم عزلها لتقليل إعادة الرندرة */}
            <FloatingStars />
            
            <div className="relative z-10 animate-fade-in">
                {/* 1. تحسين SEO للأيقونة: إضافة aria-hidden لأنها ديكور فقط */}
                <CrescentMoon 
                    className="w-24 h-24 text-gold mx-auto mb-6 glow-gold animate-float" 
                    aria-hidden="true"
                />

                {/* 2. تحسين LCP: العنوان يجب أن يكون واضحاً ومباشراً */}
                <h1 className="font-amiri text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                    أدعية رمضان 2026
                </h1>
                
                {/* 3. الوصف: إضافة كلمات مفتاحية طبيعية */}
                <p className="text-xl text-cream/80 max-w-2xl mx-auto mb-10 font-amiri leading-relaxed">
                    مجموعتك المتكاملة من <strong>أدعية شهر رمضان</strong> المبارك. استمتع بتجربة إيمانية فريدة مع أدعية مستجابة وتأملات يومية.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    {/* 4. زر الذكاء الاصطناعي - تحديث الرابط ليكون وصفياً */}
                    <Link href="/ai-dua" passHref>
                        <Button 
                            size="lg"
                            className="bg-gold hover:bg-gold-light text-navy font-cairo font-bold text-lg rounded-xl shadow-lg shadow-gold/20 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                        >
                            <Sparkles className="ml-2 w-5 h-5" />
                            اصنع دعاءك بالذكاء الاصطناعي
                        </Button>
                    </Link>

                    {/* 5. تحسين إمكانية الوصول (Accessibility) للأزرار */}
                    <Link href="/daily-duas" passHref>
                        <Button 
                            size="lg" 
                            variant="outline"
                            className="text-cream border-cream/30 hover:bg-white/10 hover:text-white font-cairo font-bold text-lg rounded-xl w-full sm:w-auto transition-colors"
                        >
                            تصفح أدعية الأيام
                            <ArrowLeft className="mr-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
