import type { Metadata } from 'next';
import { notFound } from 'next/navigation'; // مهم جداً للـ SEO
import DuaCardClient from '../dua-card-client';

// 1. قاعدة بيانات صغيرة (مؤقتة) لضمان محتوى حقيقي
const DUAS_DATA: Record<string, string> = {
  'morning-dua': 'أصْبَحْنا وَأصْبَحَ المُلْكُ لله وَالحَمدُ لله، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ...',
  'evening-dua': 'أمْسَيْنا وَأَمْسَى المُلْكُ لله وَالحَمدُ لله، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ...',
  'travel-dua': 'الله أكبر، الله أكبر، الله أكبر، سُبْحانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ...',
};

type Props = {
  params: Promise<{ slug: string }>;
};

// 2. تحسين الميتا داتا (العنوان + الوصف)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const duaText = DUAS_DATA[slug];

  // إذا لم يكن الدعاء موجوداً، لا نضع ميتا داتا (ستذهب لصفحة 404)
  if (!duaText) return {};

  const title = decodeURIComponent(slug.replace(/-/g, ' '));

  return {
    title: `${title} مكتوب وكامل - منصة الأدعية`,
    description: `اقرأ ${title} كاملاً ومكتوباً بخط واضح. ${duaText.substring(0, 100)}...`, // جوجل يحب الوصف المأخوذ من النص
    openGraph: {
      title: `${title} - دعاء مستجاب`,
      description: duaText.substring(0, 150),
      type: 'article',
    }
  };
}

// 3. الصفحة الرئيسية للدعاء
export default async function DuaPage({ params }: Props) {
  const { slug } = await params;
  
  // جلب النص الحقيقي
  const duaText = DUAS_DATA[slug];

  // هام جداً للـ SEO: إذا الرابط خطأ، أرسل 404 فوراً حتى لا يؤرشف جوجل صفحة فارغة
  if (!duaText) {
    notFound(); 
  }

  const title = decodeURIComponent(slug.replace(/-/g, ' '));

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      {/* استخدام article يخبر جوجل أن هذا مقال أو محتوى مقروء */}
      <article className="container mx-auto">
        <DuaCardClient title={title} dua={duaText} />
        
        {/* نص إضافي لتقوية الكلمات المفتاحية */}
        <div className="mt-8 max-w-2xl mx-auto text-gray-600 text-center leading-relaxed">
          <p>
            نقدم لكم في هذا الصفحة <strong>{title}</strong> مكتوباً بالتشكيل الكامل. 
            المواظبة على قراءة {title} من أعظم القربات التي تريح القلب وتزيل الهم.
          </p>
        </div>
      </article>
    </main>
  );
}
