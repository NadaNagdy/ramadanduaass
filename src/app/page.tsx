import { Metadata } from 'next';
import HeroSection from '@/components/hero-section';
import DuaOfTheDay from '@/components/DuaOfTheDay';
import RamadanReflection from '@/components/ramadan-reflections';
import { dailyDuas } from '@/lib/duas';
import { getRamadanDay, isRamadan } from '@/lib/date-helper';
import { generateDuaMetadata } from '@/lib/metadata';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = generateDuaMetadata({
  title: 'أدعية رمضان المبارك - أدعية إسلامية مكتوبة 2025',
  description:
    'أدعية رمضان، أدعية يوم الجمعة، أدعية ليلة القدر، وأدعية مأثورة من القرآن والسنة. أدعية للشفاء، الرزق، الزواج والأبناء',
  keywords: [
    'ادعية رمضان',
    'دعاء رمضان',
    'أدعية يوم الجمعة',
    'أدعية ليلة القدر',
    'أدعية إسلامية',
    'دعاء الشفاء',
    'دعاء الرزق',
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

  const categories = [
    {
      title: 'أدعية المريض',
      description: 'أدعية الشفاء والعافية',
      icon: '🤲',
      href: '/categories/adeyat-almared',
      color: 'from-emerald-500/20 to-teal-500/20',
    },
    {
      title: 'أدعية الرزق',
      description: 'أدعية جلب الرزق والبركة',
      icon: '💰',
      href: '/categories/adeyat-alrezq',
      color: 'from-amber-500/20 to-yellow-500/20',
    },
    {
      title: 'أدعية الزواج',
      description: 'أدعية تيسير الزواج وفتح النصيب',
      icon: '💍',
      href: '/categories/adeyat-alzawaj',
      color: 'from-pink-500/20 to-rose-500/20',
    },
    {
      title: 'أدعية للأبناء',
      description: 'أدعية حفظ الأولاد وصلاحهم',
      icon: '👨‍👩‍👧‍👦',
      href: '/categories/adeyat-alabnaa',
      color: 'from-blue-500/20 to-indigo-500/20',
    },
    {
      title: 'أدعية السفر',
      description: 'أدعية السفر والعودة بالسلامة',
      icon: '✈️',
      href: '/categories/adeyat-alsafar',
      color: 'from-purple-500/20 to-violet-500/20',
    },
  ];

  return (
    <div className="bg-hero-gradient">
      {/* Hero */}
      <HeroSection />

      {/* Dua of the Day */}
      {duaForToday && <DuaOfTheDay dua={duaForToday} />}

      {/* Categories */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-amiri text-cream mb-4">
          تصفح الأدعية حسب الموضوع
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {categories.map((category) => (
            <Link key={category.href} href={category.href}>
              <div
                className={`
                  bg-gradient-to-br ${category.color}
                  backdrop-blur-md rounded-3xl p-8
                  border border-white/10
                  hover:border-gold/50 hover:scale-105
                  transition-all duration-300
                  cursor-pointer
                `}
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-cream mb-2">
                  {category.title}
                </h3>
                <p className="text-cream/70">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Ramadan Reflection */}
      <RamadanReflection />
    </div>
  );
}
