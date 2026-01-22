import DuaCardClient from './dua-card-client';
import type { Metadata } from 'next';

// تعريف النوع ليكون Promise
type Props = {
  params: Promise<{ slug: string }>;
};

// 1. تعديل generateMetadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // ننتظر الـ params أولاً
  const { slug } = await params;
  
  const duaTitle = decodeURIComponent(slug.replace(/-/g, ' '));
  return {
    title: `${duaTitle} – دعاء مستجاب`,
    description: `دعاء ${duaTitle} مكتوب، يمكنك نسخه أو مشاركته كهدية روحانية.`,
    keywords: ['دعاء', 'أدعية', 'دعاء مستجاب', duaTitle, 'أدعية مكتوبة', 'دعاء قصير'],
    openGraph: {
      title: `${duaTitle} – دعاء مستجاب`,
      description: `شارك دعاء ${duaTitle} كهدية روحانية.`,
      url: `https://YOUR_DOMAIN/duas/${slug}`,
      siteName: 'منصة الأدعية',
      locale: 'ar_EG',
      type: 'article',
    },
  };
}

// 2. تعديل مكون الصفحة الرئيسي
// يجب أن يكون async لكي نستخدم await
export default async function DuaPage({ params }: Props) {
  // ننتظر الـ params أولاً
  const { slug } = await params;

  const title = decodeURIComponent(slug.replace(/-/g, ' '));
  const duaText = 'اللهم ارزقنا الخير والبركة';

  return <DuaCardClient title={title} dua={duaText} />;
}ms.slug.replace(/-/g, ' '));
  const duaText = 'اللهم ارزقنا الخير والبركة';

  return <DuaCardClient title={title} dua={duaText} />;
}

