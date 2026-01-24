import React from 'react';
import { Metadata } from 'next';
import { generateDuaMetadata } from '@/lib/metadata';
import { StructuredData } from '@/components/seo/structured-data';
import { alrezqDuas } from '@/lib/duas-data/alrezq-duas';
import { FloatingStars, CrescentMoon, DecorativeDivider } from '@/components/islamic-decorations';
import DuaCard from '@/components/dua-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShareSection } from '../adeyat-almared/share-section';

export const metadata: Metadata = generateDuaMetadata(alrezqDuas.seo);

export default function AdeyatAlrezqPage() {
  return (
    <>
      <StructuredData
        type="WebPage"
        data={{
          name: alrezqDuas.seo.title,
          description: alrezqDuas.seo.description,
          url: `https://ramadanduaass.com${alrezqDuas.seo.canonicalPath}`,
        }}
      />

      <div className="min-h-screen bg-hero-gradient pt-24 pb-16 px-4">
        <FloatingStars />
        <div className="container mx-auto max-w-4xl text-center animate-fade-in">
          <div className="mb-12">
            <div className="text-6xl mb-4">{alrezqDuas.hero.icon}</div>
            <h1 className="font-amiri text-4xl text-cream mb-4">
              {alrezqDuas.hero.title}
            </h1>
            <p className="text-xl text-cream/80">
              {alrezqDuas.hero.subtitle}
            </p>
            <DecorativeDivider className="my-8" />
          </div>

          <div className="mb-12 text-right">
            <p className="text-lg text-cream/90 leading-relaxed max-w-3xl mx-auto">
              {alrezqDuas.introduction}
            </p>
          </div>

          <div className="text-left">
            {alrezqDuas.sections.map((section, idx) => (
              <div key={idx} className="mb-12">
                <h2 className="text-3xl font-amiri text-gold mb-6 text-center">
                  {section.title}
                </h2>
                <div className="space-y-6">
                  {section.duas.map((dua) => (
                    <DuaCard key={dua.id} dua={dua} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <ShareSection
            title={alrezqDuas.seo.title}
            description={alrezqDuas.seo.description}
          />

          <div className="mt-16">
            <h3 className="text-2xl font-amiri text-cream mb-6">
              صفحات ذات صلة
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {alrezqDuas.relatedLinks.map((link, idx) => (
                <Link key={idx} href={link.href}>
                  <Button variant="outline" className="text-cream border-cream/30 hover:bg-cream/10">
                    {link.title}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
