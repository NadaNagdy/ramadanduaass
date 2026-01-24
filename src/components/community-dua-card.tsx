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
    return (
  <Card className="bg-white/5 backdrop-blur-md border-2 border-gold/30 rounded-3xl overflow-hidden hover:border-gold/50 transition-all hover:shadow-lg hover:shadow-gold/20 animate-fade-in">
    <CardContent className="p-8">

      {/* Header - Author & Date */}
      <div className="flex flex-col items-center text-center mb-6 pb-4 border-b border-gold/20 gap-3">
        
        <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center border-2 border-gold/40">
          <User className="w-7 h-7 text-gold" />
        </div>

        <p className="text-gold font-amiri text-xl font-semibold">
          {dua.author || 'زائر كريم'}
        </p>

        <div className="flex items-center gap-2 text-cream/50 text-sm font-cairo">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(dua.created_at)}</span>
        </div>

        {dua.isGolden && (
          <div className="mt-2 bg-gold/20 text-gold px-4 py-1 rounded-full text-xs font-cairo border border-gold/40">
            ⭐ دعاء مميز
          </div>
        )}
      </div>

      {/* Dua Text */}
      <div className="bg-gold/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gold/20">
        <p className="text-cream text-2xl leading-relaxed text-center font-amiri">
          {dua.text}
        </p>
      </div>

      {/* Footer - Like Button */}
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleLike}
          disabled={isLiked}
          className={`
            flex items-center gap-2 px-8 py-3 rounded-xl font-cairo font-semibold transition-all
            ${isLiked 
              ? 'bg-red-500/20 text-red-400 border-2 border-red-500/40 cursor-not-allowed' 
              : 'bg-gold/20 text-gold border-2 border-gold/40 hover:bg-gold/30 hover:scale-105 active:scale-95'
            }
          `}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          <span>{isLiked ? 'أمّنت على الدعاء' : 'آمين'}</span>

          {likeCount > 0 && (
            <span className="bg-white/10 px-2 py-0.5 rounded-full text-sm">
              {likeCount}
            </span>
          )}
        </button>

        <div className="text-cream/40 text-sm font-cairo">
          🤲 اللهم استجب
        </div>
      </div>

    </CardContent>
  </Card>
);
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
