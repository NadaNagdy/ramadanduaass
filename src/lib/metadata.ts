/// lib/metadata.ts
import { Metadata } from 'next';

export const siteConfig = {
  name: 'أدعية رمضان 2026',
  description: 'أكبر موسوعة لأدعية شهر رمضان المبارك 2026 - 1447هـ. أدعية مستجابة من القرآن والسنة، أدعية ليلة القدر، الرزق، الشفاء، والسفر.',
  // ملاحظة: تأكد من تطابق الـ URL مع الدومين الفعلي (vercel.app أو .com)
  url: 'https://ramadanduaass.vercel.app', 
  ogImage: 'https://ramadanduaass.vercel.app/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/ramadanduaass',
    facebook: 'https://facebook.com/ramadanduaass',
  },
  keywords: [
    // رمضان 2026
    'أدعية رمضان 2026',
    'ادعية رمضان 1447',
    'دعاء رمضان مكتوب',
    'تحميل أدعية رمضان',
    
    // ليلة القدر
    'أدعية ليلة القدر 2026',
    'دعاء العشر الأواخر من رمضان',
    'أفضل أدعية ليلة القدر',
    
    // تصنيفات حيوية
    'أدعية النصف من شعبان',
    'أدعية يوم الجمعة في رمضان',
    'أدعية الرزق والفرج',
    'أدعية الشفاء من المرض',
    'أدعية تيسير الزواج',
    'أدعية حفظ الأبناء',
    'أدعية السفر المستجابة',
    
    // كلمات عامة قوية في البحث
    'أدعية إسلامية نادرة',
    'أدعية مستجابة من الكتاب والسنة',
    'دعاء اليوم في رمضان',
  ],
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: 'علي النقرشي', // بصفتك المطور
      url: siteConfig.url,
    },
  ],
  creator: 'Aly Elnokrashy',
  publisher: 'أدعية رمضان',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@ramadanduaass',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'ar-EG': siteConfig.url,
      'ar': siteConfig.url,
    },
  },
  verification: {
    // تم ربط الكود الذي أرسلته سابقاً هنا
    google: '04Iz04z7UnvFr6OP_sUBi1tOuxHrfvcxF2iTOKyNLNY',
  },
  category: 'religion',
};

// ... الدوال المساعدة كما هي (Helper Functions)
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  path = '',
  image,
}: {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
}) {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;

  return {
    title,
    description,
    keywords: Array.from(new Set([...siteConfig.keywords, ...keywords])), // منع تكرار الكلمات
    openGraph: {
      type: 'article',
      locale: 'ar_EG',
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateDuaMetadata(seo: {
  title: string;
  description: string;
  canonicalPath: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  return generatePageMetadata({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    path: seo.canonicalPath,
    image: seo.image,
  }) as Metadata;
}
