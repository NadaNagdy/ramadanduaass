'use client';

import React from 'react';
import Link from 'next/link';
import { Share2, Heart, Sparkles } from 'lucide-react';
import { StructuredData } from '@/components/seo/structured-data';
import { nisfShabanDuas } from '@/lib/duas-data/nisf-shaban-duas';
import {
  FloatingStars,
  CrescentMoon,
  DecorativeDivider,
} from '@/components/islamic-decorations';
import DuaCard from '@/components/dua-card';
import { Button } from '@/components/ui/button';
import ShabanCountdown from '@/components/shaban-countdown';

export default function AdeyatNisfShabanClient() {
  return (
    <>
      <StructuredData
        type="WebPage"
        data={{
          name: `${nisfShabanDuas.seo.title} 2026`,
          description: nisfShabanDuas.seo.description,
          url: `https://ramadanduaass.vercel.app${nisfShabanDuas.seo.canonicalPath}`,
        }}
      />

      <main className="relative space-y-16 py-10 px-4 overflow-hidden">
        <FloatingStars />

        {/* Hero Section المطور */}
        <section className="text-center space-y-6 pt-10 animate-fade-in">
          <div className="flex justify-center text-6xl drop-shadow-gold">
            {nisfShabanDuas.hero.icon}
          </div>
          <h1 className="text-4xl md:text-5xl font-amiri font-bold text-gold drop-shadow-sm">
            {nisfShabanDuas.hero.title} 2026
          </h1>
          <p className="text-cream/80 max-w-2xl mx-auto text-lg font-cairo leading-relaxed">
            {nisfShabanDuas.hero.subtitle}
          </p>
          
          <div className="max-w-md mx-auto pt-4">
             <ShabanCountdown targetDate="2026-02-13T18:00:00" />
          </div>
        </section>

        <DecorativeDivider />

        {/* Introduction */}
        <section className="max-w-3xl mx-auto text-center text-xl font-amiri leading-loose text-cream/90 bg-gold/5 p-8 rounded-3xl border border-gold/10">
          {nisfShabanDuas.introduction}
        </section>

        {/* Duas Sections */}
        {nisfShabanDuas.sections.map((section, idx) => (
          <section key={idx} className="container mx-auto space-y-8">
            <h2 className="text-3xl font-amiri font-bold text-center text-gold flex items-center justify-center gap-3">
              <Sparkles className="w-6 h-6" />
              {section.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {section.duas.map((dua) => (
                <DuaCard 
                    key={dua.id} 
                    title={dua.title || "دعاء مستجاب"} 
                    dua={dua.arabic} 
                    showActions={true} 
                    className="hover:scale-[1.02] transition-transform duration-300 border-gold/10"
                />
              ))}
            </div>
          </section>
        ))}

        {/* ✅ قسم روابط الأرشفة الداخلية */}
        <section className="max-w-4xl mx-auto space-y-8 bg-card-gradient p-10 rounded-[2rem] border border-gold/20 shadow-2xl">
          <h3 className="text-2xl font-amiri font-bold text-center text-gold">
             استعد لرمضان 2026 مع هذه الأدعية
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
                { href: '/categories/adeyat-alrezq', title: 'أدعية الرزق والفرج' },
                { href: '/categories/adeyat-almared', title: 'أدعية الشفاء العاجل' },
                { href: '/categories/adeyat-alzawaj', title: 'تيسير الزواج والذرية' },
                { href: '/blog/fadl-istighfar', title: 'فضل الاستغفار العظيم' },
                { href: '/daily-duas', title: 'جدول أدعية رمضان 2026' }
            ].map((link) => (
              <Link key={link.href} href={link.href}>
                <Button variant="outline" className="gap-2 bg-navy/50 border-gold/30 hover:bg-gold hover:text-navy transition-all font-cairo text-sm">
                  <Heart size={14} className="fill-current" />
                  {link.title}
                </Button>
              </Link>
            ))}
          </div>
        </section>

        {/* Share Section المطور */}
        <section className="text-center space-y-6 pb-20">
          <DecorativeDivider />
          <h3 className="text-2xl font-amiri font-bold text-cream">
            الدال على الخير كفاعله
          </h3>
          <p className="text-muted-foreground font-cairo max-w-md mx-auto">
            ساهم في نشر الأدعية لعلها تكون ساعة استجابة لأحدهم في هذه الليلة المباركة.
          </p>
          <Button size="lg" className="gap-2 bg-gold text-navy hover:bg-gold-light rounded-full px-10 py-6 text-lg font-bold shadow-gold/20">
            <Share2 size={22} />
            مشاركة الصفحة الآن
          </Button>
        </section>

        <div className="flex justify-center opacity-30 pb-10">
             <CrescentMoon className="w-20 h-20" />
        </div>
      </main>
    </>
  );
}
