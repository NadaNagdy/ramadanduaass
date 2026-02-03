import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { nisfShabanDuas } from '@/lib/duas-data/nisf-shaban-duas';
import AdeyatNisfShabanClient from './AdeyatNisfShabanClient';

/* ✅ SEO Metadata المطور لعام 2026 - يعمل هنا بنجاح لأنه Server Component */
export const metadata: Metadata = generatePageMetadata({
  title: `${nisfShabanDuas.seo.title} 2026 - 1447هـ`,
  description: nisfShabanDuas.seo.description,
  keywords: [...nisfShabanDuas.seo.keywords, 'موعد ليلة النصف من شعبان 2026', 'أدعية مستجابة شعبان'],
  path: nisfShabanDuas.seo.canonicalPath,
});

export default function Page() {
  return <AdeyatNisfShabanClient />;
}
