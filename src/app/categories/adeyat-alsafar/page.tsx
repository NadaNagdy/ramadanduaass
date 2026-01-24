// src/app/categories/adeyat-alsafar/page.tsx

import type { Metadata } from "next";
import { alsafarDuas, alsafarCategories } from "@/lib/duas-data/alsafar-duas";

export const metadata: Metadata = {
  title: "أدعية السفر | دعاء السفر الكامل والاستيداع - أدعية رمضان",
  description: "أدعية السفر مكتوبة من السنة النبوية - دعاء السفر الكامل، دعاء ركوب السيارة والطائرة، دعاء الاستيداع، دعاء المسافر، دعاء الرجوع من السفر، أدعية حفظ المسافر من القرآن والسنة",
  keywords: [
    "أدعية السفر",
    "دعاء السفر",
    "دعاء السفر الكامل",
    "دعاء السفر مكتوب",
    "دعاء ركوب السيارة",
    "دعاء ركوب الطائرة والسفر",
    "دعاء الاستيداع",
    "دعاء استوداع المسافر",
    "دعاء المسافر",
    "دعاء حفظ المسافر",
    "دعاء الرجوع من السفر",
    "دعاء السفر قصير",
    "دعاء السفر للعمل",
    "دعاء السفر للعمرة",
    "دعاء لزوجي المسافر",
    "دعاء الوداع للمسافر",
    "دعاء المسافر لنفسه",
    "دعاء تيسير السفر",
    "دعاء السفر والعودة",
    "دعاء وصول السفر"
  ],
  openGraph: {
    title: "أدعية السفر - دعاء السفر الكامل والاستيداع",
    description: "أدعية السفر الصحيحة من السنة النبوية لحفظ المسافر وتيسير السفر",
    type: "article",
    locale: "ar_EG",
    url: "https://yoursite.com/categories/adeyat-alsafar",
    siteName: "أدعية رمضان",
  },
  alternates: {
    canonical: "https://yoursite.com/categories/adeyat-alsafar",
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

export default function AlsafarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "أدعية السفر",
            "description": "أدعية السفر من السنة النبوية لحفظ المسافر",
            "url": "https://yoursite.com/categories/adeyat-alsafar",
            "inLanguage": "ar"
          })
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <div className="inline-block mb-6 p-4 bg-white/80 backdrop-blur rounded-full shadow-lg">
            <span className="text-6xl">✈️</span>
          </div>
          <h1 className="text-5xl font-bold text-amber-900 mb-6">
            أدعية السفر
          </h1>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed">
            أدعية السفر الكامل والاستيداع - دعاء المسافر من السنة النبوية
          </p>
        </header>

        <article className="bg-white/80 backdrop-blur rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-amber-800 mb-6">
            دعاء السفر الكامل من السنة النبوية
          </h2>
          
          <div className="prose prose-lg max-w-none text-amber-900 space-y-6">
            <p>
              <strong>أدعية السفر</strong> من السنن المؤكدة التي حافظ عليها النبي صلى الله عليه وسلم. 
              نقدم لكم <strong>دعاء السفر الكامل مكتوب</strong> و<strong>دعاء الاستيداع</strong> 
              و<strong>أدعية حفظ المسافر</strong> من القرآن والسنة النبوية.
            </p>

            <h3 className="text-2xl font-bold text-amber-800 mt-8">
              دعاء السفر عند ركوب السيارة أو الطائرة
            </h3>
            <p>
              عند <strong>ركوب السيارة</strong> أو <strong>ركوب الطائرة</strong>، يُسن قول دعاء السفر من القرآن. 
              هذا <strong>دعاء السفر الصحيح</strong> من القرآن الكريم.
            </p>

            <h3 className="text-2xl font-bold text-amber-800 mt-8">
              دعاء تيسير السفر وتسهيل الطريق
            </h3>
            <p>
              لتيسير السفر وتسهيل الطريق، ادع بأدعية تيسير السفر الواردة في السنة النبوية.
            </p>

            <h3 className="text-2xl font-bold text-amber-800 mt-8">
              فوائد المحافظة على أدعية السفر
            </h3>
            <ul className="list-disc pr-6 space-y-2">
              <li><strong>حفظ المسافر</strong> من كل مكروه وأذى</li>
              <li><strong>تيسير السفر</strong> وتسهيل الطريق</li>
              <li><strong>الأمان في السفر</strong> برا وبحرا وجوا</li>
              <li><strong>حفظ الأهل</strong> والأولاد أثناء السفر</li>
              <li><strong>العودة بالسلامة</strong> إلى الأهل</li>
              <li><strong>البركة في السفر</strong> والرزق</li>
            </ul>
          </div>
        </article>

        <section className="space-y-6">
          <h2 className="text-4xl font-bold text-center text-amber-900 mb-12">
            مجموعة أدعية السفر
          </h2>
          
          {alsafarDuas.map((dua) => (
            <div
              key={dua.id}
              className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border-2 border-amber-100"
            >
              <div className="text-center mb-6">
                <p className="text-3xl text-amber-900 font-arabic leading-loose mb-4">
                  {dua.arabic}
                </p>
                <p className="text-lg text-amber-700 italic mb-3">
                  {dua.transliteration}
                </p>
                <p className="text-xl text-amber-800 font-semibold">
                  {dua.translation}
                </p>
              </div>
              
              <div className="border-t-2 border-amber-100 pt-6 mt-6">
                <p className="text-amber-600 font-semibold mb-3 flex items-center gap-2">
                  <span className="text-2xl">📖</span>
                  <span>{dua.source}</span>
                </p>
                
                <div className="bg-amber-50 rounded-xl p-4">
                  <p className="text-amber-700 font-semibold mb-2 flex items-center gap-2">
                    <span className="text-xl">✨</span>
                    <span>فوائد الدعاء:</span>
                  </p>
                  <ul className="space-y-2 pr-4">
                    {dua.benefits.map((benefit, index) => (
                      <li key={index} className="text-amber-600 flex items-start gap-2">
                        <span className="text-amber-400 mt-1">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="inline-block bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold">
                  {dua.category}
                </span>
              </div>
            </div>
          ))}
        </section>

        <section className="bg-white/80 backdrop-blur rounded-3xl shadow-xl p-8 mt-12">
          <h2 className="text-3xl font-bold text-amber-800 mb-8 text-center">
            أسئلة شائعة عن أدعية السفر
          </h2>
          
          <div className="space-y-6">
            <div className="border-r-4 border-amber-400 pr-4">
              <h3 className="text-xl font-bold text-amber-800 mb-2">
                ما هو دعاء السفر الكامل؟
              </h3>
              <p className="text-amber-700">
                دعاء السفر الكامل يبدأ بالبسملة ثم يقال عند ركوب السيارة أو الطائرة.
              </p>
            </div>

            <div className="border-r-4 border-amber-400 pr-4">
              <h3 className="text-xl font-bold text-amber-800 mb-2">
                متى يقال دعاء السفر؟
              </h3>
              <p className="text-amber-700">
                يقال عند ركوب السيارة أو الطائرة أو أي وسيلة نقل في بداية السفر.
              </p>
            </div>

            <div className="border-r-4 border-amber-400 pr-4">
              <h3 className="text-xl font-bold text-amber-800 mb-2">
                ما هو دعاء الاستيداع؟
              </h3>
              <p className="text-amber-700">
                دعاء الاستيداع يقال عند توديع المسافر لحفظه في سفره.
              </p>
            </div>
          </div>
        </section>

        <div className="text-center mt-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl shadow-2xl p-8 text-white">
          <h3 className="text-3xl font-bold mb-4">
            شارك أدعية السفر
          </h3>
          <p className="text-xl mb-6">
            ساعد المسافرين في حفظ أدعية السفر
          </p>
          <button className="bg-white text-amber-600 px-8 py-3 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300">
            شارك الآن
          </button>
        </div>
      </div>
    </div>
  );
}
