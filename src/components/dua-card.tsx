
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, BookOpen, Clock, Star } from 'lucide-react';

interface DuaCardProps {
  dua: {
    id: number;
    arabic: string;
    source?: string;
    when?: string;
    benefit?: string;
    repetition?: string;
    isGolden?: boolean;
  };
}

export default function DuaCard({ dua }: DuaCardProps) {
  return (
    <Card 
      className={`
        bg-white/10 backdrop-blur-md border-2
        ${dua.isGolden 
          ? 'border-gold bg-gradient-to-br from-gold/20 to-transparent' 
          : 'border-white/20'
        }
        hover:shadow-2xl hover:shadow-gold/20 transition-all duration-300
        rounded-3xl overflow-hidden
      `}
    >
      
        {/* Golden Badge */}
        {dua.isGolden && (
          
            
              
              دعاء مأثور
            
          
        )}

        {/* Arabic Text */}
        
          
            {dua.arabic}
          
        

        {/* Metadata */}
        
          {dua.source && (
            
              
              
                المصدر: {dua.source}
              
            
          )}

          {dua.when && (
            
              
              
                وقت الدعاء: {dua.when}
              
            
          )}

          {dua.benefit && (
            
              
              
                الفائدة: {dua.benefit}
              
            
          )}

          {dua.repetition && (
            
              
                🔢 {dua.repetition}
              
            
          )}
        
      
    
  );
}
