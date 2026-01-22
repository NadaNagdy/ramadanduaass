import type { Metadata } from 'next';
import DuaCardClient from './dua-card-client';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const duaTitle = decodeURIComponent(params.slug.replace(/-/g, ' '));
  return {
    title: `${duaTitle} – دعاء مستجاب`,
    description: `دعاء ${duaTitle} مكتوب، يمكنك نسخه أو مشاركته.`,
    keywords: ['دعاء', 'أدعية', 'دعاء مستجاب', duaTitle],
  };
}

export default function DuaPage({ params }: PageProps) {
  const title = decodeURIComponent(params.slug.replace(/-/g, ' '));
  const duaText = 'اللهم ارزقنا الخير والبركة'; // ممكن تجيبه من DB لاحقاً
  return <DuaCardClient title={title} dua={duaText} />;
}
