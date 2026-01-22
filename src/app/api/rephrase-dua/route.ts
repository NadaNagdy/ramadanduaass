import { NextRequest, NextResponse } from 'next/server';
import { chatCompletion, extractJSON } from '@/ai/server-utils';

export async function POST(request: NextRequest) {
  try {
    const { intention } = await request.json();
    
    // التحقق من صحة المدخلات
    if (!intention?.trim()) {
      return NextResponse.json(
        { error: 'النية مطلوبة / Intention is required' },
        { status: 400 }
      );
    }

    // التحقق من طول النص المعقول
    if (intention.length > 500) {
      return NextResponse.json(
        { error: 'النص طويل جداً / Text too long (max 500 characters)' },
        { status: 400 }
      );
    }

    const systemPrompt = `أنت خبير متخصص في صياغة الأدعية الإسلامية المأثورة.
مهمتك إعادة صياغة الأدعية بأسلوب بليغ وروحاني يتماشى مع الأدعية الواردة في القرآن والسنة.

**قواعد صارمة:**
1. يجب تشكيل كل كلمة بالكامل (الفتحة، الضمة، الكسرة، السكون، الشدة، التنوين)
2. استخدم اللغة العربية الفصحى البليغة
3. اجعل الدعاء قصيراً ومؤثراً (لا يتجاوز 3-4 أسطر)
4. استلهم من أسلوب الأدعية النبوية المأثورة
5. أرجع JSON فقط بدون أي نص إضافي`;

    const userPrompt = `أعد صياغة النية التالية كدعاء بليغ ومشكول بالكامل:

"${intention}"

**مطلوب JSON بهذا الشكل الدقيق:**
{
  "duaText": "الدُّعَاءُ المُشَكَّلُ بِالكَامِلِ مَعَ جَمِيعِ الحَرَكَاتِ",
  "simplifiedMeaning": "شرح مبسط وواضح لمعنى الدعاء",
  "spiritualTouch": "فائدة روحانية أو حكمة من هذا الدعاء"
}`;

    const response = await chatCompletion(systemPrompt, userPrompt, {
      temperature: 0.7,
      max_tokens: 1000,
    });

    // محاولة استخراج JSON
    const parsed = extractJSON(response);
    
    // التحقق من صحة البيانات المُرجعة
    if (parsed && typeof parsed === 'object' && parsed.duaText) {
      // التحقق من وجود التشكيل
      const hasTashkeel = /[\u064B-\u065F]/.test(parsed.duaText);
      
      if (!hasTashkeel) {
        console.warn('تحذير: الدعاء المُرجع لا يحتوي على تشكيل كافٍ');
      }

      return NextResponse.json({
        duaText: parsed.duaText.trim(),
        simplifiedMeaning: parsed.simplifiedMeaning?.trim() || "دعاء محسّن ومصاغ بأسلوب بليغ",
        spiritualTouch: parsed.spiritualTouch?.trim() || "الدعاء عبادة عظيمة، والله يحب من عباده أن يسألوه",
      });
    }

    // إذا فشل استخراج JSON، نحاول استخدام النص كما هو
    console.warn('فشل استخراج JSON، استخدام النص المباشر');
    
    return NextResponse.json({
      duaText: response.trim(),
      simplifiedMeaning: "دعاء محسّن بفضل الذكاء الاصطناعي",
      spiritualTouch: "اللَّهُمَّ تَقَبَّل دُعَاءَنَا وَاسْتَجِبْ لَنَا",
    });

  } catch (error) {
    console.error('خطأ في API إعادة صياغة الدعاء:', error);
    
    // معالجة أنواع مختلفة من الأخطاء
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'خطأ في تنسيق البيانات / Invalid JSON format' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'فشل في إنشاء الدعاء / Failed to generate dua',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}
