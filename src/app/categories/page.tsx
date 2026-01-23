"use client";

import React, { useState } from 'react';
import { categories, categoryDuas as initialCategoryDuas } from '@/lib/duas';
import { FloatingStars, DecorativeDivider, CrescentMoon } from '@/components/islamic-decorations';
import DuaCard from '@/components/dua-card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Loader2, PlusCircle } from 'lucide-react';
import { generateCategoryDuas } from '@/ai/flows/generate-category-duas-flow';
import { useToast } from '@/hooks/use-toast';

// الأقسام التي لها صفحات خاصة (إذا أردت الانتقال لصفحة أخرى)
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
  // تفعيل أول قسم لا يحتوي على رابط خاص كافتراضي
  const [activeCategory, setActiveCategory] = useState<string>(
    categories.find(c => !specialCategoryLinks[c.id])?.id || categories[0].id
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
      toast({ title: "تم إضافة أدعية جديدة بنجاح" });
    } catch (error) {
      toast({ variant: "destructive", title: "فشل إنشاء الأدعية" });
    } finally {
      setIsGenerating(false);
    }
  };

  const activeCategoryInfo = categories.find(c => c.id === activeCategory);
  const currentDuas = categoryDuas[activeCategory] || [];

  return (
    <div className="min-h-screen bg-hero-gradient pt-24 pb-16 px-4">
      <FloatingStars />
      <div className="container mx-auto max-w-4xl text-center animate-fade-in">
        <CrescentMoon className="w-16 h-16 text-gold mx-auto mb-4" />
        <h1 className="font-amiri text-4xl text-cream mb-4">أدعية بالنية</h1>
        <DecorativeDivider className="mb-12" />
        
        {/* أزرار الأقسام */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'flex items-center gap-2 px-6 py-3 rounded-2xl transition-all border',
                activeCategory === cat.id
                  ? 'bg-gold text-navy font-bold shadow-lg border-gold'
                  : 'bg-card text-cream/60 border-gold/20 hover:border-gold/50'
              )}
            >
              <span>{cat.icon}</span>
              <span>{cat.arabicName}</span>
            </button>
          ))}
        </div>

        {/* عرض الأدعية - تم إزالة شرط الحجب عن الأقسام الخاصة */}
        {activeCategoryInfo && (
          <div className="space-y-8 animate-fade-in text-left">
            {currentDuas.length > 0 ? (
              currentDuas.map((dua, index) => {
                const duaText = typeof dua === 'string' ? dua : dua.dua;
                return (
                  <DuaCard 
                    key={`${activeCategory}-${index}`} 
                    title={`${activeCategoryInfo.arabicName} - ${index + 1}`} 
                    dua={duaText}
                    showActions={true}
                  />
                );
              })
            ) : (
              <p className="text-cream/50">لا توجد أدعية في هذا القسم حالياً.</p>
            )}

            {/* زر الذكاء الاصطناعي يظهر فقط للأقسام العادية (غير القرآنية/النبوية) */}
            {!specialCategoryLinks[activeCategoryInfo.id] && (
              <div className="mt-12 text-center pt-8">
                <Button
                  onClick={handleGenerateDua}
                  disabled={isGenerating || currentDuas.length >= 50}
                  variant="outline"
                  className="group flex items-center justify-center gap-3 mx-auto px-8 py-6 border-2 border-dashed border-gold/30 rounded-2xl text-gold hover:border-gold hover:bg-gold/5 transition-all"
                >
                  {isGenerating ? <Loader2 className="w-6 h-6 animate-spin" /> : <PlusCircle className="w-6 h-6" />}
                  <span className="font-bold">استكشف المزيد بالذكاء الاصطناعي</span>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
