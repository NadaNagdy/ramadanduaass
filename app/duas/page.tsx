import DuaCardClient from './dua-card-client';
import type { Metadata } from 'next';

// تعريف النوع ليكون Promise (متطلب Next.js 15)
type Props = {
  params: Promise<{ slug: string }>;
};

// دالة الميتا داتا
export async function generateMetadata({ params }: Props): Promise<Metadata> {
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

// مكون الصفحة الرئيسي
export default async function DuaPage({ params }: Props) {
  const { slug } = await params;

  const title = decodeURIComponent(slug.replace(/-/g, ' '));
  const duaText = 'اللهم ارزقنا الخير والبركة';

  return <DuaCardClient title={title} dua={duaText} />;
}
