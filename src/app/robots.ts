import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // الرابط الأساسي للموقع
  const baseUrl = 'https://ramadanduaass.vercel.app';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',      // منع أرشفة روابط العمليات الخلفية
          '/admin/',    // حماية مسارات الإدارة (إن وجدت)
          '/_next/',    // تجاهل ملفات النظام الأساسية
          '/private/',  // الملفات الخاصة بالتطوير
          '/*.json$',   // منع أرشفة ملفات البيانات الخام
          '/search',    // ✅ منع أرشفة صفحات البحث لتجنب تكرار المحتوى (Duplicate Content)
        ],
      },
      {
        // إعدادات خاصة لـ Googlebot لتحسين الـ Rendering
        userAgent: 'Googlebot',
        allow: [
            '/',
            '/_next/static/css/',   // السماح بالتنسيقات
            '/_next/static/chunks/', // السماح بملفات التشغيل
            '/_next/static/media/',  // ✅ السماح بالصور والخطوط لضمان رؤية التصميم كاملاً
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
