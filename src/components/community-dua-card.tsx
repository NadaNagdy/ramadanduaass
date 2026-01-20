"use client";

import React, { useState } from 'react';
import { Heart, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CommunityDuaCardProps {
  dua: {
    id: string;
    text: string;
    author: string;
    category: string;
    likes?: number;
    amens?: number;
    timestamp?: number;
    isGolden?: boolean;
  };
  isLiked?: boolean;
  onLike?: () => void;
  onAmen?: () => void;
}

export default function CommunityDuaCard({ 
  dua, 
  isLiked = false,
  onLike,
  onAmen 
}: CommunityDuaCardProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasAmened, setHasAmened] = useState(false);

  const speakDua = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(dua.text);
    utterance.lang = 'ar-SA'; // Arabic (Saudi Arabia)
    utterance.rate = 0.8; // Slower for clarity
    utterance.pitch = 1;
    utterance.volume = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const handleAmen = () => {
    if (!hasAmened) {
      setHasAmened(true);
      onAmen?.();
    }
  };

  const getCategoryInfo = (category: string) => {
    const categories: Record<string, { name: string; icon: string }> = {
      myself: { name: 'لنفسي', icon: '🤲' },
      family: { name: 'للأهل', icon: '👨‍👩‍👧‍👦' },
      jannah: { name: 'للجنة', icon: '🌸' },
      healing: { name: 'لجبر الخاطر', icon: '💚' },
      country: { name: 'للوطن', icon: '🏠' },
      'laylat-al-qadr': { name: 'ليلة القدر', icon: '🌙' },
      'prophets-duas': { name: 'أدعية الأنبياء', icon: '📜' },
      'quranic-duas': { name: 'أدعية قرآنية', icon: '📖' },
    };
    return categories[category] || { name: category, icon: '🤲' };
  };

  const categoryInfo = getCategoryInfo(dua.category);

  return (
    <div className="bg-navy/40 backdrop-blur-sm rounded-2xl p-6 border border-gold/20 hover:border-gold/40 transition-all shadow-lg hover:shadow-gold/10 group">
      {/* Header with category and golden badge */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-2">
          {dua.isGolden && (
            <span className="px-3 py-1 bg-gold/20 text-gold rounded-full text-sm flex items-center gap-1">
              <Sparkles size={14} />
              دعاء مميز
            </span>
          )}
        </div>
        <span className="px-3 py-1 bg-cream/10 text-cream rounded-full text-sm">
          {categoryInfo.icon} {categoryInfo.name}
        </span>
      </div>

      {/* Dua Text */}
      <p className="font-amiri text-2xl text-cream text-right leading-relaxed mb-6 group-hover:text-gold/90 transition-colors">
        {dua.text}
      </p>

      {/* Author and Date */}
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gold/10">
        <div className="flex gap-2">
          {/* Text-to-Speech Button */}
          <Button
            onClick={speakDua}
            variant="ghost"
            size="sm"
            className={`text-cream hover:text-gold hover:bg-gold/10 transition-colors ${
              isSpeaking ? 'text-gold bg-gold/10' : ''
            }`}
            title={isSpeaking ? 'إيقاف الاستماع' : 'استمع للدعاء'}
          >
            {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </Button>
        </div>
        
        <div className="text-right">
          <p className="text-gold font-semibold">{dua.author}</p>
          {dua.timestamp && (
            <p className="text-cream/40 text-sm">
              {new Date(dua.timestamp).toLocaleDateString('ar-SA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          )}
        </div>
      </div>

      {/* Actions: Like and Amen */}
      <div className="flex gap-3">
        <Button
          onClick={onLike}
          variant="ghost"
          className={`flex-1 ${
            isLiked 
              ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
              : 'bg-cream/5 text-cream/70 hover:bg-cream/10 hover:text-cream'
          } transition-all`}
        >
          <Heart 
            size={18} 
            className="ml-2"
            fill={isLiked ? 'currentColor' : 'none'}
          />
          {dua.likes || 0}
        </Button>

        <Button
          onClick={handleAmen}
          disabled={hasAmened}
          className={`flex-1 ${
            hasAmened
              ? 'bg-gold/30 text-gold cursor-not-allowed'
              : 'bg-gold/20 text-gold hover:bg-gold/30'
          } transition-all`}
        >
          آمين {dua.amens ? `(${dua.amens})` : ''}
        </Button>
      </div>
    </div>
  );
}
