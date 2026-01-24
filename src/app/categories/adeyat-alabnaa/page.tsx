// src/app/categories/adeyat-alabnaa/page.tsx

import type { Metadata } from "next";
import { alabnaaDuas, alabnaaCategories } from "@/lib/duas-data/alabnaa-duas";

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
    url: "https://yoursite.com/categories/adeyat-alabnaa",
    siteName: "أدعية رمضان",
  },
  alternates: {
    canonical: "https://yoursite.com/categories/adeyat-alabnaa",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function AlabnaaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "أدعية الأبناء",
            "description": "أدعية الأبناء من القرآن والسنة لحفظ الأولاد وهدايتهم",
            "url": "https://yoursite.com/categories/adeyat-alabnaa",
            "inLanguage": "ar"
          })
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <div className="inline-block mb-6 p-4 bg-white/80 backdrop-blur rounded-full shadow-lg">
            <span className="text-6xl">👨‍👩‍👧‍👦</span>
          </div>
          <h1 className="text-5xl font-bold text-cyan-900 mb-6">
            أدعية الأبناء والأولاد
          </h1>
          <p className="text-xl text-cyan-700 max-w-3xl mx-auto leading-relaxed">
            أدعية حفظ الأبناء وصلاحهم وتوفيقهم من القرآن والسنة النبوية
          </p>
        </header>

        <article className="bg-white/80 backdrop-blur rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-cyan-800 mb-6">
            أفضل أدعية الأبناء من القرآن والسنة
          </h2>
          
          <div className="prose prose-lg max-w-none text-cyan-900 space-y-6">
            <p>
              <strong>أدعية الأبناء</strong> من أعظم ما يُدعى به للأولاد. نقدم لكم أجمل 
              <strong>أدعية للأبناء بالتوفيق والصلاح</strong> و<strong>دعاء حفظ الأولاد</strong> 
              من القرآن الكريم والسنة النبوية الشريفة.
            </p>

            <h3 className="text-2xl font-bold text-cyan-800 mt-8">
              دعاء صلاح الأبناء وهدايتهم
            </h3>
            <p>
              أعظم دعاء لـ<strong>صلاح الأبناء</strong> و<strong>هداية الأولاد</strong> هو: 
              "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي". هذا <strong>دعاء هداية الأبناء</strong> 
              الذي دعا به نبي الله إبراهيم عليه السلام لصلاح ذريته.
            </p>

            <h3 className="text-2xl font-bold text-cyan-800 mt-8">
              دعاء حفظ الأبناء من كل شر
            </h3>
            <p>
              لـ<strong>حفظ الأولاد</strong> و<strong>حماية الأطفال</strong>، ادعُ بقول: 
              "اللَّهُمَّ احْفَظْ لِي أَوْلَادِي وَأَصْلِحْ لِي فِي ذُرِّيَّتِي". هذا من أفضل 
              <strong>أدعية تحصين الأطفال</strong> و<strong>حفظ الأبناء من كل مكروه</strong>.
            </p>

            <h3 className="text-2xl font-bold text-cyan-800 mt-8">
              دعاء النجاح والتوفيق للأبناء
            </h3>
            <p>
              في <strong>الامتحانات والاختبارات</strong>، ادعُ لأولادك: "اللَّهُمَّ بَارِكْ لِي فِي أَوْلَادِي 
              وَوَفِّقْهُمْ لِطَاعَتِكَ". هذا <strong>دعاء التوفيق للأبناء</strong> في الدراسة والعمل.
            </p>

            <h3 className="text-2xl font-bold text-cyan-800 mt-8">
              فوائد الدعاء للأبناء
            </h3>
            <ul className="list-disc pr-6 space-y-2">
              <li><strong>صلاح الأبناء</strong> وهدايتهم للطريق المستقيم</li>
              <li><strong>حفظ الأولاد</strong> من كل شر ومكروه</li>
              <li><strong>توفيق الأبناء</strong> في الدراسة والحياة</li>
              <li><strong>شفاء الأبناء</strong> المرضى بإذن الله</li>
              <li><strong>البركة في الأولاد</strong> والذرية</li>
              <li><strong>نجاح الأبناء</strong> في الامتحانات والدراسة</li>
            </ul>
          </div>
        </article>

        <section className="space-y-6">
          <h2 className="text-4xl font-bold text-center text-cyan-900 mb-12">
            مجموعة أدعية الأبناء
          </h2>
          
          {alabnaaDuas.map((dua) => (
            <div
              key={dua.id}
              className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border-2 border-cyan-100"
            >
              <div className="text-center mb-6">
                <p className="text-3xl text-cyan-900 font-arabic leading-loose mb-4">
                  {dua.arabic}
                </p>
                <p className="text-lg text-cyan-700 italic mb-3">
                  {dua.transliteration}
                </p>
                <p className="text-xl text-cyan-800 font-semibold">
                  {dua.translation}
                </p>
              </div>
              
              <div className="border-t-2 border-cyan-100 pt-6 mt-6">
                <p className="text-cyan-600 font-semibold mb-3 flex items-center gap-2">
                  <span className="text-2xl">📖</span>
                  <span>{dua.source}</span>
                </p>
                
                <div className="bg-cyan-50 rounded-xl p-4">
                  <p className="text-cyan-700 font-semibold mb-2 flex items-center gap-2">
                    <span className="text-xl">✨</span>
                    <span>فوائد الدعاء:</span>
                  </p>
                  <ul className="space-y-2 pr-4">
                    {dua.benefits.map((benefit, index) => (
                      <li key={index} className="text-cyan-600 flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="inline-block bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold">
                  {dua.category}
                </span>
              </div>
            </div>
          ))}
        </section>

        <section className="bg-white/80 backdrop-blur rounded-3xl shadow-xl p-8 mt-12">
          <h2 className="text-3xl font-bold text-cyan-800 mb-8 text-center">
            أسئلة شائعة عن أدعية الأبناء
          </h2>
          
          <div className="space-y-6">
            <div className="border-r-4 border-cyan-400 pr-4">
              <h3 className="text-xl font-bold text-cyan-800 mb-2">
                ما هو أفضل دعاء لحفظ الأبناء؟
              </h3>
              <p className="text-cyan-700">
                "اللَّهُمَّ احْفَظْ لِي أَوْلَادِي وَأَصْلِحْ لِي فِي ذُرِّيَّتِي" - 
                دعاء شامل لحفظ الأبناء وصلاحهم.
              </p>
            </div>

            <div className="border-r-4 border-cyan-400 pr-4">
              <h3 className="text-xl font-bold text-cyan-800 mb-2">
                كيف أدعو لأبنائي في الامتحانات؟
              </h3>
              <p className="text-cyan-700">
                "اللَّهُمَّ بَارِكْ لِي فِي أَوْلَادِي وَوَفِّقْهُمْ لِطَاعَتِكَ" - 
                دعاء التوفيق في الدراسة والامتحانات.
              </p>
            </div>
          </div>
        </section>

        <div className="text-center mt-12 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-3xl shadow-2xl p-8 text-white">
          <h3 className="text-3xl font-bold mb-4">
            شارك أدعية الأبناء
          </h3>
          <p className="text-xl mb-6">
            ساعد الآباء والأمهات في الدعاء لأولادهم
          </p>
          <button className="bg-white text-cyan-600 px-8 py-3 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300">
            شارك الآن
          </button>
        </div>
      </div>
    </div>
  );
}
