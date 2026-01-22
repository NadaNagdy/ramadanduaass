
import React from 'react';
import { Metadata } from 'next';
import { generateDuaMetadata } from '@/lib/metadata';
import { StructuredData } from '@/components/seo/structured-data';
import { almaredDuas } from '@/lib/duas-data/almared-duas';
import { FloatingStars, CrescentMoon, DecorativeDivider } from '@/components/islamic-decorations';
import DuaCard from '@/components/dua-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShareSection } from './share-section';

// SEO Metadata
export const metadata: Metadata = generateDuaMetadata(almaredDuas.seo);

export default function AdeyatAlmaredPage() {
  return (
    <>
      {/* Structured Data */}
      <StructuredData
        type="WebPage"
        data={{
          name: almaredDuas.seo.title,
          description: almaredDuas.seo.description,
          url: `https://ramadanduaass.com${almaredDuas.seo.canonicalPath}`,
        }}
      />

      <div className="min-h-screen bg-hero-gradient pt-24 pb-16 px-4">
        <FloatingStars />
        <div className="container mx-auto max-w-4xl text-center animate-fade-in">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="text-6xl mb-4">{almaredDuas.hero.icon}</div>
            <h1 className="font-amiri text-4xl text-cream mb-4">
              {almaredDuas.hero.title}
            </h1>
            <p className="text-xl text-cream/80">
              {almaredDuas.hero.subtitle}
            </p>
            <DecorativeDivider className="my-8" />
          </div>

          {/* Introduction */}
          <div className="mb-12 text-right">
            <p className="text-lg text-cream/90 leading-relaxed max-w-3xl mx-auto">
              {almaredDuas.introduction}
            </p>
          </div>

          {/* Duas Sections */}
          <div className="text-left">
            {almaredDuas.sections.map((section, idx) => (
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

          {/* Share Section */}
          <ShareSection
            title={almaredDuas.seo.title}
            description={almaredDuas.seo.description}
          />

          {/* Related Links */}
          <div className="mt-16">
            <h3 className="text-2xl font-amiri text-cream mb-6">
              صفحات ذات صلة
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {almaredDuas.relatedLinks.map((link, idx) => (
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
