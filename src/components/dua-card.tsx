"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, Share2, Download } from 'lucide-react';

interface DuaCardProps {
  title?: string;
  dua?: string | {
    id: number;
    arabic: string;
    source?: string;
    when?: string;
    benefit?: string;
    repetition?: string;
    isGolden?: boolean;
  };
  category?: string;
  showActions?: boolean;
}

export default function DuaCard({ title, dua, category = 'أدعية رمضان', showActions = true }: DuaCardProps) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Handle both string and object formats
  const duaData = typeof dua === 'string' 
    ? { id: 0, arabic: dua, isGolden: false }
    : dua;
  
  if (!duaData) return null;

  const cardId = `dua-card-${duaData.id || Math.random().toString(36).substr(2, 9)}`;

  const handleCopy = async () => {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://adeyat-ramadan.com';
    const shareText = `${duaData.arabic}\n\n🌙 ${category}\n🌐 ${siteUrl}`;
    
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsImage = async () => {
    setDownloading(true);
    
    try {
      // Dynamically import html2canvas only when needed
      const html2canvas = (await import('html2canvas')).default;
      
      const element = document.getElementById(cardId);
      if (!element) return;

      // Hide action buttons temporarily
      const actionsDiv = element.querySelector('.actions-div') as HTMLElement;
      if (actionsDiv) actionsDiv.style.display = 'none';

      const canvas = await html2canvas(element, {
        backgroundColor: null,
        scale: 2,
        logging: false,
      });

      // Show action buttons again
      if (actionsDiv) actionsDiv.style.display = 'flex';

      // Convert to blob
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `دعاء-${Date.now()}.png`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        }
      });
    } catch (error) {
      console.error('Error downloading image:', error);
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://adeyat-ramadan.com';
    const shareText = `${duaData.arabic}\n\n🌙 ${category}\n🌐 ${siteUrl}`;
    
    setShared(true);
    setTimeout(() => setShared(false), 2000);
    
    try {
      // First, try to create and share image
      const element = document.getElementById(cardId);
      if (element && navigator.share && navigator.canShare) {
        try {
          // Dynamically import html2canvas
          const html2canvas = (await import('html2canvas')).default;
          
          // Hide action buttons
          const actionsDiv = element.querySelector('.actions-div') as HTMLElement;
          if (actionsDiv) actionsDiv.style.display = 'none';

          const canvas = await html2canvas(element, {
            backgroundColor: null,
            scale: 2,
            logging: false,
          });

          // Show buttons again
          if (actionsDiv) actionsDiv.style.display = 'flex';

          // Convert to blob
          const blob = await new Promise<Blob>((resolve) => {
            canvas.toBlob((blob) => {
              if (blob) resolve(blob);
            }, 'image/png');
          });

          const file = new File([blob], 'dua-card.png', { type: 'image/png' });
          
          const shareData = {
            title: category,
            text: shareText,
            files: [file],
          };
          
          if (navigator.canShare(shareData)) {
            await navigator.share(shareData);
            return;
          }
        } catch (imgError) {
          console.log('Image sharing not supported');
        }
      }
      
      // Fallback: text sharing or WhatsApp
      if (navigator.share) {
        await navigator.share({
          title: category,
          text: shareText,
        });
      } else {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        window.open(whatsappUrl, '_blank');
      }
    } catch (error) {
      await navigator.clipboard.writeText(shareText);
      console.log('Copied to clipboard as fallback');
    }
  };

  return (
    <div 
      id={cardId}
      className="relative overflow-hidden rounded-3xl"
      style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #1e3a8a 50%, #1e40af 75%, #1e293b 100%)',
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute top-6 right-6 text-4xl opacity-20 animate-pulse">⭐</div>
      <div className="absolute bottom-6 left-6 text-4xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>✨</div>
      <div className="absolute top-12 left-10 text-2xl opacity-15">🌙</div>
      <div className="absolute bottom-12 right-10 text-2xl opacity-15">🌟</div>

      <Card
        className={`
          bg-transparent border-0 shadow-none
        `}
      >
        <CardContent className="p-8 space-y-4 relative z-10">
          {/* Top Badge */}
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-gold to-amber-500 rounded-full px-6 py-2 shadow-lg shadow-gold/30 flex items-center gap-2">
              <span className="text-2xl">🤲</span>
              <span className="text-navy font-bold text-base font-amiri">{category}</span>
            </div>
          </div>

          {/* Moon Icon */}
          <div className="text-center mb-4">
            <span className="text-6xl inline-block" style={{
              filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.6))',
              animation: 'float 3s ease-in-out infinite',
            }}>🌙</span>
          </div>

          {/* Title (optional) */}
          {title && (
            <h3 className="text-xl font-bold text-gold text-center font-amiri mb-4">
              {title}
            </h3>
          )}

          {/* Golden Badge */}
          {duaData.isGolden && (
            <div className="flex justify-center mb-4">
              <Badge className="bg-gold text-navy font-bold font-amiri">
                ⭐ دعاء مأثور
              </Badge>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
            <span className="text-gold/70 text-lg">✨</span>
            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
          </div>

          {/* Arabic Text */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-4">
            <p className="text-xl md:text-2xl leading-loose text-right text-cream font-amiri">
              {duaData.arabic}
            </p>
          </div>

          {/* Metadata */}
          <div className="space-y-2">
            {duaData.source && (
              <p className="text-cream/70 text-right font-amiri text-sm">
                📖 المصدر: {duaData.source}
              </p>
            )}
            {duaData.when && (
              <p className="text-cream/70 text-right font-amiri text-sm">
                ⏰ وقت الدعاء: {duaData.when}
              </p>
            )}
            {duaData.benefit && (
              <p className="text-cream/70 text-right font-amiri text-sm">
                ✨ الفائدة: {duaData.benefit}
              </p>
            )}
            {duaData.repetition && (
              <p className="text-cream/70 text-right font-amiri text-sm">
                🔢 {duaData.repetition}
              </p>
            )}
          </div>

          {/* Website URL */}
          <div className="flex items-center justify-center gap-2 bg-gold/10 rounded-full px-5 py-2 border border-gold/30 mt-4">
            <span className="text-lg">🌐</span>
            <span className="text-gold font-bold text-sm font-amiri">adeyat-ramadan.com</span>
          </div>

          {/* Footer Icons */}
          <div className="flex justify-center gap-4 text-2xl opacity-30 mt-4">
            <span>🕌</span>
            <span>📿</span>
            <span>🤲</span>
          </div>

          {/* Action Buttons */}
          {showActions && (
            <div className="actions-div flex justify-center flex-wrap gap-2 pt-6 border-t border-white/10 mt-6">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-cream border border-white/20 hover:border-white/40 py-2 px-4 rounded-full transition-all text-sm font-amiri"
                title="نسخ الدعاء"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>نسخ</span>
                  </>
                )}
              </button>

              <button
                onClick={downloadAsImage}
                disabled={downloading}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-cream border border-white/20 hover:border-white/40 py-2 px-4 rounded-full transition-all text-sm font-amiri disabled:opacity-50"
                title="تحميل كصورة"
              >
                {downloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin"></div>
                    <span>جاري...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>تحميل</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 bg-gradient-to-r from-gold/30 to-amber-500/30 hover:from-gold/40 hover:to-amber-500/40 text-gold border border-gold/40 hover:border-gold py-2 px-4 rounded-full transition-all text-sm font-amiri font-bold shadow-lg shadow-gold/10"
                title="مشاركة الدعاء"
              >
                {shared ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>تمت المشاركة</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>مشاركة</span>
                  </>
                )}
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
