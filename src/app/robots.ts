// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://ramadanduaass.com';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',      // منع أرشفة روابط العمليات الخلفية
          '/admin/',    // حماية مسارات الإدارة
          '/_next/',    // تجاهل ملفات النظام الخاصة بـ Next.js
          '/private/',  // أي ملفات خاصة بالتطوير
          '/*.json$',   // منع أرشفة ملفات البيانات الخام
        ],
      },
      // توجيهات خاصة لمحرك بحث جوجل لتحسين الأرشفة
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
