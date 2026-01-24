"use client";

import React, { useState, useRef } from 'react';
import { FloatingStars, DecorativeDivider, Lantern } from '@/components/islamic-decorations';
import { Send, Sparkles, RefreshCw, Share2, Download, MessageCircle, Copy, Check, Link2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import GiftCard from '@/components/gift-card';
import ListeningAnimation from '@/components/listening-animation';
import html2canvas from 'html2canvas';

type RephraseDuaOutput = {
  duaText: string;
  simplifiedMeaning: string;
  spiritualTouch: string;
};

export default function AiDuaPage() {
  const [intention, setIntention] = useState('');
  const [generatedDua, setGeneratedDua] = useState<RephraseDuaOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [isGeneratingUrl, setIsGeneratingUrl] = useState(false);
  const { toast } = useToast();
  const giftRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!intention.trim()) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "الرجاء كتابة نيتك أولاً.",
      });
      return;
    }
    
    setIsGenerating(true);
    setGeneratedDua(null);
    
    try {
      const response = await fetch('/api/rephrase-dua', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ intention }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate dua');
      }

      const result = await response.json();
      setGeneratedDua(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "لم نتمكن من إنشاء الدعاء، يرجى المحاولة مرة أخرى.",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleReset = () => {
    setGeneratedDua(null);
    setIntention('');
    setShortUrl('');
  };

  const handleShare = () => {
    setShowShareDialog(true);
    // Generate short URL when dialog opens
    if (!shortUrl) {
      generateShortUrl();
    }
  };

  // توليد رابط مختصر
  const generateShortUrl = async () => {
    if (!generatedDua || shortUrl) return;

    setIsGeneratingUrl(true);
    
    try {
      const fromName = senderName.trim() || 'صديقك';
      const longUrl = `${window.location.origin}/shared-dua?dua=${encodeURIComponent(generatedDua.duaText)}&from=${encodeURIComponent(fromName)}`;
      
      const response = await fetch('/api/shorten-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl }),
      });

      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (error) {
      console.error('Error generating short URL:', error);
    } finally {
      setIsGeneratingUrl(false);
    }
  };

  // تحويل الهدية لصورة
  const captureGiftAsImage = async (): Promise<Blob | null> => {
    if (!giftRef.current) return null;
    
    setIsCapturing(true);
    
    try {
      const canvas = await html2canvas(giftRef.current, {
        backgroundColor: '#0a1628',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Failed to create blob'));
        }, 'image/png');
      });
      
      setIsCapturing(false);
      return blob;
    } catch (error) {
      console.error('Error capturing image:', error);
      setIsCapturing(false);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "لم نتمكن من إنشاء الصورة",
      });
      return null;
    }
  };

  // تنزيل الهدية كصورة
  const downloadGiftImage = async () => {
    const blob = await captureGiftAsImage();
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `هدية-دعاء-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "تم التنزيل! 🎁",
      description: "تم حفظ الهدية كصورة بنجاح",
    });
  };

  // نسخ النص
  const copyDuaText = async () => {
    if (!generatedDua) return;

    const textToCopy = `${generatedDua.duaText}\n\n${generatedDua.simplifiedMeaning}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "تم النسخ! 📋",
        description: "تم نسخ الدعاء بنجاح",
      });
    } catch (error) {
      console.error('Failed to copy:', error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "لم نتمكن من نسخ النص",
      });
    }
  };

  // مشاركة على واتساب
  const shareToWhatsApp = async () => {
    if (!generatedDua) return;

    const fromName = senderName.trim() || 'صديقك';
    
    // استخدام الرابط المختصر إذا كان متاحاً
    let shareLink = shortUrl;
    if (!shareLink) {
      await generateShortUrl();
      shareLink = shortUrl || `${window.location.origin}/shared-dua?dua=${encodeURIComponent(generatedDua.duaText)}&from=${encodeURIComponent(fromName)}`;
    }
    
    const shareText = `🎁 ${fromName} أرسل لك هدية روحانية\n\n🤲 ${generatedDua.duaText}\n\n✨ شاهد الهدية كاملة:\n${shareLink}\n\n💚 تهادوا تحابوا`;
    
    // البديل: رابط واتساب بالنص
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
    
    setShowShareDialog(false);
    
    toast({
      title: "تم فتح واتساب! 📱",
      description: "يمكنك الآن إرسال الهدية",
    });
  };

  // مشاركة الصورة مباشرة
  const shareImageDirectly = async () => {
    const blob = await captureGiftAsImage();
    if (!blob) return;

    try {
      const file = new File([blob], 'هدية-دعاء.png', { type: 'image/png' });
      
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'هدية دعاء 🎁',
          text: `${generatedDua?.duaText}\n\nتهادوا تحابوا 💚`,
          files: [file],
        });
        
        setShowShareDialog(false);
      } else {
        // إذا المتصفح ما يدعم المشاركة، نحمل الصورة
        await downloadGiftImage();
      }
    } catch (error) {
      console.log('Share cancelled or failed');
    }
  };

  // نسخ رابط المشاركة
  const copyShareLink = async () => {
    if (!generatedDua) return;

    let linkToCopy = shortUrl;
    
    if (!linkToCopy) {
      await generateShortUrl();
      linkToCopy = shortUrl;
    }
    
    if (!linkToCopy) {
      const fromName = senderName.trim() || 'صديقك';
      linkToCopy = `${window.location.origin}/shared-dua?dua=${encodeURIComponent(generatedDua.duaText)}&from=${encodeURIComponent(fromName)}`;
    }
    
    try {
      await navigator.clipboard.writeText(linkToCopy);
      
      toast({
        title: "تم نسخ الرابط! 🔗",
        description: "شارك الهدية الروحانية مع من تحب",
      });
      
      setShowShareDialog(false);
    } catch (error) {
      toast({
        title: "رابط المشاركة",
        description: linkToCopy,
      });
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient pt-32 pb-20 px-4">
      <FloatingStars />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          <div className="flex flex-col items-center justify-center animate-fade-in">
            <ListeningAnimation />
            <div className="mt-6 text-center">
              <p className="text-gold font-amiri text-xl">
                {isGenerating ? (
                  <span className="animate-pulse">🎙️ أستمع لنيتك وأصيغ دعاءك...</span>
                ) : generatedDua ? (
                  <span>✨ تم صياغة دعائك بنجاح</span>
                ) : (
                  <span>🤲 في انتظار نيتك الجميلة</span>
                )}
              </p>
            </div>
          </div>

          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-gold/10 rounded-full mb-4 animate-float">
                <Sparkles className="w-10 h-10 text-gold" />
              </div>
              <h1 className="font-amiri text-4xl md:text-5xl font-bold text-gold mb-4">
                تهادوا الحب غيباً بالدعاء
              </h1>
              <p className="text-cream/70 text-lg">
                اكتب حاجتك أو لمن تحب بصدق، وسيقوم النظام بصياغة دعاء مأثور ومناسب
              </p>
            </div>

            {!generatedDua && (
              <form onSubmit={handleGenerate} className="mb-8">
                <div className="relative group h-48">
                  <Textarea
                    value={intention}
                    onChange={(e) => setIntention(e.target.value)}
                    placeholder="مثلاً: أدعو بالشفاء لصديق، أو بالسكينة في قلبي، أو بالنجاح في عملي..."
                    className="w-full h-40 bg-card border border-gold/30 rounded-3xl p-6 text-cream text-lg focus:outline-none focus:border-gold transition-all resize-none shadow-inner font-amiri"
                    dir="rtl"
                    disabled={isGenerating}
                  />
                  <Button
                    type="submit"
                    disabled={isGenerating || !intention.trim()}
                    className="absolute bottom-4 left-4 bg-gold text-navy px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-gold-light transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    <Send className="w-5 h-5" />
                    {isGenerating ? 'جاري الصياغة...' : 'صياغة الدعاء'}
                  </Button>
                </div>
              </form>
            )}

            {generatedDua && !isGenerating && (
              <div className="animate-fade-in space-y-6">
                <DecorativeDivider />
                
                <div ref={giftRef}>
                  <GiftCard dua={generatedDua.duaText} senderName={senderName} />
                </div>
                
                <div className="bg-gold/10 border border-gold/20 rounded-3xl p-6">
                  <h4 className="font-amiri text-lg text-gold flex items-center gap-2 justify-end mb-3">
                    <Sparkles className="w-5 h-5" />
                    <span>المعنى المبسط</span>
                  </h4>
                  <p className="font-cairo text-cream/80 text-right leading-relaxed">
                    {generatedDua.simplifiedMeaning}
                  </p>
                </div>
                
                <div className="bg-gold/10 border border-gold/20 rounded-3xl p-6">
                  <h4 className="font-amiri text-lg text-gold flex items-center gap-2 justify-end mb-3">
                    <Sparkles className="w-5 h-5" />
                    لمسة روحانية
                  </h4>
                  <p className="text-cream/80 leading-relaxed italic font-amiri text-xl text-right">
                    {generatedDua.spiritualTouch}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    onClick={handleReset}
                    variant="outline"
                    className="py-6 border-2 border-dashed border-gold/30 rounded-2xl text-gold hover:bg-gold/5 transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    دعاء جديد
                  </Button>

                  <Button 
                    onClick={copyDuaText}
                    variant="outline"
                    className="py-6 border-2 border-dashed border-purple-500/30 rounded-2xl text-purple-400 hover:bg-purple-500/5 transition-all flex items-center justify-center gap-2"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {copied ? 'تم النسخ!' : 'نسخ النص'}
                  </Button>

                  <Button 
                    onClick={downloadGiftImage}
                    disabled={isCapturing}
                    variant="outline"
                    className="py-6 border-2 border-dashed border-blue-500/30 rounded-2xl text-blue-400 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    {isCapturing ? 'جاري...' : 'حفظ كصورة'}
                  </Button>

                  <Button 
                    onClick={handleShare}
                    variant="outline"
                    className="py-6 border-2 border-dashed border-green-500/30 rounded-2xl text-green-500 hover:bg-green-500/5 transition-all flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    مشاركة الهدية
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 opacity-30 pointer-events-none flex justify-center gap-20">
          <Lantern className="w-20 h-20 text-gold animate-float" />
          <Lantern className="w-20 h-20 text-gold animate-float" style={{ animationDelay: '1.5s' }} />
        </div>
      </div>

      {/* Share Dialog */}
      {showShareDialog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-card rounded-3xl p-8 max-w-md w-full animate-scale-in border-2 border-gold/30 shadow-2xl">
            <h3 className="text-gold font-amiri text-2xl text-center mb-2">
              كيف تريد المشاركة؟ 💝
            </h3>
            <p className="text-cream/60 text-sm text-center mb-6 font-cairo">
              اختر طريقة المشاركة المفضلة
            </p>
            
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="اكتب اسمك (اختياري)"
              className="w-full bg-navy/50 border border-gold/30 rounded-2xl p-4 text-cream text-center font-amiri text-lg focus:outline-none focus:border-gold mb-4"
              dir="rtl"
              autoFocus
            />

            {/* عرض الرابط المختصر */}
            {shortUrl && (
              <div className="bg-gold/10 border border-gold/30 rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Link2 className="w-4 h-4 text-gold" />
                  <span className="text-xs font-cairo text-gold">رابط مختصر:</span>
                </div>
                <code className="block bg-navy/50 px-3 py-2 rounded-lg text-xs text-cream break-all font-mono">
                  {shortUrl}
                </code>
              </div>
            )}

            {isGeneratingUrl && (
              <div className="text-center mb-4">
                <p className="text-gold/60 text-sm animate-pulse">جاري إنشاء رابط مختصر...</p>
              </div>
            )}
            
            <div className="space-y-3">
              <Button
                onClick={shareToWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl"
                disabled={isCapturing}
              >
                <MessageCircle className="w-5 h-5 ml-2" />
                مشاركة على واتساب
              </Button>

              <Button
                onClick={shareImageDirectly}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl"
                disabled={isCapturing}
              >
                <Share2 className="w-5 h-5 ml-2" />
                {isCapturing ? 'جاري الإعداد...' : 'مشاركة الصورة'}
              </Button>
              
              <Button
                onClick={copyShareLink}
                className="w-full bg-gold text-navy hover:bg-gold-light font-bold py-4 rounded-2xl"
              >
                <Copy className="w-5 h-5 ml-2" />
                نسخ رابط المشاركة
              </Button>
              
              <Button
                onClick={() => {
                  setShowShareDialog(false);
                }}
                variant="outline"
                className="w-full border-gold/30 text-cream hover:bg-gold/10 rounded-2xl"
              >
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
