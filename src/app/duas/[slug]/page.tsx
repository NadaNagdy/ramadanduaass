import type { Metadata } from 'next';
import { notFound } from 'next/navigation'; 
// 👇 التعديل هنا: استيراد المكون من مكانه الجديد الصحيح
import DuaCard from '@/components/dua-card'; 

// 1. قاعدة بيانات صغيرة (مؤقتة)
const DUAS_DATA: Record<string, string> = {
  'morning-dua': 'أصْبَحْنا وَأصْبَحَ المُلْكُ لله وَالحَمدُ لله، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ، لهُ المُلْكُ ولهُ الحَمْد، وهُوَ على كلِّ شَيءٍ قدير...',
  'evening-dua': 'أمْسَيْنا وَأَمْسَى المُلْكُ لله وَالحَمدُ لله، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ، لهُ المُلْكُ ولهُ الحَمْد، وهُوَ على كلِّ شَيءٍ قدير...',
  'travel-dua': 'الله أكبر، الله أكبر، الله أكبر، سُبْحانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ...',
};

type Props = {
  params: Promise<{ slug: string }>;
};

// 2. الميتا داتا
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const duaText = DUAS_DATA[slug];

  if (!duaText) return {};

  const title = decodeURIComponent(slug.replace(/-/g, ' '));

  return {
    title: `${title} مكتوب وكامل - منصة الأدعية`,
    description: `اقرأ ${title} كاملاً ومكتوباً بخط واضح. ${duaText.substring(0, 100)}...`,
    openGraph: {
      title: `${title} - دعاء مستجاب`,
      description: duaText.substring(0, 150),
      type: 'article',
    }
  };
}

// 3. صفحة العرض
export default async function DuaPage({ params }: Props) {
  const { slug } = await params;
  const duaText = DUAS_DATA[slug];

  if (!duaText) {
    notFound(); 
  }

  const title = decodeURIComponent(slug.replace(/-/g, ' '));

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <article className="container mx-auto">
        {/* استخدام المكون المستورد بالاسم الجديد */}
        <DuaCard title={title} dua={duaText} />
        
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
