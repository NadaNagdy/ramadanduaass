import { Metadata } from 'next';
import DuaCardClient from './dua-card-client';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const duaTitle = decodeURIComponent(params.slug.replace(/-/g, ' '));

  return {
    title: `${duaTitle} – دعاء مستجاب`,
    description: `دعاء ${duaTitle} مكتوب، يمكنك نسخه أو مشاركته كهدية روحانية.`,
    keywords: [
      'دعاء',
      'أدعية',
      'دعاء مستجاب',
      duaTitle,
      'أدعية مكتوبة',
      'دعاء قصير',
    ],
    openGraph: {
      title: `${duaTitle} – دعاء مستجاب`,
      description: `شارك دعاء ${duaTitle} كهدية روحانية.`,
      url: `https://YOUR_DOMAIN/duas/${params.slug}`,
      siteName: 'منصة الأدعية',
      locale: 'ar_EG',
      type: 'article',
    },
  };
}

export default function DuaPage({ params }: PageProps) {
  const title = decodeURIComponent(params.slug.replace(/-/g, ' '));

  // لاحقًا من DB أو API
  const duaText = 'اللهم ارزقنا الخير والبركة';

  return (
    <DuaCardClient
      title={title}
      dua={duaText}
    />
  );
}
