// src/lib/duas-data/alabnaa-duas.ts

export interface Dua {
  id: number;
  arabic: string;
  transliteration: string;
  translation: string;
  source: string;
  benefits: string[];
  category: string;
}

export const alabnaaDuas: Dua[] = [
  {
    id: 1,
    arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
    transliteration: "Rabbi-j'alni muqima as-salati wa min dhurriyyati, rabbana wa taqabbal du'a'",
    translation: "رب اجعلني مقيم الصلاة ومن ذريتي ربنا وتقبل دعاء",
    source: "القرآن الكريم - سورة إبراهيم (40)",
    benefits: [
      "دعاء للأبناء بالصلاح والهداية",
      "أدعية للأولاد بالتوفيق والنجاح",
      "دعاء صلاح الأبناء وهدايتهم"
    ],
    category: "أدعية صلاح الأبناء"
  },
  {
    id: 2,
    arabic: "اللَّهُمَّ احْفَظْ لِي أَوْلَادِي وَأَصْلِحْ لِي فِي ذُرِّيَّتِي",
    transliteration: "Allahumma-hfaz li awladi wa aslih li fi dhurriyyati",
    translation: "اللهم احفظ لي أولادي وأصلح لي في ذريتي",
    source: "دعاء مأثور",
    benefits: [
      "دعاء حفظ الأبناء والأطفال من كل شر",
      "دعاء لحفظ الأولاد من كل مكروه",
      "أدعية حماية الأطفال وتحصينهم"
    ],
    category: "أدعية حفظ الأبناء"
  },
  {
    id: 3,
    arabic: "اللَّهُمَّ بَارِكْ لِي فِي أَوْلَادِي وَوَفِّقْهُمْ لِطَاعَتِكَ",
    transliteration: "Allahumma barik li fi awladi wa waffiqhum li ta'atik",
    translation: "اللهم بارك لي في أولادي ووفقهم لطاعتك",
    source: "من أدعية السنة النبوية",
    benefits: [
      "دعاء للأبناء بالتوفيق في الدراسة",
      "دعاء الأبناء في الامتحانات والاختبارات",
      "دعاء النجاح والتفوق للأولاد"
    ],
    category: "أدعية التوفيق للأبناء"
  },
  {
    id: 4,
    arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
    transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yun",
    translation: "ربنا هب لنا من أزواجنا وذرياتنا قرة أعين",
    source: "القرآن الكريم - سورة الفرقان (74)",
    benefits: [
      "دعاء للأولاد والبنات بالسعادة",
      "دعاء الذرية الصالحة",
      "أدعية للأبناء شامل وجامع"
    ],
    category: "أدعية عامة للأبناء"
  },
  {
    id: 5,
    arabic: "اللَّهُمَّ اجْعَلْ أَوْلَادِي مِنَ الصَّالِحِينَ وَمِنَ الدُّعَاةِ إِلَى الخَيْرِ",
    transliteration: "Allahumma-j'al awladi mina as-salihin wa mina ad-du'ati ila al-khayr",
    translation: "اللهم اجعل أولادي من الصالحين ومن الدعاة إلى الخير",
    source: "دعاء مستحب",
    benefits: [
      "دعاء هداية الأبناء للطريق الصحيح",
      "دعاء للأولاد بالصلاح والتقوى",
      "أدعية تربية الأطفال على الخير"
    ],
    category: "أدعية هداية الأبناء"
  },
  {
    id: 6,
    arabic: "اللَّهُمَّ اشْفِ أَبْنَائِي وَعَافِهِمْ وَارْزُقْهُمُ الصِّحَّةَ وَالعَافِيَةَ",
    transliteration: "Allahumma-shfi abna'i wa 'afihim wa-rzuqhum as-sihhata wa al-'afiyah",
    translation: "اللهم اشف أبنائي وعافهم وارزقهم الصحة والعافية",
    source: "دعاء مأثور",
    benefits: [
      "دعاء شفاء الأبناء والأطفال المرضى",
      "دعاء للطفل المريض بالشفاء العاجل",
      "أدعية صحة الأولاد والعافية"
    ],
    category: "أدعية شفاء الأبناء"
  },
  {
    id: 7,
    arabic: "اللَّهُمَّ ارْزُقْ أَوْلَادِي حُسْنَ الخُلُقِ وَجَمِيلَ الصِّفَاتِ",
    transliteration: "Allahumma-rzuq awladi husna al-khuluq wa jamila as-sifat",
    translation: "اللهم ارزق أولادي حسن الخلق وجميل الصفات",
    source: "دعاء مستحب",
    benefits: [
      "دعاء تحسين أخلاق الأبناء",
      "دعاء الأولاد بالأدب وحسن السلوك",
      "أدعية تربية الأطفال على القيم"
    ],
    category: "أدعية أخلاق الأبناء"
  },
  {
    id: 8,
    arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي",
    transliteration: "Rabbi awzi'ni an ashkura ni'mataka allati an'amta 'alayya wa 'ala walidayya wa an a'mala salihan tardahu wa aslih li fi dhurriyyati",
    translation: "رب أوزعني أن أشكر نعمتك التي أنعمت علي وعلى والدي وأن أعمل صالحا ترضاه وأصلح لي في ذريتي",
    source: "القرآن الكريم - سورة الأحقاف (15)",
    benefits: [
      "دعاء شامل للأبناء والوالدين",
      "دعاء البركة في الأولاد",
      "أدعية جامعة للذرية الصالحة"
    ],
    category: "أدعية شاملة للأبناء"
  }
];

export const alabnaaCategories = [
  "أدعية صلاح الأبناء",
  "أدعية حفظ الأبناء",
  "أدعية التوفيق للأبناء",
  "أدعية عامة للأبناء",
  "أدعية هداية الأبناء",
  "أدعية شفاء الأبناء",
  "أدعية أخلاق الأبناء",
  "أدعية شاملة للأبناء"
];
