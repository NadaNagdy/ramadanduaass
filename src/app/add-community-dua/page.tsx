"use client";

import React, { useState } from 'react';
import { FloatingStars, CrescentMoon, DecorativeDivider } from '@/components/islamic-decorations';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Sparkles } from 'lucide-react';

export default function AddCommunityDuaPage() {
  const [duaText, setDuaText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!duaText.trim()) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "الرجاء كتابة الدعاء أولاً",
      });
      return;
    }

    if (duaText.trim().length < 10) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "الدعاء قصير جداً. اكتب على الأقل 10 أحرف",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('community_duas')
        .insert([
          {
            text: duaText.trim(),
            author: authorName.trim() || 'زائر كريم',
            likes: 0,
            created_at: new Date().toISOString(),
          }
        ])
        .select();

      if (error) throw error;

      const insertedDuaId = data?.[0].id;

      // رسالة النجاح
      toast({
        title: "تقبل الله دعاءكم 🤲",
        description: "تم نشر دعائك بنجاح. جزاك الله خيراً",
        duration: 3000,
      });

      // الانتقال إلى صفحة المجتمع مع تمييز الدعاء الجديد
      setTimeout(() => {
        router.push(`/community-duas?newDua=${insertedDuaId}`);
      }, 1500);

    } catch (error) {
      console.error('Error adding dua:', error);
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "لم نتمكن من نشر الدعاء. حاول مرة أخرى",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient pt-32 pb-20 px-4">
      <FloatingStars />
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block p-4 bg-gold/10 rounded-full mb-6 animate-float">
            <CrescentMoon className="w-12 h-12 text-gold" />
          </div>
          <h1 className="font-amiri text-4xl md:text-5xl font-bold text-gold mb-4">
            شارك دعاءك مع المجتمع
          </h1>
          <p className="text-cream/70 text-lg font-cairo max-w-2xl mx-auto">
            اكتب دعاءً من قلبك ليؤمّن عليه إخوتك وأخواتك في الله
          </p>
          <DecorativeDivider className="mt-8" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {/* حقل الاسم */}
          <div className="bg-white/5 backdrop-blur-md border-2 border-gold/30 rounded-3xl p-6">
            <label className="block text-gold font-amiri text-lg mb-3 text-right">
              <Sparkles className="w-5 h-5 inline ml-2" />
              اسمك (اختياري)
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="مثلاً: أحمد، فاطمة... أو اتركه فارغاً"
              className="w-full bg-navy/50 border-2 border-gold/30 rounded-2xl px-6 py-4 text-cream text-lg font-cairo text-right focus:outline-none focus:border-gold transition-all placeholder:text-cream/30"
              maxLength={50}
              dir="rtl"
            />
            <p className="text-cream/40 text-sm mt-2 text-right font-cairo">
              إذا لم تكتب اسماً، سيظهر "زائر كريم"
            </p>
          </div>

          {/* حقل الدعاء */}
          <div className="bg-white/5 backdrop-blur-md border-2 border-gold/30 rounded-3xl p-6">
            <label className="block text-gold font-amiri text-lg mb-3 text-right">
              <span className="text-2xl ml-2">🤲</span>
              الدعاء
            </label>
            <Textarea
              value={duaText}
              onChange={(e) => setDuaText(e.target.value)}
              placeholder="مثلاً: اللهم ارزقنا الصحة والعافية، واجعل أيامنا مليئة بالسكينة والبركة..."
              className="w-full min-h-[200px] bg-navy/50 border-2 border-gold/30 rounded-2xl px-6 py-4 text-cream text-xl leading-loose font-amiri text-right focus:outline-none focus:border-gold transition-all placeholder:text-cream/30 resize-none"
              maxLength={500}
              dir="rtl"
            />
            <div className="flex items-center justify-between mt-3">
              <p className="text-cream/40 text-sm font-cairo">الحد الأقصى: 500 حرف</p>
              <p className="text-gold/60 text-sm font-cairo">{duaText.length} / 500</p>
            </div>
          </div>

          {/* رسالة تشجيعية */}
          <div className="bg-gold/10 backdrop-blur-sm rounded-2xl p-6 border border-gold/20 text-right">
            <p className="text-cream/80 text-lg font-amiri leading-relaxed">
              💚 دعاءك قد يكون سبباً في استجابة دعاء أخيك المسلم
              <br />
              🤲 من دعا لأخيه بظهر الغيب، قالت الملائكة: ولك بمثل
            </p>
          </div>

          {/* زر النشر */}
          <Button
            type="submit"
            disabled={isSubmitting || !duaText.trim()}
            className="flex-1 bg-gold text-navy font-bold py-6 text-lg rounded-2xl hover:bg-gold-light shadow-lg shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 w-full"
          >
            {isSubmitting ? (
              <>⏳ جاري النشر...</>
            ) : (
              <>
                📤 نشر الدعاء
              </>
            )}
          </Button>

          {/* ملاحظة */}
          <p className="text-center text-cream/50 text-sm font-cairo">
            بنشرك للدعاء، أنت توافق على مشاركته مع جميع زوار الموقع
          </p>
        </form>
      </div>
    </div>
  );
}
