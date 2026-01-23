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
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  /* -------- Category Routes (Dynamic) -------- */
  const categoryRoutes: MetadataRoute.Sitemap = categories.map(cat => ({
    url: `${baseUrl}/categories/${cat.id}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes];
}
