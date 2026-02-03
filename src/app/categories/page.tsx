"use client";

import React, { useState } from 'react';
import { categories, categoryDuas as initialCategoryDuas } from '@/lib/duas';
import { FloatingStars, DecorativeDivider, CrescentMoon } from '@/components/islamic-decorations';
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
  'quranic-duas': '/quranic-duas',
  'alabnaa': '/categories/adeyat-alabnaa', // ✅ أدعية الأبناء
  'nisf-shaban': '/categories/adeyat-nisf-shaban', // ✅ أدعية النصف من شعبان
  'sick': '/categories/adeyat-almared', // ✅ أدعية المريض
  'wealth': '/categories/adeyat-alrezq', // ✅ أدعية الرزق
  'marriage': '/categories/adeyat-alzawaj', // ✅ أدعية الزواج
  'travel': '/categories/adeyat-alsafar', // ✅ أدعية السفر
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
    const isActive = activeCategory === cat.id;
    
    const baseClassName = cn(
      'flex items-center gap-2 px-6 py-3 rounded-2xl transition-all font-amiri text-lg border',
      isActive
        ? 'bg-gold text-navy font-bold shadow-lg shadow-gold/20 border-gold'
        : 'bg-white/5 text-cream/80 border-white/10 hover:border-gold/50 hover:bg-white/10'
    );

    if (isLink) {
      return (
        <Link key={cat.id} href={specialCategoryLinks[cat.id]} className={baseClassName}>
          <span>{cat.icon}</span>
          <span>{cat.arabicName}</span>
        </Link>
      );
    }

    return (
      <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={baseClassName}>
        <span>{cat.icon}</span>
        <span>{cat.arabicName}</span>
      </button>
    );
  };

  const activeCategoryInfo = categories.find(c => c.id === activeCategory);
  const currentDuas = categoryDuas[activeCategory] || [];

  return (
    <div className="min-h-screen bg-hero-gradient pt-32 pb-20 px-4 relative overflow-hidden">
      <FloatingStars />
      
      <div className="container mx-auto max-w-4xl relative z-10 animate-fade-in">
        {/* Navigation Back */}
        <Link 
          href="/" 
          className="inline-flex items-center text-gold/70 hover:text-gold mb-8 transition-colors font-amiri text-lg group"
        >
          <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          العودة للرئيسية
        </Link>

        {/* Header Section */}
        <div className="text-center mb-16">
          <CrescentMoon className="w-20 h-20 text-gold mx-auto mb-6 animate-float" />
          <h1 className="font-amiri text-5xl md:text-6xl text-cream mb-4 drop-shadow-lg">
            أدعية بالنية
          </h1>
          <p className="text-cream/70 text-xl font-cairo max-w-2xl mx-auto">
            اختر نية دعائك واستكشف أدعية مختارة بعناية لترافقك في رحلتك الروحانية
          </p>
          <DecorativeDivider className="mt-10 opacity-50" />
        </div>
        
        {/* Category Tabs/Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(renderCategoryButton)}
        </div>

        {/* Duas Content */}
        {activeCategoryInfo && !specialCategoryLinks[activeCategoryInfo.id] && (
          <div className="animate-fade-in">
            <div className="text-center mb-10">
               <div className="text-5xl mb-4 opacity-80">{activeCategoryInfo.icon}</div>
               <h2 className="text-3xl font-bold text-gold font-amiri mb-2">
                 {activeCategoryInfo.arabicName}
               </h2>
               <p className="text-cream/50 font-cairo text-sm tracking-widest">
                 {currentDuas.length} دعاء متوفر حالياً
               </p>
            </div>

            {currentDuas.length > 0 ? (
              <div className="space-y-8 mb-16">
                {currentDuas.map((dua, index) => {
                  const duaText = typeof dua === 'string' ? dua : dua.dua;
                  return (
                    <DuaCard 
                      key={`${activeCategory}-${index}`} 
                      title={`دعاء ${index + 1}`} 
                      dua={duaText}
                      category={activeCategoryInfo.arabicName}
                      showActions={true}
                    />
                  );
                })}

                {/* AI Generate Section at Bottom */}
                <div className="text-center pt-12 border-t border-gold/10">
                  <Button
                    onClick={handleGenerateDua}
                    disabled={isGenerating || currentDuas.length >= 50}
                    variant="outline"
                    className={cn(
                      "group flex items-center justify-center gap-3 mx-auto px-10 py-8 border-2 border-dashed rounded-3xl transition-all text-xl font-amiri",
                      isGenerating || currentDuas.length >= 50
                        ? "border-white/10 text-white/30 cursor-not-allowed"
                        : "border-gold/30 text-gold hover:border-gold hover:bg-gold/5"
                    )}
                  >
                    {isGenerating ? (
                      <Loader2 className="w-7 h-7 animate-spin" />
                    ) : (
                      <PlusCircle className="w-7 h-7" />
                    )}
                    <span className="font-bold">
                      {currentDuas.length >= 50 
                        ? 'تم الوصول للحد الأقصى' 
                        : 'إنشاء المزيد من الأدعية بالذكاء الاصطناعي'}
                    </span>
                  </Button>
                  <p className="mt-4 text-cream/30 text-sm font-cairo italic">
                    يمكنك استكشاف وتوليد ما يصل إلى 50 دعاءً لكل قسم
                  </p>
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-24 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                <p className="text-cream/60 text-2xl font-amiri mb-8">
                  هذا القسم فارغ حالياً، هل تود إنشاء أدعية له؟
                </p>
                <Button
                  onClick={handleGenerateDua}
                  disabled={isGenerating}
                  className="bg-gold text-navy hover:bg-gold/90 font-cairo font-bold px-10 py-6 text-lg rounded-2xl shadow-xl transition-all active:scale-95"
                >
                  {isGenerating ? (
                    <><Loader2 className="ml-3 w-6 h-6 animate-spin" /> جاري الإنشاء... </>
                  ) : (
                    <><PlusCircle className="ml-3 w-6 h-6" /> إنشاء أدعية الآن </>
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
