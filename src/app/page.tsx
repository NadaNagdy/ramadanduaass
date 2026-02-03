import { Metadata } from 'next';
import HeroSection from '@/components/hero-section';
import DuaOfTheDay from '@/components/DuaOfTheDay';
import RamadanReflection from '@/components/ramadan-reflections';
import { dailyDuas, categories as importedCategories } from '@/lib/duas';
import { getRamadanDay, isRamadan } from '@/lib/date-helper';
import { generateDuaMetadata } from '@/lib/metadata';
import Link from 'next/link';
import Script from 'next/script'; // استيراد مكون Script للتعامل مع السكريبتات

// تحديث إعدادات الـ SEO لتشمل عام 2026 بشكل أساسي
export const metadata: Metadata = generateDuaMetadata({
  title: 'أدعية رمضان 2026 - أدعية إسلامية مستجابة ومكتوبة 1447هـ',
  description:
    'دليلك الكامل لأدعية شهر رمضان المبارك 2026. تصفح أدعية ليلة القدر، الجمعة، الرزق، والشفاء. أدعية مكتوبة وصحيحة من القرآن والسنة النبوية.',
  keywords: [
    'ادعية رمضان 2026',
    'دعاء رمضان 1447',
    'أدعية ليلة القدر مستجابة',
    'أدعية مكتوبة للجوال',
    'دعاء اليوم في رمضان',
    'تطبيق أدعية إسلامية',
    'أدعية النصف من شعبان',
    'دعاء الشفاء والرزق'
  ],
  canonicalPath: '/',
});

export default function HomePage() {
  const ramadanDay = getRamadanDay();
  const isRamadanNow = isRamadan();

  const duaForToday =
    isRamadanNow && ramadanDay
      ? dailyDuas.find((d) => d.day === ramadanDay)
      : dailyDuas[0];

  const specialCategoryLinks: Record<string, string> = {
    'laylat-al-qadr': '/laylat-al-qadr',
    'prophets-duas': '/prophets-duas',
    'quranic-duas': '/quranic-duas'
  };

  const colorMap: Record<string, string> = {
    'myself': 'from-emerald-500/20 to-teal-500/20',
    'family': 'from-blue-500/20 to-indigo-500/20',
    'jannah': 'from-pink-500/20 to-rose-500/20',
    'laylat-al-qadr': 'from-purple-500/20 to-violet-500/20',
    'prophets-duas': 'from-amber-500/20 to-yellow-500/20',
    'quranic-duas': 'from-green-500/20 to-emerald-500/20',
    'healing': 'from-cyan-500/20 to-blue-500/20',
    'country': 'from-red-500/20 to-orange-500/20',
    'sick': 'from-emerald-500/20 to-teal-500/20',
    'wealth': 'from-amber-500/20 to-yellow-500/20',
    'marriage': 'from-pink-500/20 to-rose-500/20',
    'children': 'from-blue-500/20 to-indigo-500/20',
    'travel': 'from-purple-500/20 to-violet-500/20',
    'nisf-shaban': 'from-violet-500/20 to-purple-500/20',
  };

  const additionalCategories = [
   {
      id: 'nisf-shaban',
      arabicName: 'أدعية النصف من شعبان',
      description: 'ليلة العفو والغفران والستر',
      icon: '🌙',
      href: '/categories/adeyat-nisf-shaban',
    },
    {
      id: 'sick',
      arabicName: 'أدعية المريض',
      description: 'أدعية الشفاء والعافية',
      icon: '🤲',
      href: '/categories/adeyat-almared',
    },
    {
      id: 'wealth',
      arabicName: 'أدعية الرزق',
      description: 'أدعية جلب الرزق والبركة',
      icon: '💰',
      href: '/categories/adeyat-alrezq',
    },
    {
      id: 'marriage',
      arabicName: 'أدعية الزواج',
      description: 'أدعية تيسير الزواج وفتح النصيب',
      icon: '💍',
      href: '/categories/adeyat-alzawaj',
    },
    {
      id: 'children',
      arabicName: 'أدعية للأبناء',
      description: 'أدعية حفظ الأولاد وصلاحهم',
      icon: '👨‍👩‍👧‍👦',
      href: '/categories/adeyat-alabnaa',
    },
    {
      id: 'travel',
      arabicName: 'أدعية السفر',
      description: 'أدعية السفر والعودة بالسلامة',
      icon: '✈️',
      href: '/categories/adeyat-alsafar',
    },
  ];

  const allCategories = [
    ...importedCategories.map((cat) => ({
      id: cat.id,
      arabicName: cat.arabicName,
      description: '',
      icon: cat.icon,
      href: specialCategoryLinks[cat.id] || `/categories?active=${cat.id}`,
    })),
    ...additionalCategories,
  ];

  // إعداد بيانات الـ Schema المدمجة
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
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "ما هو دعاء اليوم في رمضان؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "يقدم التطبيق دعاءً متجدداً لكل يوم من أيام شهر رمضان المبارك بناءً على التاريخ الهجري الحالي."
            }
          },
          {
            "@type": "Question",
            "name": "هل يمكن العثور على أدعية ليلة القدر؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "نعم، يتضمن التطبيق قسماً مخصصاً لأدعية ليلة القدر والأدعية المأثورة في العشر الأواخر من رمضان."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-hero-gradient min-h-screen">
      {/* حقن البيانات المنظمة لـ SEO أفضل */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeroSection />

      {duaForToday && (
        <div className="relative z-10 -mt-20">
          <DuaOfTheDay dua={duaForToday} />
        </div>
      )}

      <section className="container mx-auto px-4 py-24 text-center relative z-10">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-amiri text-white mb-4">
            تصفح الأدعية حسب الموضوع
          </h2>
          <div className="h-1 w-24 bg-gold mx-auto rounded-full mb-6"></div>
          <p className="text-white/70 text-lg font-amiri">
            اختر النية التي تود الدعاء بها واستكشف كنوز الأدعية المأثورة
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {allCategories.map((cat) => {
            const color = colorMap[cat.id] || 'from-gray-500/20 to-slate-500/20';

            return (
              <Link key={cat.id} href={cat.href}>
                <div
                  className={`
                    group relative bg-gradient-to-br ${color}
                    backdrop-blur-xl rounded-[2rem] p-8
                    border border-white/10
                    hover:border-gold/40 hover:scale-[1.03]
                    transition-all duration-500 ease-out
                    cursor-pointer min-h-[220px]
                    flex flex-col items-center justify-center
                    shadow-xl hover:shadow-gold/10
                  `}
                >
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity"></div>
                  
                  <div className="text-6xl mb-4 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500">
                    {cat.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white font-amiri group-hover:text-gold transition-colors">
                    {cat.arabicName}
                  </h3>
                  
                  {cat.description && (
                    <p className="text-white/60 text-sm font-cairo mt-2">
                      {cat.description}
                    </p>
                  )}
                  
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-gold text-sm font-cairo">استكشف الأدعية ←</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="pb-20">
        <RamadanReflection />
      </div>
    </div>
  );
}
