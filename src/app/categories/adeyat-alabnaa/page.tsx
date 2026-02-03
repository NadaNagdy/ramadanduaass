// src/app/categories/adeyat-alabnaa/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { alabnaaDuas } from "@/lib/duas-data/alabnaa-duas";

// مصفوفة التصنيفات الإضافية للتنقل
const otherCategories = [
  {
    id: 'nisf-shaban',
    arabicName: 'أدعية النصف من شعبان',
    description: 'ليلة العفو والغفران',
    icon: '🌙',
    href: '/categories/adeyat-nisf-shaban'
  },
  {
    id: 'sick',
    arabicName: 'أدعية المريض',
    description: 'أدعية الشفاء والعافية',
    icon: '🤲',
    href: '/categories/adeyat-almared'
  },
  {
    id: 'wealth',
    arabicName: 'أدعية الرزق',
    description: 'أدعية جلب البركة',
    icon: '💰',
    href: '/categories/adeyat-alrezq'
  },
  {
    id: 'marriage',
    arabicName: 'أدعية الزواج',
    description: 'تيسير الزواج والنصيب',
    icon: '💍',
    href: '/categories/adeyat-alzawaj'
  },
  {
    id: 'travel',
    arabicName: 'أدعية السفر',
    description: 'دعاء السفر والعودة',
    icon: '✈️',
    href: '/categories/adeyat-alsafar'
  },
];

export const metadata: Metadata = {
  title: "أدعية الأبناء | دعاء للأبناء بالتوفيق والصلاح - أدعية رمضان",
  description: "أدعية الأبناء والأولاد مكتوبة من القرآن والسنة - دعاء للأبناء بالتوفيق والنجاح، دعاء حفظ الأولاد، دعاء صلاح الأبناء وهدايتهم، أدعية للأطفال، دعاء شفاء الأبناء المرضى",
  keywords: [
    "أدعية الأبناء",
    "دعاء للأبناء",
    "أدعية للأولاد",
    "دعاء للأولاد",
    "دعاء للأبناء بالتوفيق",
    "دعاء للأبناء بالصلاح",
    "دعاء حفظ الأبناء",
    "دعاء لحفظ الأولاد",
    "دعاء صلاح الأبناء وهدايتهم",
    "دعاء هداية الأبناء",
    "أدعية للأطفال",
    "دعاء للأطفال",
    "دعاء شفاء الأبناء",
    "دعاء للطفل المريض",
    "دعاء النجاح للأولاد",
    "دعاء الامتحانات للأبناء",
    "دعاء لأولادي",
    "دعاء لابني",
    "دعاء لبنتي",
    "دعاء الأم للأبناء"
  ],
  openGraph: {
    title: "أدعية الأبناء - دعاء للأبناء بالتوفيق والصلاح",
    description: "أدعية الأبناء الصحيحة من القرآن والسنة لحفظ الأولاد وهدايتهم وتوفيقهم",
    type: "article",
    locale: "ar_EG",
    url: "https://ramadanduaass.vercel.app/categories/adeyat-alabnaa",
    siteName: "أدعية رمضان",
  },
  alternates: {
    canonical: "https://ramadanduaass.vercel.app/categories/adeyat-alabnaa",
  },
};

export default function AlabnaaPage() {
  const pageUrl = "https://ramadanduaass.vercel.app/categories/adeyat-alabnaa";
  const pageTitle = "أدعية الأبناء";
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-amber-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span className="text-2xl">→</span>
            <span className="text-lg">العودة للرئيسية</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-6">
            <span className="text-6xl">👶</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-amber-400 mb-4">
            أدعية الأبناء
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            أدعية مباركة لحفظ الأبناء وهدايتهم وتوفيقهم من القرآن والسنة
          </p>
        </div>
      </section>

      {/* Duas Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl space-y-6">
          {alabnaaDuas.map((dua, index) => (
            <article
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-amber-500/20 hover:border-amber-500/40 transition-all shadow-xl"
            >
              {/* Arabic Text */}
              <div className="mb-6 p-6 bg-slate-900/50 rounded-xl">
                <p className="text-2xl md:text-3xl leading-loose text-amber-100 text-center font-amiri">
                  {dua.arabic}
                </p>
              </div>

              {/* Translation */}
              {dua.translation && (
                <div className="mb-4 p-4 bg-slate-700/30 rounded-lg">
                  <p className="text-lg text-slate-300 leading-relaxed">
                    <span className="font-semibold text-amber-400">المعنى:</span> {dua.translation}
                  </p>
                </div>
              )}

              {/* Source */}
              {dua.source && (
                <div className="flex items-center gap-2 text-amber-400/80 text-sm">
                  <span>📖</span>
                  <span>{dua.source}</span>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

     {/* Share Section */}
<section className="py-8 px-4">
  <div className="container mx-auto max-w-4xl">
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-amber-400 mb-2">شارك هذه الصفحة</h3>
        <p className="text-slate-300 text-sm">انشر الخير وشارك الأدعية مع من تحب</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* WhatsApp */}
        
          href={`https://wa.me/?text=${encodeURIComponent(`${pageTitle}\n\n${pageUrl}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2 transition-colors"
        >
          <span className="text-xl">💬</span>
          <span>واتساب</span>
        </a>

        {/* Facebook */}
        
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2 transition-colors"
        >
          <span className="text-xl">📘</span>
          <span>فيسبوك</span>
        </a>

        {/* Twitter/X */}
        
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(pageTitle)}&url=${encodeURIComponent(pageUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-slate-900 hover:bg-black text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2 transition-colors"
        >
          <span className="text-xl">𝕏</span>
          <span>تويتر</span>
        </a>

        {/* Telegram */}
        
          href={`https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sky-500 hover:bg-sky-600 text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2 transition-colors"
        >
          <span className="text-xl">✈️</span>
          <span>تليجرام</span>
        </a>
      </div>
    </div>
  </div>
</section>
    
      {/* Other Categories */}
      <section className="py-12 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-amber-400 text-center mb-8">
            تصنيفات أخرى
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherCategories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-amber-500/20 hover:border-amber-500/60 hover:bg-slate-700/50 transition-all"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-xl font-bold text-amber-400 mb-2 group-hover:text-amber-300">
                  {category.arabicName}
                </h3>
                <p className="text-slate-400 text-sm">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 px-4 border-t border-amber-500/20">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-slate-400">
            جميع الحقوق محفوظة © {new Date().getFullYear()} - أدعية رمضان
          </p>
        </div>
      </footer>
    </div>
  );
}
