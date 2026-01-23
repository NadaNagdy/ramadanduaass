'use client';

import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

export function ShareSection({ title, description }: { title: string; description: string }) {
  const handleShare = async () => {
    if (typeof window !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled or error occurred
      }
    }
  };

  return (
    <div className="mt-16 mb-12 text-center">
      <h3 className="text-2xl font-amiri text-cream mb-4">
        شارك الخير مع من تحب
      </h3>
      <p className="text-cream/80 mb-6">
        أدعية الشفاء قد تكون سبباً في شفاء مريض
      </p>
      <Button
        onClick={handleShare}
        className="bg-gold text-white hover:bg-gold/90"
      >
        <Share2 className="w-4 h-4 mr-2" />
        مشاركة الصفحة
      </Button>
    </div>
  );
}
