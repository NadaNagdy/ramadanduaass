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
    <script
      type="application/ld+json"
      // JSON.stringify ضروري عشان يكون String صالح
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
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
