// src/app/categories/adeyat-alzawaj/page.tsx

import type { Metadata } from "next";
import { alzawajDuas, alzawajCategories } from "@/lib/duas-data/alzawaj-duas";

export const metadata: Metadata = {
  title: "أدعية الزواج | دعاء الزواج من شخص معين وتيسير الزواج - أدعية رمضان",
  description: "أدعية الزواج مكتوبة من القرآن والسنة - دعاء الزواج من شخص معين، دعاء تيسير الزواج، دعاء الزوج الصالح، أدعية للزواج السريع والعاجل، دعاء العزباء للزواج، دعاء عقد القران وليلة الزفاف",
  keywords: [
    "أدعية الزواج",
    "دعاء الزواج",
    "دعاء الزواج من شخص معين",
    "أدعية للزواج",
    "دعاء تيسير الزواج",
    "دعاء الزوج الصالح",
    "أدعية للزواج وفتح النصيب",
    "دعاء تعجيل الزواج",
    "دعاء الزواج السريع",
    "دعاء الزواج العاجل",
    "دعاء تيسير الزواج من شخص معين",
    "دعاء للزواج من حبيبي",
    "دعاء الزواج للبنات",
    "دعاء العزباء للزواج",
    "دعاء عقد القران",
    "دعاء ليلة الزفاف",
    "دعاء الزفاف",
    "دعاء الخطوبة",
    "دعاء المحبة بين الزوجين",
    "دعاء الإصلاح بين الزوجين"
  ],
  openGraph: {
    title: "أدعية الزواج - دعاء الزواج من شخص معين وتيسير الزواج",
    description: "أدعية الزواج الصحيحة من القرآن والسنة لتيسير الزواج والرزق بالزوج الصالح",
    type: "article",
    locale: "ar_EG",
    url: "https://yoursite.com/categories/adeyat-alzawaj",
    siteName: "أدعية رمضان",
  },
  alternates: {
    canonical: "https://yoursite.com/categories/adeyat-alzawaj",
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

export default function AlzawajPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "أدعية الزواج",
            "description": "أدعية الزواج من القرآن والسنة لتيسير الزواج والرزق بالزوج الصالح",
            "url": "https://yoursite.com/categories/adeyat-alzawaj",
            "inLanguage": "ar",
            "about": {
              "@type": "Thing",
              "name": "أدعية الزواج"
            }
          })
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header Section */}
        <header className="text-center mb-16">
          <div className="inline-block mb-6 p-4 bg-white/80 backdrop-blur rounded-full shadow-lg">
            <span className="text-6xl">💍</span>
          </div>
          <h1 className="text-5xl font-bold text-rose-900 mb-6">
            أدعية الزواج
          </h1>
          <p className="text-xl text-rose-700 max-w-3xl mx-auto leading-relaxed">
            دعاء جلب الرزق والبركة - أدعية لتوسيع الرزق من القرآن والسنة النبوية
          </p>
        </header>

        {/* SEO Content Section */}
        <article className="bg-white/80 backdrop-blur rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-rose-800 mb-6">
            أفضل أدعية الزواج من القرآن والسنة
          </h2>
          
          <div className="prose prose-lg max-w-none text-rose-900 space-y-6">
            <p>
              <strong>أدعية الزواج</strong> من أعظم الأدعية التي يحتاجها كل مسلم ومسلمة في حياتهم. 
              نقدم لكم مجموعة من <strong>أدعية الزواج المستجابة</strong> من القرآن الكريم والسنة النبوية 
              الشريفة، بما في ذلك <strong>دعاء الزواج من شخص معين</strong> و<strong>دعاء تيسير الزواج</strong>.
            </p>

            <h3 className="text-2xl font-bold text-rose-800 mt-8">
              دعاء الزواج من شخص معين مجرب
            </h3>
            <p>
              إذا كنت تبحث عن <strong>دعاء للزواج من شخص معين</strong>، فإن أفضل دعاء هو طلب الخير من الله 
              تعالى مع الدعاء بالمحبة والألفة. يمكنك قول: "اللَّهُمَّ اجْعَلْ بَيْنِي وَبَيْنَ (فلان/فلانة) 
              مَوَدَّةً وَرَحْمَةً وَأَلْفَةً". هذا <strong>دعاء الزواج المستجاب</strong> الذي جربه الكثيرون.
            </p>

            <h3 className="text-2xl font-bold text-rose-800 mt-8">
              دعاء تيسير الزواج وفتح النصيب
            </h3>
            <p>
              لـ<strong>تعجيل الزواج</strong> و<strong>تيسير أمور الزواج</strong>، يُستحب الإكثار من الدعاء: 
              "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ". هذا دعاء سيدنا موسى عليه السلام 
              وهو من أعظم <strong>أدعية الزواج للبنات</strong> و<strong>دعاء العزباء للزواج</strong>.
            </p>

            <h3 className="text-2xl font-bold text-rose-800 mt-8">
              أدعية الزوج الصالح والزواج المبارك
            </h3>
            <p>
              للرزق بـ<strong>الزوج الصالح</strong> أو <strong>الزوجة الصالحة</strong>، ادعُ بقول الله تعالى: 
              "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ". هذا من أجمل 
              <strong>أدعية الزواج المباركة</strong> التي تجمع بين طلب الزوج الصالح والذرية الطيبة.
            </p>

            <h3 className="text-2xl font-bold text-rose-800 mt-8">
              دعاء عقد القران وليلة الزفاف
            </h3>
            <p>
              عند <strong>عقد القران</strong> و<strong>ليلة الزفاف</strong>، يُسن الدعاء للمتزوجين بقول: 
              "اللَّهُمَّ بَارِكْ لَهُمَا وَبَارِكْ عَلَيْهِمَا وَاجْمَعْ بَيْنَهُمَا فِي خَيْرٍ". 
              وفي <strong>ليلة الدخلة</strong>، يُستحب قول: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا".
            </p>

            <h3 className="text-2xl font-bold text-rose-800 mt-8">
              فوائد المداومة على أدعية الزواج
            </h3>
            <ul className="list-disc pr-6 space-y-2">
              <li><strong>تيسير الزواج</strong> والرزق بالزوج الصالح بإذن الله</li>
              <li><strong>تعجيل الزواج</strong> وفتح النصيب للعزباء</li>
              <li>تحقيق <strong>الزواج من شخص معين</strong> إذا كان فيه خير</li>
              <li><strong>البركة في الزواج</strong> والحياة الزوجية السعيدة</li>
              <li><strong>المحبة والمودة</strong> بين الزوجين</li>
              <li>حل <strong>المشاكل الزوجية</strong> والإصلاح بين الزوجين</li>
            </ul>

            <h3 className="text-2xl font-bold text-rose-800 mt-8">
              أوقات استجابة دعاء الزواج
            </h3>
            <p>
              أفضل الأوقات لـ<strong>دعاء الزواج المستجاب</strong>:
            </p>
            <ul className="list-disc pr-6 space-y-2">
              <li><strong>ليلة الجمعة</strong> ويوم الجمعة - خاصة الساعة الأخيرة قبل الغروب</li>
              <li><strong>الثلث الأخير من الليل</strong> - وقت التجلي الإلهي</li>
              <li><strong>بين الأذان والإقامة</strong> - الدعاء لا يرد</li>
              <li><strong>أثناء السجود</strong> - أقرب ما يكون العبد من ربه</li>
              <li><strong>في رمضان</strong> - خاصة ليلة القدر</li>
            </ul>
          </div>
        </article>

        {/* Duas Display Section */}
        <section className="space-y-6">
          <h2 className="text-4xl font-bold text-center text-rose-900 mb-12">
            مجموعة أدعية الزواج
          </h2>
          
          {alzawajDuas.map((dua) => (
            <div
              key={dua.id}
              className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border-2 border-rose-100"
            >
              <div className="text-center mb-6">
                <p className="text-3xl text-rose-900 font-arabic leading-loose mb-4">
                  {dua.arabic}
                </p>
                <p className="text-lg text-rose-700 italic mb-3">
                  {dua.transliteration}
                </p>
                <p className="text-xl text-rose-800 font-semibold">
                  {dua.translation}
                </p>
              </div>
              
              <div className="border-t-2 border-rose-100 pt-6 mt-6">
                <p className="text-rose-600 font-semibold mb-3 flex items-center gap-2">
                  <span className="text-2xl">📖</span>
                  <span>{dua.source}</span>
                </p>
                
                <div className="bg-rose-50 rounded-xl p-4">
                  <p className="text-rose-700 font-semibold mb-2 flex items-center gap-2">
                    <span className="text-xl">✨</span>
                    <span>فوائد الدعاء:</span>
                  </p>
                  <ul className="space-y-2 pr-4">
                    {dua.benefits.map((benefit, index) => (
                      <li key={index} className="text-rose-600 flex items-start gap-2">
                        <span className="text-rose-400 mt-1">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="inline-block bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-semibold">
                  {dua.category}
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* FAQ Section for SEO */}
        <section className="bg-white/80 backdrop-blur rounded-3xl shadow-xl p-8 mt-12">
          <h2 className="text-3xl font-bold text-rose-800 mb-8 text-center">
            أسئلة شائعة عن أدعية الزواج
          </h2>
          
          <div className="space-y-6">
            <div className="border-r-4 border-rose-400 pr-4">
              <h3 className="text-xl font-bold text-rose-800 mb-2">
                ما هو أفضل دعاء للزواج من شخص معين؟
              </h3>
              <p className="text-rose-700">
                أفضل دعاء هو: "اللَّهُمَّ اجْعَلْ بَيْنِي وَبَيْنَ (الاسم) مَوَدَّةً وَرَحْمَةً" 
                مع الدعاء بالخير والاستخارة في الأمر.
              </p>
            </div>

            <div className="border-r-4 border-rose-400 pr-4">
              <h3 className="text-xl font-bold text-rose-800 mb-2">
                هل يوجد دعاء لتعجيل الزواج؟
              </h3>
              <p className="text-rose-700">
                نعم، دعاء سيدنا موسى: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ" 
                من أعظم أدعية تعجيل الزواج وفتح النصيب.
              </p>
            </div>

            <div className="border-r-4 border-rose-400 pr-4">
              <h3 className="text-xl font-bold text-rose-800 mb-2">
                متى يُقال دعاء الزواج؟
              </h3>
              <p className="text-rose-700">
                في كل وقت، وخاصة في الثلث الأخير من الليل، يوم الجمعة، وأثناء السجود. 
                كما يُستحب الإكثار منه في رمضان وليلة القدر.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center mt-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl shadow-2xl p-8 text-white">
          <h3 className="text-3xl font-bold mb-4">
            شارك هذه الأدعية مع من تحب
          </h3>
          <p className="text-xl mb-6">
            ساعد غيرك في الرزق بالزواج الصالح بمشاركة هذه الأدعية
          </p>
          <button className="bg-white text-rose-600 px-8 py-3 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300">
            شارك الآن
          </button>
        </div>
      </div>
    </div>
  );
}
