// src/lib/duas-data/alsafar-duas.ts

export interface Dua {
  id: number;
  arabic: string;
  transliteration: string;
  translation: string;
  source: string;
  benefits: string[];
  category: string;
}

export const alsafarDuas: Dua[] = [
  {
    id: 1,
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ",
    transliteration: "Subhana al-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila rabbina la-munqalibun",
    translation: "سبحان الذي سخر لنا هذا وما كنا له مقرنين وإنا إلى ربنا لمنقلبون",
    source: "القرآن الكريم - سورة الزخرف (13-14)",
    benefits: [
      "دعاء السفر الكامل عند ركوب السيارة",
      "دعاء ركوب الطائرة والسفر بالطيران",
      "أدعية السفر مكتوبة من السنة النبوية"
    ],
    category: "أدعية بداية السفر"
  },
  {
    id: 2,
    arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَٰذَا البِرَّ وَالتَّقْوَىٰ، وَمِنَ العَمَلِ مَا تَرْضَىٰ، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَٰذَا وَاطْوِ عَنَّا بُعْدَهُ",
    transliteration: "Allahumma inna nas'aluka fi safarina hadha al-birra wa at-taqwa, wa mina al-'amali ma tarda, Allahumma hawwin 'alayna safarina hadha wa-twi 'anna bu'dah",
    translation: "اللهم إنا نسألك في سفرنا هذا البر والتقوى ومن العمل ما ترضى، اللهم هون علينا سفرنا هذا واطو عنا بعده",
    source: "صحيح مسلم",
    benefits: [
      "دعاء تسهيل السفر وتيسير الطريق",
      "دعاء السفر الطويل والسفر للخارج",
      "أدعية السفر للعمل أو الدراسة"
    ],
    category: "أدعية تيسير السفر"
  },
  {
    id: 3,
    arabic: "اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالخَلِيفَةُ فِي الأَهْلِ، اللَّهُمَّ اصْحَبْنَا بِنُصْحِكَ، وَاقْلِبْنَا بِذِمَّةٍ",
    transliteration: "Allahumma anta as-sahibu fi as-safar, wa al-khalifatu fi al-ahl, Allahumma-shabna bi-nushik, wa-qlibnا bi-dhimmah",
    translation: "اللهم أنت الصاحب في السفر والخليفة في الأهل، اللهم اصحبنا بنصحك واقلبنا بذمة",
    source: "سنن الترمذي",
    benefits: [
      "دعاء حفظ المسافر في السفر",
      "دعاء حماية الأهل والأولاد أثناء السفر",
      "دعاء استودع الزوج أو الابن المسافر"
    ],
    category: "أدعية حفظ المسافر"
  },
  {
    id: 4,
    arabic: "آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ",
    transliteration: "Ayibuna ta'ibuna 'abiduna li-rabbina hamidun",
    translation: "آيبون تائبون عابدون لربنا حامدون",
    source: "صحيح البخاري ومسلم",
    benefits: [
      "دعاء الرجوع من السفر والعودة بالسلامة",
      "دعاء وصول السفر والرجوع للبيت",
      "أدعية عند الوصول من السفر"
    ],
    category: "أدعية العودة من السفر"
  },
  {
    id: 5,
    arabic: "اللَّهُمَّ إِنِّي أَسْتَوْدِعُكَ (اسم المسافر) وَدِينَهُ وَأَمَانَتَهُ وَخَوَاتِيمَ عَمَلِهِ",
    transliteration: "Allahumma inni astawdi'uka (name) wa dinahu wa amanatahu wa khawatima 'amalih",
    translation: "اللهم إني أستودعك (اسم المسافر) ودينه وأمانته وخواتيم عمله",
    source: "سنن الترمذي",
    benefits: [
      "دعاء استوداع المسافر للأهل",
      "دعاء لزوجي المسافر أو ابني المسافر",
      "دعاء حفظ الحبيب الغائب في السفر"
    ],
    category: "دعاء الاستيداع"
  },
  {
    id: 6,
    arabic: "أَسْتَوْدِعُكُمُ اللَّهَ الَّذِي لَا تَضِيعُ وَدَائِعُهُ",
    transliteration: "Astawdi'ukum Allaha al-ladhi la tadi'u wada'i'uh",
    translation: "أستودعكم الله الذي لا تضيع ودائعه",
    source: "سنن ابن ماجه",
    benefits: [
      "دعاء توديع المسافر قصير",
      "دعاء الوداع للمسافرين",
      "دعاء حفظ المسافر للغالين"
    ],
    category: "أدعية وداع المسافر"
  },
  {
    id: 7,
    arabic: "اللَّهُمَّ بَلِّغْنَا مَقْصَدَنَا عَلَى خَيْرٍ وَعَافِيَةٍ وَسَلَامَةٍ فِي الدِّينِ وَالدُّنْيَا",
    transliteration: "Allahumma ballighna maqsadana 'ala khayrin wa 'afiyah wa salamah fi ad-dini wa ad-dunya",
    translation: "اللهم بلغنا مقصدنا على خير وعافية وسلامة في الدين والدنيا",
    source: "دعاء مأثور",
    benefits: [
      "دعاء السفر للعمرة والحج",
      "دعاء الوصول بالسلامة للمكان",
      "أدعية النية في السفر للطاعة"
    ],
    category: "أدعية السفر للعبادة"
  },
  {
    id: 8,
    arabic: "اللَّهُمَّ احْفَظْنِي فِي سَفَرِي وَارْزُقْنِي حُسْنَ العَوْدَةِ إِلَى أَهْلِي سَالِمًا غَانِمًا",
    transliteration: "Allahumma-hfazni fi safari wa-rzuqni husna al-'awdati ila ahli saliman ghaniman",
    translation: "اللهم احفظني في سفري وارزقني حسن العودة إلى أهلي سالماً غانماً",
    source: "دعاء مستحب",
    benefits: [
      "دعاء السفر قصير ومختصر",
      "دعاء المسافر لنفسه",
      "أدعية الأمان في السفر والطريق"
    ],
    category: "أدعية عامة للسفر"
  }
];

export const alsafarCategories = [
  "أدعية بداية السفر",
  "أدعية تيسير السفر",
  "أدعية حفظ المسافر",
  "أدعية العودة من السفر",
  "دعاء الاستيداع",
  "أدعية وداع المسافر",
  "أدعية السفر للعبادة",
  "أدعية عامة للسفر"
];
