"use client";

import React, { useState } from 'react';
import { categories, categoryDuas as initialCategoryDuas } from '@/lib/duas';
import DuaCard from '@/components/dua-card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader2, PlusCircle, ArrowRight } from 'lucide-react';
import { generateCategoryDuas } from '@/ai/flows/generate-category-duas-flow';
import { useToast } from '@/hooks/use-toast';

const specialCategoryLinks: Record<string, string> = {
  'laylat-al-qadr': '/laylat-al-qadr',
  'prophets-duas': '/prophets-duas',
  'quranic-duas': '/quranic-duas'
};

type DuaItem = string | {
  dua: string;
  transliteration?: string;
  meaning?: string;
  source?: string;
};

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState<string>(
    categories.filter(c => !specialCategoryLinks[c.id])[0].id
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [categoryDuas, setCategoryDuas] = useState<Record<string, DuaItem[]>>(initialCategoryDuas);
  const { toast } = useToast();

  const handleGenerateDua = async () => {
    if (!activeCategory || specialCategoryLinks[activeCategory]) return;

    const currentCategory = categories.find(c => c.id === activeCategory);
    if (!currentCategory) return;
    
    setIsGenerating(true);
    try {
      const { duas } = await generateCategoryDuas(currentCategory.arabicName);
      
      setCategoryDuas(prev => ({
        ...prev,
        [activeCategory]: [...(prev[activeCategory] || []), ...duas]
      }));

      toast({
        title: "تم إنشاء أدعية جديدة",
        description: `تمت إضافة أدعية جديدة لقسم "${currentCategory.arabicName}".`,
      });

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "لم نتمكن من إنشاء أدعية جديدة. يرجى المحاولة مرة أخرى.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const renderCategoryButton = (cat: typeof categories[0]) => {
    const isLink = !!specialCategoryLinks[cat.id];
    const baseClassName = cn(
      'flex items-center gap-2 px-6 py-3 rounded-2xl transition-all font-amiri',
      activeCategory === cat.id
        ? 'bg-white/20 text-white font-bold shadow-lg border border-white/30'
        : 'bg-white/5 text-white/70 border border-white/10 hover:border-white/30 hover:bg-white/10'
    );

    if (isLink) {
      return (
        <Link
          key={cat.id}
          href={specialCategoryLinks[cat.id]}
          className={baseClassName}
        >
          <span>{cat.icon}</span>
          <span>{cat.arabicName}</span>
        </Link>
      );
    }

    return (
      <button
        key={cat.id}
        onClick={() => setActiveCategory(cat.id)}
        className={baseClassName}
      >
        <span>{cat.icon}</span>
        <span>{cat.arabicName}</span>
      </button>
    );
  };

  const activeCategoryInfo = categories.find(c => c.id === activeCategory);
  const currentDuas = categoryDuas[activeCategory] || [];

  return (
    <div className="min-h-screen bg-hero-gradient">
      {/* Header */}
      <div className="container mx-auto px-4 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors font-amiri"
        >
          <ArrowRight className="ml-2 w-5 h-5" />
          العودة للرئيسية
        </Link>

        <div className="text-center mb-12">
          <div className="text-7xl mb-6">🌙</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-amiri">
            أدعية بالنية
          </h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1 max-w-xs"></div>
            <div className="text-white/50">✨</div>
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1 max-w-xs"></div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(renderCategoryButton)}
        </div>
      </div>

      {/* Duas Content */}
      {activeCategoryInfo && !specialCategoryLinks[activeCategoryInfo.id] && (
        <div className="container mx-auto px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-5xl mb-3">{activeCategoryInfo.icon}</div>
              <h2 className="text-2xl font-bold text-white font-amiri mb-2">
                {activeCategoryInfo.arabicName}
              </h2>
              <p className="text-white/60 font-amiri">
                {currentDuas.length} دعاء متاح
              </p>
            </div>

            <div className="space-y-6">
              {currentDuas.map((dua, index) => {
                const duaText = typeof dua === 'string' ? dua : dua.dua;
                return (
                  <DuaCard 
                    key={`${activeCategory}-${index}`} 
                    title={`دعاء ${index + 1}`} 
                    dua={duaText}
                    showActions={true}
                  />
                );
              })}
            </div>

            {/* AI Generation Button */}
            <div className="mt-12 text-center pt-8">
              <Button
                onClick={handleGenerateDua}
                disabled={isGenerating || currentDuas.length >= 50}
                variant="outline"
                className="group flex items-center justify-center gap-3 mx-auto px-8 py-6 border-2 border-dashed border-white/30 rounded-2xl text-white hover:border-white hover:bg-white/5 transition-all disabled:opacity-50 text-lg font-amiri"
              >
                {isGenerating ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <PlusCircle className="w-6 h-6" />
                )}
                <span className="font-bold">
                  {currentDuas.length >= 50 
                    ? 'تم الوصول للحد الأقصى' 
                    : 'استكشف المزيد من الأدعية بالذكاء الاصطناعي'}
                </span>
              </Button>
              <p className="mt-4 text-white/30 text-sm italic font-amiri">
                يمكنك استكشاف ما يصل إلى 50 دعاءً في كل قسم
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
