// src/lib/duas-data/alzawaj-duas.ts

export interface Dua {
  id: number;
  arabic: string;
  transliteration: string;
  translation: string;
  source: string;
  benefits: string[];
  category: string;
}

export const alzawajDuas: Dua[] = [
  {
    id: 1,
    arabic: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",
    transliteration: "Rabbi inni lima anzalta ilayya min khayrin faqir",
    translation: "يا رب إني لما أنزلت إليّ من خير فقير",
    source: "القرآن الكريم - سورة القصص (24)",
    benefits: [
      "دعاء لتيسير الزواج وفتح النصيب",
      "دعاء الزواج من شخص معين",
      "دعاء للزواج السريع والزواج العاجل"
    ],
    category: "أدعية الزواج"
  },
  {
    id: 2,
    arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin wa-j'alna li-l-muttaqina imama",
    translation: "ربنا هب لنا من أزواجنا وذرياتنا قرة أعين واجعلنا للمتقين إماما",
    source: "القرآن الكريم - سورة الفرقان (74)",
    benefits: [
      "دعاء الزوج الصالح والزوجة الصالحة",
      "أدعية للزواج والرزق بزوج صالح",
      "دعاء المحبة والمودة بين الزوجين"
    ],
    category: "أدعية الزواج والسعادة الزوجية"
  },
  {
    id: 3,
    arabic: "اللَّهُمَّ بَارِكْ لَهُمَا وَبَارِكْ عَلَيْهِمَا وَاجْمَعْ بَيْنَهُمَا فِي خَيْرٍ",
    transliteration: "Allahumma barik lahuma wa barik 'alayhima wa-jma' baynahuma fi khayr",
    translation: "اللهم بارك لهما وبارك عليهما واجمع بينهما في خير",
    source: "سنن أبي داود والترمذي",
    benefits: [
      "دعاء عقد الزواج والزفاف",
      "دعاء للمتزوجين حديثاً والأزواج الجدد",
      "دعاء الجمع بين الزوجين في خير"
    ],
    category: "أدعية عقد القران"
  },
  {
    id: 4,
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا جَبَلْتَهَا عَلَيْهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا جَبَلْتَهَا عَلَيْهِ",
    transliteration: "Allahumma inni as'aluka khayraha wa khayra ma jabaltaha 'alayh, wa a'udhu bika min sharriha wa sharri ma jabaltaha 'alayh",
    translation: "اللهم إني أسألك خيرها وخير ما جبلتها عليه، وأعوذ بك من شرها وشر ما جبلتها عليه",
    source: "سنن أبي داود",
    benefits: [
      "دعاء ليلة الزفاف وليلة الدخلة",
      "دعاء الزواج الجديد",
      "دعاء طلب البركة في الزواج"
    ],
    category: "أدعية ليلة الزفاف"
  },
  {
    id: 5,
    arabic: "اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا، وَأَصْلِحْ ذَاتَ بَيْنِنَا",
    transliteration: "Allahumma allif bayna qulubina, wa aslih dhata baynina",
    translation: "اللهم ألف بين قلوبنا وأصلح ذات بيننا",
    source: "من أدعية السنة النبوية",
    benefits: [
      "دعاء الإصلاح بين الزوجين",
      "دعاء حل المشاكل الزوجية",
      "دعاء المودة والرحمة بين الزوجين"
    ],
    category: "أدعية الحياة الزوجية"
  },
  {
    id: 6,
    arabic: "اللَّهُمَّ ارْزُقْنِي الزَّوْجَ الصَّالِحَ وَيَسِّرْ لِي أَمْرَ زَوَاجِي",
    transliteration: "Allahumma-rzuqni az-zawja as-salih wa yassir li amra zawaji",
    translation: "اللهم ارزقني الزوج الصالح ويسر لي أمر زواجي",
    source: "دعاء مأثور",
    benefits: [
      "دعاء تعجيل الزواج وتيسير الزواج",
      "دعاء البنات للزواج وفتح النصيب",
      "دعاء الزواج العاجل والزواج بسرعة"
    ],
    category: "أدعية العزباء للزواج"
  },
  {
    id: 7,
    arabic: "اللَّهُمَّ اجْعَلْ بَيْنِي وَبَيْنَ (فلان/فلانة) مَوَدَّةً وَرَحْمَةً وَأَلْفَةً",
    transliteration: "Allahumma-j'al bayni wa bayna (fulan/fulanah) mawaddatan wa rahmatan wa ulfah",
    translation: "اللهم اجعل بيني وبين (فلان/فلانة) مودة ورحمة وألفة",
    source: "دعاء مستحب",
    benefits: [
      "دعاء الزواج من شخص معين مجرب",
      "دعاء لتيسير الزواج من خطيبي",
      "دعاء الخطوبة وتيسير أمور الزواج"
    ],
    category: "أدعية الزواج من شخص معين"
  },
  {
    id: 8,
    arabic: "رَبِّ هَبْ لِي مِنْ لَدُنْكَ ذُرِّيَّةً طَيِّبَةً إِنَّكَ سَمِيعُ الدُّعَاءِ",
    transliteration: "Rabbi hab li min ladunka dhurriyyatan tayyibah, innaka sami'u ad-du'a'",
    translation: "رب هب لي من لدنك ذرية طيبة إنك سميع الدعاء",
    source: "القرآن الكريم - سورة آل عمران (38)",
    benefits: [
      "دعاء الذرية الصالحة بعد الزواج",
      "دعاء الحمل والإنجاب",
      "دعاء البركة في الزواج والأولاد"
    ],
    category: "أدعية بعد الزواج"
  }
];

export const alzawajCategories = [
  "أدعية الزواج",
  "أدعية الزواج والسعادة الزوجية",
  "أدعية عقد القران",
  "أدعية ليلة الزفاف",
  "أدعية الحياة الزوجية",
  "أدعية العزباء للزواج",
  "أدعية الزواج من شخص معين",
  "أدعية بعد الزواج"
];
