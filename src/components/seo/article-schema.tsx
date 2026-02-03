'use client';

interface ArticleSchemaProps {
  title: string;
  description: string;
  date: string;
  slug: string;
  image?: string;
}

export function ArticleSchema({ title, description, date, slug, image }: ArticleSchemaProps) {
  const baseUrl = 'https://ramadanduaass.vercel.app';
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image || `${baseUrl}/og-image.jpg`, // صورة افتراضية في حال عدم وجود صورة للمقال
    "datePublished": new Date(date).toISOString(),
    "dateModified": new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": "ندي نجدي", // اسمك كخبير ومؤلف للمحتوى
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "أدعية رمضان 2026",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${slug}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
