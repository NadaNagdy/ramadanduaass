"use client";

import React, { useState } from 'react';
import { categories, categoryDuas as initialCategoryDuas } from '@/lib/duas';
import { FloatingStars, DecorativeDivider, CrescentMoon } from '@/components/islamic-decorations';
import DuaCard from '@/components/dua-card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader2, PlusCircle } from 'lucide-react';
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
      'flex items-center gap-2 px-6 py-3 rounded-2xl transition-all font-cairo',
      activeCategory === cat.id
        ? 'bg-gold text-navy font-bold shadow-lg shadow-gold/20'
        : 'bg-white/5 text-cream/80 border border-gold/20 hover:border-gold/50 hover:bg-white/10'
    );

    if (isLink) {
      return (
        <Link
          key={cat.id}
          href={specialCategoryLinks[cat.id]}
          className={baseClassName}
        >
          <span className="text-xl">{cat.icon}</span>
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
        <span className="text-xl">{cat.icon}</span>
        <span>{cat.arabicName}</span>
      </button>
    );
  };

  const activeCategoryInfo = categories.find(c => c.id === activeCategory);
  const currentDuas = categoryDuas[activeCategory] || [];

  return (
    <div className="min-h-screen bg-hero-gradient pt-32 pb-20 px-4">
      <FloatingStars />
      
      <div className="container mx-auto max-w-4xl text-center animate-fade-in">
        {/* Header */}
        <div className="mb-12">
          <CrescentMoon className="w-16 h-16 text-gold mx-auto mb-4 animate-float" />
          <h1 className="font-amiri text-4xl md:text-5xl text-cream mb-4">
            أدعية بالنية
          </h1>
          <p className="text-cream/70 text-lg font-cairo">
            اختر نية دعائك واستكشف أدعية مكتوبة من القرآن والسنة
          </p>
          <DecorativeDivider className="mt-8" />
        </div>
        
        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(renderCategoryButton)}
        </div>

        {/* Duas List */}
        {activeCategoryInfo && !specialCategoryLinks[activeCategoryInfo.id] && (
          <div className="animate-fade-in">
            {currentDuas.length > 0 ? (
              <>
                <div className="space-y-6 text-left mb-12">
                  {currentDuas.map((dua, index) => {
                    const duaText = typeof dua === 'string' ? dua : dua.dua;
                    return (
                      <DuaCard 
                        key={`${activeCategory}-${index}`} 
                        title={`${activeCategoryInfo.arabicName} - ${index + 1}`} 
                        dua={duaText}
                        showActions={true}
                      />
                    );
                  })}
                </div>

                {/* AI Generate Button */}
                <div className="text-center pt-8 border-t border-gold/20">
                  <Button
                    onClick={handleGenerateDua}
                    disabled={isGenerating || currentDuas.length >= 50}
                    className={cn(
                      "group flex items-center justify-center gap-3 mx-auto px-8 py-6 rounded-2xl transition-all font-cairo font-bold text-lg",
                      isGenerating || currentDuas.length >= 50
                        ? "bg-gray-500/20 text-gray-400 cursor-not-allowed"
                        : "bg-gold/20 text-gold border-2 border-gold/40 hover:bg-gold/30 hover:border-gold hover:scale-105"
                    )}
                  >
                    {isGenerating ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <PlusCircle className="w-6 h-6" />
                    )}
                    <span>
                      {currentDuas.length >= 50 
                        ? 'تم الوصول للحد الأقصى' 
                        : 'استكشف المزيد من الأدعية بالذكاء الاصطناعي'}
                    </span>
                  </Button>
                  
                  <p className="mt-4 text-cream/40 text-sm font-cairo">
                    {currentDuas.length >= 50 
                      ? 'لقد وصلت للحد الأقصى من الأدعية في هذا القسم'
                      : `يمكنك استكشاف ما يصل إلى 50 دعاءً في كل قسم`}
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-cream/60 text-xl font-amiri mb-6">
                  لا توجد أدعية في هذا القسم حالياً
                </p>
                <Button
                  onClick={handleGenerateDua}
                  disabled={isGenerating}
                  className="bg-gold text-navy hover:bg-gold-light font-cairo font-bold px-8 py-4"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="ml-2 w-5 h-5 animate-spin" />
                      جاري الإنشاء...
                    </>
                  ) : (
                    <>
                      <PlusCircle className="ml-2 w-5 h-5" />
                      إنشاء أدعية بالذكاء الاصطناعي
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
