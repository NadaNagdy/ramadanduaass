'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface CommunityDua {
  id: string;
  text: string;
  author: string;
  likes: number;
  category?: string;
}

interface CommunityDuaCardProps {
  dua: CommunityDua;  // ✅ object مش string
}

export default function CommunityDuaCard({ dua }: CommunityDuaCardProps) {
  const [likes, setLikes] = useState(dua.likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <Card className="bg-card-gradient border-gold/20 rounded-3xl overflow-hidden hover:border-gold/40 transition-all">
      <CardContent className="p-6" dir="rtl">
        <p className="text-xl font-amiri leading-relaxed text-cream mb-4">
          {dua.text}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gold/70">— {dua.author}</span>
          
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              isLiked 
                ? 'bg-red-500/20 text-red-500' 
                : 'bg-gold/10 text-gold hover:bg-gold/20'
            }`}
          >
            <Heart 
              className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} 
            />
            <span>{likes}</span>
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
  );
}
