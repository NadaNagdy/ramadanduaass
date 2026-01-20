"use client";

import React from 'react';
import { HandHeart, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CommunityDua } from '@/lib/duas';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Button } from './ui/button';

interface CommunityDuaCardProps {
  dua: CommunityDua;
}

const CommunityDuaCard: React.FC<CommunityDuaCardProps> = ({ dua }) => {
  const [amenedDuas, setAmenedDuas] = useLocalStorage<string[]>('amened_duas', []); // ✅ Changed to string[]
  const isAmened = amenedDuas.includes(String(dua.id)); // ✅ Convert to string
  
  const handleAmenClick = () => {
    const duaIdStr = String(dua.id); // ✅ Convert to string
    if (isAmened) {
      setAmenedDuas(amenedDuas.filter(id => id !== duaIdStr));
    } else {
      setAmenedDuas([...amenedDuas, duaIdStr]);
    }
  };
  
  const amenCount = (dua.likes || 0) + (isAmened ? 1 : 0); // ✅ Changed from dua.amens to dua.likes
  
  return (
    <div className={cn(
      "relative bg-card-gradient rounded-3xl p-6 border transition-all duration-300 shadow-md",
      dua.isGolden ? "border-gold/50 shadow-gold/10" : "border-gold/20"
    )}>
      {dua.isGolden && (
        <div className="absolute -top-3 -right-3 p-2 bg-gold rounded-full shadow-lg">
          <Star className="w-5 h-5 text-navy fill-current" />
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold font-bold text-xl">
          {dua.author.charAt(0)}
        </div>
        
        <div className="flex-1 text-right">
          <p className="font-bold text-cream">{dua.author}</p>
          <p className="font-amiri text-cream/90 text-lg mt-2">{dua.text}</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gold/10 flex justify-end items-center gap-4">
        <span className="text-sm text-gold tabular-nums">{amenCount.toLocaleString('ar')}</span>
        
        <Button
          onClick={handleAmenClick}
          variant="ghost"
          className={cn(
            "flex items-center gap-2 transition-colors",
            isAmened ? "text-gold" : "text-cream/60 hover:text-gold"
          )}
        >
          <HandHeart className={cn("w-5 h-5", isAmened && "fill-current")} />
          <span>{isAmened ? 'تم التأمين' : 'آمين'}</span>
        </Button>
      </div>
    </div>
  );
};

export default CommunityDuaCard;
