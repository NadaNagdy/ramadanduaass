import type { Metadata } from 'next';
import DuaCardClient from '../dua-card-client'; // استيراد المكون من المجلد الأعلى

// 1. تعريف النوع كـ Promise (إجباري في Next.js 15)
type Props = {
  params: Promise<{ slug: string }>;
};

// 2. دالة الميتا داتا
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // انتظار الـ params
  const title = decodeURIComponent(slug.replace(/-/g, ' '));
  
  return {
    title: `${title} - منصة الأدعية`,
  };
}

// 3. الصفحة الرئيسية للدعاء
export default async function DuaPage({ params }: Props) {
  const { slug } = await params; // انتظار الـ params
  
  // معالجة النص: تحويل "morning-dua" إلى "morning dua"
  const title = decodeURIComponent(slug.replace(/-/g, ' '));
  
  // هنا يمكنك جلب نص الدعاء الحقيقي من قاعدة بيانات بناءً على الـ slug
  // سأضع نصاً افتراضياً للتجربة
  const duaText = `هذا هو نص دعاء: ${title}. اللهم تقبل منا ومنكم صالح الأعمال.`;

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <DuaCardClient title={title} dua={duaText} />
    </main>
  );
}
