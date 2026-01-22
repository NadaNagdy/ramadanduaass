
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
      <CardContent className="p-6">
        {/* Golden Badge */}
        {dua.isGolden && (
          <div className="mb-4 flex justify-center">
            <Badge className="bg-gold text-white border-gold">
              دعاء مأثور
            </Badge>
          </div>
        )}

        {/* Arabic Text */}
        <div className="mb-6 text-center">
          <p className="text-2xl font-amiri leading-relaxed text-white">
            {dua.arabic}
          </p>
        </div>

        {/* Metadata */}
        <div className="space-y-2 text-sm text-white/80">
          {dua.source && (
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>المصدر: {dua.source}</span>
            </div>
          )}

          {dua.when && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>وقت الدعاء: {dua.when}</span>
            </div>
          )}

          {dua.benefit && (
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>الفائدة: {dua.benefit}</span>
            </div>
          )}

          {dua.repetition && (
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>🔢 {dua.repetition}</span>
            </div>
          )}
        </div>
      </CardContent>
    
  );
}
