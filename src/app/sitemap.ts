import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ramadanduaass.com';
  
  const routes = [
    '',
    '/categories/adeyat-almared',
    '/categories/adeyat-alrezq',
    '/categories/adeyat-alzawaj',
    '/categories/adeyat-alabnaa',
    '/categories/adeyat-alsafar',
    '/ramadan',
    '/ramadan/laylat-alqadr',
    '/yawm-aljumaa',
    '/share',
    '/community',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
