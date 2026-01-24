'use server';

import { chatCompletion, extractJSON } from '@/ai/server-utils';

// نوع الإخراج النهائي
export type RephraseDuaOutput = {
  duaText: string;           // الدعاء المحسن
  simplifiedMeaning: string; // المعنى المبسط
  spiritualTouch: string;    // اللمسة الروحانية والفوائد
};

export async function rephraseDua({ intention }: { intention: string }): Promise<RephraseDuaOutput> {
  const systemPrompt = `
أنت خبير في صياغة الأدعية الإسلامية. مهمتك إعادة صياغة الأدعية بطريقة:
1. بلاغية وجميلة.
2. سهلة الفهم ومفهومة للعموم.
3. تحمل لمسة روحانية وفوائد.
`;

  const userPrompt = `
أعد صياغة هذا الدعاء بشكل أفضل وأكثر بلاغة:
"${intention}"

قدم النتيجة في شكل JSON بهذا الشكل بالضبط:
{
  "duaText": "النص المحسن للدعاء",
  "simplifiedMeaning": "المعنى المبسط للدعاء",
  "spiritualTouch": "اللمسة الروحانية والفوائد"
}
`;

  try {
    const response = await chatCompletion(systemPrompt, userPrompt, { temperature: 0.7 });
    const parsed = extractJSON(response);

    return {
      duaText: parsed?.duaText?.trim() || intention,
      simplifiedMeaning: parsed?.simplifiedMeaning?.trim() || "هذا الدعاء محسّن بفضل الذكاء الاصطناعي",
      spiritualTouch: parsed?.spiritualTouch?.trim() || "جزاك الله خيرًا وبارك فيك",
    };
  } catch (error) {
    console.error("Error in rephraseDua:", error);
    return {
      duaText: intention,
      simplifiedMeaning: "هذا الدعاء محسّن بفضل الذكاء الاصطناعي",
      spiritualTouch: "جزاك الله خيرًا وبارك فيك",
    };
  }
}
