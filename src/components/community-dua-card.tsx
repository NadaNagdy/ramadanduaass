'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CommunityDua } from '@/lib/duas';

interface CommunityDuaCardProps {
  dua: CommunityDua;
  onLikeChange?: (duaId: string | number, newLikes: number) => void;
}

export default function CommunityDuaCard({ dua, onLikeChange }: CommunityDuaCardProps) {
  const [likes, setLikes] = useState(dua.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const likedDuas = JSON.parse(localStorage.getItem('liked_duas') || '[]');
      const duaIdStr = String(dua.id);
      setIsLiked(likedDuas.includes(duaIdStr));
    }
  }, [dua.id]);

  const handleLike = () => {
    const newLikes = isLiked ? likes - 1 : likes + 1;
    const newIsLiked = !isLiked;
    
    setLikes(newLikes);
    setIsLiked(newIsLiked);

    if (typeof window !== 'undefined') {
      const likedDuas = JSON.parse(localStorage.getItem('liked_dus') || '[]');
      const duaIdStr = String(dua.id);
      
      if (newIsLiked) {
        if (!likedDuas.includes(duaIdStr)) {
          likedDuas.push(duaIdStr);
        }
      } else {
        const index = likedDuas.indexOf(duaIdStr);
        if (index > -1) {
          likedDuas.splice(index, 1);
        }
      }
      
      localStorage.setItem('liked_duas', JSON.stringify(likedDuas));
    }

    if (onLikeChange) {
      onLikeChange(dua.id, newLikes);
    }
  };

  return (
    <Card className="bg-card-gradient border-gold/20 rounded-3xl overflow-hidden hover:border-gold/40 transition-all hover:shadow-lg hover:shadow-gold/10">
      <CardContent className="p-6" dir="rtl">
        <p className="text-xl font-amiri leading-relaxed text-cream mb-4">
          {dua.text}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gold/70">— {dua.author}</span>
          
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all transform hover:scale-105 ${
              isLiked 
                ? 'bg-red-500/20 text-red-500' 
                : 'bg-gold/10 text-gold hover:bg-gold/20'
            }`}
            aria-label={isLiked ? 'إلغاء الإعجاب' : 'أعجبني'}
          >
            <Heart 
              className={`w-5 h-5 transition-all ${isLiked ? 'fill-current' : ''}`}
            />
            <span className="font-semibold">{likes}</span>
          </button>
        </div>

        {dua.category && (
          <div className="mt-4">
            <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-xs rounded-full">
              {dua.category}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );  // ✅ إغلاق Card هنا
}
