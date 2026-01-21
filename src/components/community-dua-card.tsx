"use client";

import React from 'react';
import { HandHeart, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface CommunityDua {
  id: number;
  text: string;
  author: string;
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

  return (
    <div className={cn(
      "relative bg-card-gradient rounded-3xl p-6 border transition-all duration-300 shadow-md hover:shadow-xl",
      dua.isGolden ? "border-gold/50 shadow-gold/10" : "border-gold/20"
    )}>
      {dua.isGolden && (
        <div className="absolute -top-3 -right-3 p-2 bg-gold rounded-full shadow-lg">
          <Star className="w-5 h-5 text-navy fill-current" />
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold font-bold text-xl shrink-0">
          {dua.author.charAt(0)}
        </div>
        
        <div className="flex-1 text-right">
          <p className="font-bold text-cream">{dua.author}</p>
          <p className="font-amiri text-cream/90 text-lg mt-2 leading-relaxed" dir="rtl">
            {dua.text}
          </p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gold/10 flex justify-end items-center gap-4">
        <span className="text-sm text-gold tabular-nums">
          {dua.likes} آمين
        </span>
        
        <Button
          onClick={handleLikeClick}
          disabled={hasLiked}
          variant="ghost"
          className={cn(
            "flex items-center gap-2 transition-colors",
            hasLiked ? "text-gold cursor-not-allowed opacity-70" : "text-cream/60 hover:text-gold"
          )}
        >
          <HandHeart className={cn("w-5 h-5", hasLiked && "fill-current")} />
          <span>{hasLiked ? 'أمّنت' : 'آمين'}</span>
        </Button>
      </div>
    </div>
  );
}
