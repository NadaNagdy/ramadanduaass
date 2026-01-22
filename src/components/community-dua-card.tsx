"use client";

import React from 'react';
import { HandHeart, Star, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface CommunityDua {
  id: number;
  text: string;
  author?: string;
  likes: number;
  created_at?: string;
  isGolden?: boolean;
}

interface CommunityDuaCardProps {
  dua: CommunityDua;
  onLikeChange?: (duaId: number, currentLikes: number) => void;
}

export default function CommunityDuaCard({ dua, onLikeChange }: CommunityDuaCardProps) {
  const [hasLiked, setHasLiked] = React.useState(false);

  React.useEffect(() => {
    const likedDuas = JSON.parse(localStorage.getItem('liked_duas') || '[]');
    setHasLiked(likedDuas.includes(String(dua.id)));
  }, [dua.id]);

  const handleLikeClick = () => {
    if (hasLiked) return;

    const likedDuas = JSON.parse(localStorage.getItem('liked_duas') || '[]');
    likedDuas.push(String(dua.id));
    localStorage.setItem('liked_duas', JSON.stringify(likedDuas));
    
    setHasLiked(true);
    
    if (onLikeChange) {
      onLikeChange(dua.id, dua.likes);
    }
  };

  const authorName = dua.author && dua.author.trim() !== "" ? dua.author : "زائر كريم";

  return (
    <div className={cn(
      "relative bg-gradient-to-br from-cream via-white to-cream/50 rounded-3xl p-6 border-2 transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-[1.02] overflow-hidden",
      dua.isGolden ? "border-gold shadow-gold/30" : "border-gold/30"
    )}>
      {/* خلفية زخرفية */}
      <div className="absolute top-0 right-0 text-gold/5 text-8xl -mt-6 -mr-6">☪</div>
      <div className="absolute bottom-0 left-0 text-navy/5 text-6xl -mb-4 -ml-4">✦</div>
      
      {/* شريط علوي زخرفي */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
      
      {/* شارة الدعاء الذهبي */}
      {dua.isGolden && (
        <div className="absolute -top-4 -right-4 p-3 bg-gradient-to-br from-gold to-yellow-600 rounded-full shadow-2xl border-4 border-white animate-pulse">
          <Star className="w-6 h-6 text-white fill-current drop-shadow-lg" />
        </div>
      )}
      
      <div className="flex items-start gap-4 relative z-10">
        {/* صورة المستخدم بشكل جميل */}
        <div className="relative">
          <div className="w-14 h-14 bg-gradient-to-br from-gold/20 to-navy/10 rounded-full flex items-center justify-center border-2 border-gold/40 shadow-lg shrink-0">
            <span className="text-gold font-bold text-2xl font-amiri">{authorName.charAt(0)}</span>
          </div>
          {/* زخرفة دائرية */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full border-2 border-white"></div>
        </div>
        
        <div className="flex-1 text-right">
          {/* الاسم مع زخرفة */}
          <div className="flex items-center justify-end gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm text-gold font-bold font-cairo">
              {authorName}
            </span>
            <span className="text-navy/40">—</span>
          </div>

          {/* نص الدعاء مع إطار جميل */}
          <div className="relative bg-gradient-to-br from-navy/5 to-transparent rounded-2xl p-4 border border-dashed border-gold/30">
            <p className="font-amiri text-navy text-xl leading-relaxed" dir="rtl">
              {dua.text}
            </p>
          </div>
        </div>
      </div>
      
      {/* قسم الآمين */}
      <div className="mt-5 pt-4 border-t-2 border-gold/20 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 bg-gradient-to-r from-gold/10 to-transparent rounded-full border border-gold/30">
            <span className="text-lg font-bold text-gold tabular-nums font-cairo">
              {dua.likes}
            </span>
            <span className="text-sm text-gold/70 mr-1 font-cairo">آمين</span>
          </div>
        </div>
        
        <Button
          onClick={handleLikeClick}
          disabled={hasLiked}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-full font-cairo font-bold transition-all duration-300 shadow-lg hover:shadow-xl",
            hasLiked 
              ? "bg-gradient-to-r from-gold to-yellow-600 text-white cursor-not-allowed scale-105" 
              : "bg-white text-navy border-2 border-gold/30 hover:border-gold hover:bg-gold/10 hover:scale-110"
          )}
        >
          <HandHeart className={cn(
            "w-5 h-5 transition-all duration-300",
            hasLiked && "fill-current animate-bounce"
          )} />
          <span className="text-base">{hasLiked ? 'أمّنت 🤲' : 'آمين'}</span>
        </Button>
      </div>
      
      {/* شريط سفلي زخرفي */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
    </div>
  );
}
