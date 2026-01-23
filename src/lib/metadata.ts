
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
```

### 1.2 مكون Structured Data
```typescript
// src/components/seo/structured-data.tsx

import React from 'react';

interface StructuredDataProps {
  type: 'WebPage' | 'Article' | 'FAQPage';
  data: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    
  );
}

// مثال للاستخدام في صفحة دعاء
export function DuaPageStructuredData({
  title,
  description,
  url,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
}) {
  return (
    <StructuredData
      type="Article"
      data={{
        headline: title,
        description,
        url,
        datePublished,
        dateModified: dateModified || datePublished,
        author: {
          '@type': 'Organization',
          name: 'Ramadan Duas',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Ramadan Duas',
          logo: {
            '@type': 'ImageObject',
            url: 'https://ramadanduaass.com/logo.png',
          },
        },
      }}
    />
  );
}
