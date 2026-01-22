
import React from 'react';
import { Metadata } from 'next';
import { generateDuaMetadata } from '@/lib/metadata';
import { StructuredData } from '@/components/seo/structured-data';
import { almaredDuas } from '@/lib/duas-data/almared-duas';
import { FloatingStars, CrescentMoon, DecorativeDivider } from '@/components/islamic-decorations';
import DuaCard from '@/components/dua-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Share2, Heart } from 'lucide-react';

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

      
        
        
        
          {/* Hero Section */}
          
            
            {almaredDuas.hero.icon}
            
              {almaredDuas.hero.title}
            
            
              {almaredDuas.hero.subtitle}
            
            
          

          {/* Introduction */}
          
            
              {almaredDuas.introduction}
            
          

          {/* Duas Sections */}
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

          {/* Share Section */}
          
            
              شارك الخير مع من تحب
            
            
              أدعية الشفاء قد تكون سبباً في شفاء مريض
            
            
              
              مشاركة الصفحة
            
          

          {/* Related Links */}
          
            
              صفحات ذات صلة
            
            
              {almaredDuas.relatedLinks.map((link) => (
                
                  
                    
                      {link.title}
                    
                  
                
              ))}
            
          
        
      
    </>
