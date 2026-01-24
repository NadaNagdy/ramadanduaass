"use client";

import { useState, useRef } from "react";
import { Gift, Sparkles, Download, Share2, MessageCircle, Twitter, Facebook, Copy, Check, Link2 } from "lucide-react";
import DuaCard from "@/components/dua-card";
import html2canvas from 'html2canvas';

interface GiftCardProps {
  dua: string;
  senderName?: string;
}

export default function GiftCard({ dua, senderName }: GiftCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setIsOpen(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  // Generate shortened URL
  const generateShortUrl = async () => {
    if (shortUrl) return shortUrl;

    const baseUrl = window.location.origin;
    const duaEncoded = encodeURIComponent(dua);
    const nameEncoded = senderName ? encodeURIComponent(senderName) : '';
    const longUrl = `${baseUrl}/shared-dua?dua=${duaEncoded}${nameEncoded ? `&from=${nameEncoded}` : ''}`;

    try {
      const response = await fetch('/api/shorten-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl }),
      });

      const data = await response.json();
      setShortUrl(data.shortUrl);
      return data.shortUrl;
    } catch (error) {
      console.error('Error generating short URL:', error);
      return longUrl;
    }
  };

  // Copy link to clipboard
  const copyLink = async () => {
    const url = await generateShortUrl();
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate and download image
  const downloadImage = async () => {
    if (!cardRef.current) return;

    setIsGenerating(true);
    try {
      const shareButtons = cardRef.current.querySelector('.share-buttons-container');
      if (shareButtons) (shareButtons as HTMLElement).style.display = 'none';

      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
        useCORS: true,
      });

      if (shareButtons) (shareButtons as HTMLElement).style.display = '';

      const link = document.createElement('a');
      link.download = `dua-gift-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Share to WhatsApp (text)
  const shareToWhatsApp = async () => {
    const url = await generateShortUrl();
    const text = `🎁 ${senderName ? `${senderName} أرسل لك هدية روحانية:\n\n` : ''}🤲 ${dua}\n\n✨ شاهد الهدية كاملة: ${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Share to Twitter
  const shareToTwitter = async () => {
    const url = await generateShortUrl();
    const text = `🎁 هدية روحانية\n🤲 ${dua.substring(0, 150)}...\n\n`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  // Share to Facebook
  const shareToFacebook = async () => {
    const url = await generateShortUrl();
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  // Share image to WhatsApp
  const shareImageToWhatsApp = async () => {
    if (!cardRef.current) return;

    setIsGenerating(true);
    try {
      const shareButtons = cardRef.current.querySelector('.share-buttons-container');
      if (shareButtons) (shareButtons as HTMLElement).style.display = 'none';

      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });

      if (shareButtons) (shareButtons as HTMLElement).style.display = '';

      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], 'dua-gift.png', { type: 'image/png' });
          
          if (navigator.share && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: 'هدية روحانية 🎁',
              text: dua,
            });
          } else {
            const link = document.createElement('a');
            link.download = `dua-gift-${Date.now()}.png`;
            link.href = URL.createObjectURL(blob);
            link.click();
            
            setTimeout(() => {
              window.open('https://wa.me/', '_blank');
            }, 500);
          }
        }
      });
    } catch (error) {
      console.error('Error sharing image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // 🔹 الكونفيتي
  const Confetti = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {[...Array(20)].map((_, i) => {
        const left = `${50 + (Math.random() - 0.5) * 40}%`;
        const delay = `${Math.random() * 0.3}s`;
        const duration = `${1.5 + Math.random() * 0.5}s`;
        const emoji = ['✨', '🌟', '💫', '⭐'][Math.floor(Math.random() * 4)];
        return (
          <div
            key={i}
            className="absolute text-2xl animate-confetti"
            style={{
              left,
              top: '50%',
              animationDelay: delay,
              animationDuration: duration
            }}
          >
            {emoji}
          </div>
        );
      })}
    </div>
  );

  if (isOpen) {
    return (
      <div className="relative">
        {showConfetti && <Confetti />}

        <div className="animate-scale-in" ref={cardRef}>
          <DuaCard 
            title="تهادوا الحب غيباً بالدعاء" 
            dua={dua} 
            showActions={false}
          />

          {/* Share Buttons */}
          <div className="share-buttons-container mt-6 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {/* Download Image */}
              <button
                onClick={downloadImage}
                disabled={isGenerating}
                className="flex items-center justify-center gap-2 bg-gold/20 hover:bg-gold/30 text-gold py-3 px-4 rounded-xl transition-all disabled:opacity-50 border border-gold/40"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-cairo font-semibold">
                  {isGenerating ? 'جاري...' : 'حفظ صورة'}
                </span>
              </button>

              {/* Copy Link */}
              <button
                onClick={copyLink}
                className="flex items-center justify-center gap-2 bg-gold/20 hover:bg-gold/30 text-gold py-3 px-4 rounded-xl transition-all border border-gold/40"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span className="text-sm font-cairo font-semibold">
                  {copied ? 'تم النسخ!' : 'نسخ الرابط'}
                </span>
              </button>

              {/* Share Image to WhatsApp */}
              <button
                onClick={shareImageToWhatsApp}
                disabled={isGenerating}
                className="flex items-center justify-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 py-3 px-4 rounded-xl transition-all disabled:opacity-50 border border-green-500/40"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-cairo font-semibold">شارك صورة</span>
              </button>

              {/* More Options */}
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center justify-center gap-2 bg-gold/20 hover:bg-gold/30 text-gold py-3 px-4 rounded-xl transition-all border border-gold/40"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-cairo font-semibold">المزيد</span>
              </button>
            </div>

            {/* Extended Share Menu */}
            {showShareMenu && (
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 space-y-2 border border-gold/30 animate-fade-in">
                <button
                  onClick={shareToWhatsApp}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all text-right"
                >
                  <MessageCircle className="w-5 h-5 text-green-400" />
                  <span className="text-cream font-cairo">واتساب (نص)</span>
                </button>

                <button
                  onClick={shareToTwitter}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all text-right"
                >
                  <Twitter className="w-5 h-5 text-blue-400" />
                  <span className="text-cream font-cairo">تويتر</span>
                </button>

                <button
                  onClick={shareToFacebook}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all text-right"
                >
                  <Facebook className="w-5 h-5 text-blue-500" />
                  <span className="text-cream font-cairo">فيسبوك</span>
                </button>
              </div>
            )}

            {/* Short URL Display */}
            {shortUrl && (
              <div className="bg-gold/10 border border-gold/30 rounded-xl p-4 animate-fade-in">
                <div className="flex items-center gap-2 mb-2">
                  <Link2 className="w-4 h-4 text-gold" />
                  <span className="text-sm font-cairo font-semibold text-gold">الرابط المختصر:</span>
                </div>
                <code className="block bg-white/5 px-3 py-2 rounded text-sm text-cream break-all font-mono">
                  {shortUrl}
                </code>
              </div>
            )}

            {/* Close/Rewrap Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-gold/10 border border-gold/30 rounded-2xl text-gold hover:bg-gold/20 transition-all text-sm font-cairo"
            >
              إعادة لف الهدية 🎁
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes confetti {
            0% { transform: translateY(0) translateX(0) rotate(0deg); opacity:1; }
            100% { transform: translateY(-300px) translateX(var(--x,0)) rotate(var(--r,0deg)); opacity:0; }
          }
          .animate-confetti {
            animation: confetti forwards;
          }

          @keyframes scale-in {
            0% { transform: scale(0.8); opacity:0; }
            100% { transform: scale(1); opacity:1; }
          }
          .animate-scale-in {
            animation: scale-in 0.5s ease-out;
          }
        `}</style>
      </div>
    );
  }

  // 🔹 Gift Box (مغلق)
  return (
    <div className="relative animate-fade-in cursor-pointer" onClick={handleOpen}>
      <div className="relative group w-full max-w-md mx-auto min-h-[300px] p-12 bg-gradient-to-br from-gold/20 to-gold/5 border-2 border-gold/40 rounded-3xl flex flex-col justify-center items-center hover:shadow-2xl hover:shadow-gold/20 transition-transform duration-500 transform hover:scale-[1.02]">

        {/* الشريطة العمودية */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-full bg-gradient-to-b from-gold via-gold-light to-gold/50 opacity-60" />
        {/* الشريطة الأفقية */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-16 bg-gradient-to-r from-gold via-gold-light to-gold/50 opacity-60" />

        {/* الفيونيكة */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
          <div className="relative">
            <Gift className="w-16 h-16 text-gold drop-shadow-lg animate-float" />
            <Sparkles className="w-6 h-6 text-gold-light absolute -top-2 -right-2 animate-pulse" />
          </div>
        </div>

        {/* المحتوى */}
        <div className="relative z-10 mt-8 text-center">
          <h3 className="font-amiri text-3xl text-gold mb-4 animate-pulse">
            تهادوا الحب غيباً
          </h3>
          <p className="text-cream/60 text-lg font-cairo mb-6">
            اضغط لفتح هديتك الروحانية
          </p>

          <div className="flex justify-center gap-2 text-gold/40">
            <span className="text-2xl animate-bounce" style={{ animationDelay: '0s' }}>✨</span>
            <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎁</span>
            <span className="text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>✨</span>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-radial from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
      </div>
    </div>
  );
}
