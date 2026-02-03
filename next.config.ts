import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* 1. تحسين الأداء عبر ضغط المخرجات */
  compress: true,
  
  /* 2. إعدادات الصور المحسنة */
  images: {
    formats: ['image/avif', 'image/webp'], // دعم أحدث الصيغ لتقليل الحجم
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },

  /* 3. إعدادات الأرشفة والـ SEO (إضافة Headers للأمان) */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  /* 4. خيارات البناء (Build Options) */
  typescript: {
    // يفضل جعلها false عند الاستقرار لضمان جودة الكود
    ignoreBuildErrors: true, 
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  /* 5. تحسينات إضافية لـ Next.js 15+ */
  experimental: {
    // تفعيل ميزات تحسين الـ Bundle إذا كنت تستخدم مكتبات كبيرة
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
