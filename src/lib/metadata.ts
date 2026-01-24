// lib/metadata.ts
// Global SEO configuration for the entire site

import { Metadata } from 'next';

export const siteConfig = {
  name: 'أدعية رمضان',
  description: 'أدعية رمضان المبارك - مجموعة شاملة من الأدعية الصحيحة من القرآن والسنة لرمضان، الجمعة، ليلة القدر، الزواج، الأبناء، السفر وجميع المناسبات',
  url: 'https://ramadanduaass.com',
  ogImage: 'https://ramadanduaass.com/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/ramadanduaass',
    facebook: 'https://facebook.com/ramadanduaass',
  },
  keywords: [
    // رمضان
    'أدعية رمضان',
    'ادعية رمضان',
    'دعاء رمضان',
    'أدعية رمضان مكتوبة',
    'ادعية رمضان مكتوبة',
    
    // ليلة القدر
    'أدعية ليلة القدر',
    'دعاء ليلة القدر',
    'ليلة القدر',
    
    // الجمعة
    'أدعية يوم الجمعة',
    'دعاء يوم الجمعة',
    'دعاء الجمعة',
    'ادعية الجمعة',
    
    // الزواج
    'أدعية الزواج',
    'دعاء الزواج',
    'دعاء الزواج من شخص معين',
    'دعاء تيسير الزواج',
    'دعاء الزوج الصالح',
    
    // الأبناء
    'أدعية الأبناء',
    'دعاء للأبناء',
    'دعاء للأولاد',
    'دعاء حفظ الأبناء',
    'دعاء صلاح الأبناء',
    
    // السفر
    'أدعية السفر',
    'دعاء السفر',
    'دعاء السفر الكامل',
    'دعاء ركوب السيارة',
    'دعاء الاستيداع',
    'دعاء المسافر',
    
    // General
    'أدعية مستجابة',
    'أدعية من القرآن والسنة',
    'أدعية إسلامية',
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
      name: 'أدعية رمضان',
      url: siteConfig.url,
    },
  ],
  creator: 'أدعية رمضان',
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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'religion',
  classification: 'Islamic Duas and Prayers',
  other: {
    'google-site-verification': 'your-verification-code',
    'msvalidate.01': 'your-bing-verification-code',
  },
};

// Helper function to generate page-specific metadata
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
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    openGraph: {
      type: 'article',
      locale: 'ar_EG',
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
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

// Compatibility helper for existing pages (fix build errors)
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
  });
}
