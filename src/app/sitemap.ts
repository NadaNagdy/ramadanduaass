// app/sitemap.ts

import { MetadataRoute } from 'next';
import { categories } from '@/lib/duas';
import { getSortedPostsData } from '@/lib/posts'; // ✅ استيراد دالة جلب المقالات

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ramadanduaass.com';
  const lastModified = new Date();

  /* -------- Static Routes -------- */
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/ramadan',
    '/ramadan/laylat-alqadr',
    '/yawm-aljumaa',
    '/share',
    '/community',
    '/blog', // ✅ إضافة مسار المدونة الرئيسي
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'daily' as const, // تم التعديل ليومية لضمان تحديث المحتوى الرمضاني
    priority: route === '' ? 1 : 0.8,
  }));

  /* -------- Category Routes -------- */
  const categoryRoutes: MetadataRoute.Sitemap = categories.map(cat => ({
    url: `${baseUrl}/categories/${cat.id}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  /* -------- Blog Article Routes (Dynamic) -------- */
  // جلب المقالات المتاحة حالياً بناءً على التاريخ
  const posts = getSortedPostsData();
  const blogRoutes: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date as string),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  /* -------- New Special Category Routes -------- */
  const newCategoryRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/categories/adeyat-alzawaj`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories/adeyat-alabnaa`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories/adeyat-alsafar`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  return [...staticRoutes, ...categoryRoutes, ...blogRoutes, ...newCategoryRoutes];
}
