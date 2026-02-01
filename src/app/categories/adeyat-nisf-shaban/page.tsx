import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Share2, Heart } from 'lucide-react';
import { generatePageMetadata } from '@/lib/metadata';
import { StructuredData } from '@/components/seo/structured-data';
import { nisfShabanDuas } from '@/lib/duas-data/nisf-shaban-duas';
import {
  FloatingStars,
  CrescentMoon,
  DecorativeDivider,
} from '@/components/islamic-decorations';
import DuaCard from '@/components/dua-card';
import { Button } from '@/components/ui/button';

/* ✅ SEO Metadata */
export const metadata: Metadata = generatePageMetadata({
  title: nisfShabanDuas.seo.title,
  description: nisfShabanDuas.seo.description,
  keywords: nisfShabanDuas.seo.keywords,
  path: nisfShabanDuas.seo.canonicalPath,
});

export default function AdeyatNisfShabanPage() {
  return (
    <>
      {/* Structured Data */}
      <StructuredData
        type="WebPage"
        data={{
          name: nisfShabanDuas.seo.title,
          description: nisfShabanDuas.seo.description,
          url: `https://ramadanduaass.com${nisfShabanDuas.seo.canonicalPath}`,
        }}
      />

      <main className="relative space-y-16 py-10">
        <FloatingStars />

        {/* Hero Section */}
        <section className="text-center space-y-4">
          <div className="flex justify-center text-5xl">
            {nisfShabanDuas.hero.icon}
          </div>
          <h1 className="text-3xl font-bold">
            {nisfShabanDuas.hero.title}
          </h1>
          <p className="text-muted-foreground">
            {nisfShabanDuas.hero.subtitle}
          </p>
        </section>

        <DecorativeDivider />

        {/* Introduction */}
        <section className="max-w-3xl mx-auto text-center text-lg leading-relaxed">
          {nisfShabanDuas.introduction}
        </section>

        {/* Duas Sections */}
        {nisfShabanDuas.sections.map((section, idx) => (
          <section key={idx} className="space-y-6">
            <h2 className="text-2xl font-bold text-center">
              {section.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {section.duas.map((dua) => (
                <DuaCard key={dua.id} title={dua.arabic} dua={dua.arabic} showActions={true} />
              ))}
            </div>
          </section>
        ))}

        {/* Share Section */}
        <section className="text-center space-y-4">
          <h3 className="text-xl font-bold">
            شارك الخير مع من تحب
          </h3>
          <p className="text-muted-foreground">
            شارك هذه الأدعية مع من تحب فالدال على الخير كفاعله
          </p>
          <Button className="gap-2">
            <Share2 size={18} />
            مشاركة الصفحة
          </Button>
        </section>

        {/* Related Links */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-center">
            صفحات ذات صلة
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {nisfShabanDuas.relatedLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button variant="outline" className="gap-2">
                  <Heart size={16} />
                  {link.title}
                </Button>
              </Link>
            ))}
          </div>
        </section>

        <CrescentMoon />
      </main>
    </>
  );
}
