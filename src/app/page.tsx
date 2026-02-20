import { Metadata } from 'next';
import HeroSection from '@/components/hero-section';
import DuaOfTheDay from '@/components/DuaOfTheDay';
import RamadanReflection from '@/components/ramadan-reflections';
import RamadanCountdown from '@/components/ramadan-countdown'; 
import { dailyDuas, categories as importedCategories } from '@/lib/duas';
import { getRamadanDay, isRamadan } from '@/lib/date-helper';
import RamadanDuaClient from '@/app/components/ramadan-dua-client';
import RamadanDuaLink from '@/app/components/ramadan-dua-link';
import { generateDuaMetadata } from '@/lib/metadata';
import Link from 'next/link';

// ✅ SEO Metadata - إعدادات السيرفر لضمان الأرشفة السريعة 2026
export const metadata: Metadata = generateDuaMetadata({
  title: 'أدعية رمضان 2026 - أدعية إسلامية مستجابة ومكتوبة 1447هـ',
  description: 'دليلك الكامل لأدعية شهر رمضان المبارك 2026. تصفح أدعية ليلة القدر، الرزق، والشفاء. أدعية مكتوبة وصحيحة من القرآن والسنة النبوية.',
  keywords: [
    'ادعية رمضان 2026', 'دعاء رمضان 1447', 'أدعية ليلة القدر', 
    'أدعية مكتوبة للجوال', 'دعاء اليوم', 'أدعية النصف من شعبان'
  ],
  canonicalPath: '/',
});

export default function HomePage() {
  const ramadanDay = getRamadanDay();
  const isRamadanNow = isRamadan();

  const colorMap: Record<string, string> = {
    'myself': 'from-emerald-500/20 to-teal-500/20',
    'family': 'from-blue-500/20 to-indigo-500/20',
    'laylat-al-qadr': 'from-purple-500/20 to-violet-500/20',
    'nisf-shaban': 'from-violet-500/20 to-purple-500/20',
    'wealth': 'from-amber-500/20 to-yellow-500/20',
    'marriage': 'from-pink-500/20 to-rose-500/20',
    'children': 'from-blue-500/20 to-indigo-500/20',
    'travel': 'from-purple-500/20 to-violet-500/20',
  };

  const additionalCategories = [
    { id: 'nisf-shaban', arabicName: 'أدعية النصف من شعبان', description: 'ليلة العفو والغفران', icon: '🌙', href: '/categories/adeyat-nisf-shaban' },
    { id: 'sick', arabicName: 'أدعية المريض', description: 'أدعية الشفاء والعافية', icon: '🤲', href: '/categories/adeyat-almared' },
    { id: 'wealth', arabicName: 'أدعية الرزق', description: 'أدعية جلب البركة', icon: '💰', href: '/categories/adeyat-alrezq' },
    { id: 'marriage', arabicName: 'أدعية الزواج', description: 'تيسير الزواج والنصيب', icon: '💍', href: '/categories/adeyat-alzawaj' },
    { id: 'children', arabicName: 'أدعية للأبناء', description: 'حفظ الأولاد وصلاحهم', icon: '👨‍👩‍👧‍👦', href: '/categories/adeyat-alabnaa' },
    { id: 'travel', arabicName: 'أدعية السفر', description: 'دعاء السفر والعودة', icon: '✈️', href: '/categories/adeyat-alsafar' },
  ];

  const allCategories = [
    ...importedCategories.map((cat) => ({
      id: cat.id,
      arabicName: cat.arabicName,
      description: '',
      icon: cat.icon,
      href: `/categories?active=${cat.id}`,
    })),
    ...additionalCategories,
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "أدعية رمضان 2026",
        "url": "https://ramadanduaass.vercel.app/",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://ramadanduaass.vercel.app/categories?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <div className="bg-hero-gradient min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeroSection />

      {/* العداد التنازلي - يظهر فقط إذا لم يبدأ رمضان */}
      {!isRamadanNow && (
        <section className="container mx-auto px-4 relative z-20 -mt-16 mb-12">
          <div className="max-w-2xl mx-auto">
            <RamadanCountdown targetDate="2026-02-18T18:00:00" />
          </div>
        </section>
      )}

  <div className="relative z-10 -mt-10">
        <RamadanDuaClient />
      </div>
      <RamadanDuaLink />

      <section className="container mx-auto px-4 py-24 text-center relative z-10">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-amiri text-white mb-4">
            تصفح الأدعية حسب الموضوع 2026
          </h2>
          <div className="h-1 w-24 bg-gold mx-auto rounded-full mb-6"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {allCategories.map((cat) => (
            <Link key={cat.id} href={cat.href}>
              <div className={`group relative bg-gradient-to-br ${colorMap[cat.id] || 'from-gray-500/20 to-slate-500/20'} backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 hover:border-gold/40 hover:scale-[1.03] transition-all duration-500 cursor-pointer min-h-[220px] flex flex-col items-center justify-center shadow-xl`}>
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-bold text-white font-amiri group-hover:text-gold transition-colors">
                  {cat.arabicName}
                </h3>
                {cat.description && <p className="text-white/60 text-sm font-cairo mt-2">{cat.description}</p>}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity underline decoration-gold/30 text-gold text-sm">
                  استكشف الأدعية ←
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="pb-20">
        <RamadanReflection />
      </div>
    </div>
  );
}
