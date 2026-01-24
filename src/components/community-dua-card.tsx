"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, User, Calendar } from 'lucide-react';

type CommunityDua = {
  id: number;
  text: string;
  author?: string;
  likes: number;
  created_at: string;
  isGolden?: boolean;
};

interface CommunityDuaCardProps {
  dua: CommunityDua;
  onLikeChange: (id: number, currentLikes: number) => void;
  highlight?: boolean; // جديد: لتسليط الضوء على الدعاء الجديد
}

export default function CommunityDuaCard({ dua, onLikeChange, highlight }: CommunityDuaCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(dua.likes);
  const [isHighlighted, setIsHighlighted] = useState(highlight || false);

  useEffect(() => {
    if (highlight) {
      setIsHighlighted(true);
      const timer = setTimeout(() => setIsHighlighted(false), 3000); // تمييز 3 ثواني
      return () => clearTimeout(timer);
    }
  }, [highlight]);

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
      onLikeChange(dua.id, likeCount);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInMinutes < 1) return 'منذ لحظات';
    if (diffInMinutes < 60) return `منذ ${diffInMinutes} دقيقة`;
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'منذ يوم';
    if (diffInDays < 7) return `منذ ${diffInDays} أيام`;
    return date.toLocaleDateString('ar-SA', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <Card
      className={`transition-all border-2 rounded-3xl overflow-hidden hover:border-gold/50 
        ${isHighlighted ? 'border-gold/80 bg-gold/10 animate-pulse' : 'border-gold/30 bg-white/5'} 
        hover:shadow-lg hover:shadow-gold/20 animate-fade-in`}
    >
      <CardContent className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gold/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center border-2 border-gold/40">
              <User className="w-6 h-6 text-gold" />
            </div>
            <div className="text-right">
              <p className="text-gold font-amiri text-lg font-semibold">
                {dua.author || 'زائر كريم'}
              </p>
              <div className="flex items-center gap-2 text-cream/50 text-sm font-cairo">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(dua.created_at)}</span>
              </div>
            </div>
          </div>

          {dua.isGolden && (
            <div className="bg-gold/20 text-gold px-3 py-1 rounded-full text-xs font-cairo border border-gold/40">
              ⭐ دعاء مميز
            </div>
          )}
        </div>

        {/* Text */}
        <div className="bg-gold/5 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-gold/20">
          <p className="text-cream text-xl leading-loose text-right font-amiri">
            {dua.text}
          </p>
        </div>

        {/* Footer: Like + Message */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleLike}
            disabled={isLiked}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-cairo font-semibold transition-all 
              ${isLiked 
                ? 'bg-red-500/20 text-red-400 border-2 border-red-500/40 cursor-not-allowed' 
                : 'bg-gold/20 text-gold border-2 border-gold/40 hover:bg-gold/30 hover:scale-105 active:scale-95'} 
            `}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>{isLiked ? 'أمّنت على الدعاء' : 'آمين'}</span>
            {likeCount > 0 && (
              <span className="bg-white/10 px-2 py-0.5 rounded-full text-sm">{likeCount}</span>
            )}
          </button>

          <div className="text-cream/40 text-sm font-cairo">
            🤲 اللهم استجب
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
