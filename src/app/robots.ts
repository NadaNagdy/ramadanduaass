// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // تأكد من استخدام الرابط الذي تظهر به في نتائج جوجل حالياً
  const baseUrl = 'https://ramadanduaass.vercel.app';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',      // منع أرشفة روابط العمليات الخلفية
          '/admin/',    // حماية مسارات الإدارة (إن وجدت)
          '/_next/',    // تجاهل ملفات النظام الخاصة بـ Next.js
          '/private/',  // أي ملفات خاصة بالتطوير
          '/*.json$',   // منع أرشفة ملفات البيانات الخام
        ],
      },
      // توجيهات خاصة لمحرك بحث جوجل لضمان وصول كامل للملفات العامة
      {
        userAgent: 'Googlebot',
        allow: [
            '/',
            '/_next/static/css/', // السماح بجلب التنسيقات لضمان عرض الصفحة بشكل سليم للزاحف
            '/_next/static/chunks/', // السماح بجلب ملفات الـ JS الضرورية للـ Rendering
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
