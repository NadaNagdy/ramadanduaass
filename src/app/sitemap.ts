// app/sitemap.ts

import { MetadataRoute } from 'next';
import { categories } from '@/lib/duas';

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
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  /* -------- Category Routes (Dynamic from categories array) -------- */
  const categoryRoutes: MetadataRoute.Sitemap = categories.map(cat => ({
    url: `${baseUrl}/categories/${cat.id}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  /* -------- New Category Routes (الزواج، الأبناء، السفر) -------- */
  const newCategoryRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/categories/adeyat-alzawaj`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Higher priority - important category
    },
    {
      url: `${baseUrl}/categories/adeyat-alabnaa`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Higher priority - important category
    },
    {
      url: `${baseUrl}/categories/adeyat-alsafar`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Higher priority - important category (500K searches!)
    },
  ];

  return [...staticRoutes, ...categoryRoutes, ...newCategoryRoutes];
}
