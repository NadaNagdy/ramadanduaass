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
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>واتساب</span>
              </a>

              {/* Facebook */}
              
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>فيسبوك</span>
              </a>

              {/* Twitter/X */}
              
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(pageTitle)}&url=${encodeURIComponent(pageUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 hover:bg-black text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>تويتر</span>
              </a>

              {/* Telegram */}
              
                href={`https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-500 hover:bg-sky-600 text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
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
