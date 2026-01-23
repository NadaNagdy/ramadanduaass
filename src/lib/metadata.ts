
import { Metadata } from 'next';

export function generateDuaMetadata({
  title,
  description,
  keywords,
  canonicalPath,
  imageUrl = '/og-image.jpg',
}: {
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
  imageUrl?: string;
}): Metadata {
  const baseUrl = 'https://ramadanduaass.com'; // غيّر للدومين الحقيقي
  const fullUrl = `${baseUrl}${canonicalPath}`;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'Ramadan Duas' }],
    creator: 'Ramadan Duas',
    publisher: 'Ramadan Duas',
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'أدعية رمضان',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'ar_EG',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
