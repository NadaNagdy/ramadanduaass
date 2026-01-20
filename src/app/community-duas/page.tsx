"use client";

import React, { useState, useEffect } from 'react';
import { FloatingStars, CrescentMoon, DecorativeDivider } from '@/components/islamic-decorations';
import { communityDuas as initialDuas } from '@/lib/duas';
import { useLocalStorage } from '@/hooks/use-local-storage';
import CommunityDuaCard from '@/components/community-dua-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Feather } from 'lucide-react';

export default function CommunityDuasPage() {
  const [communityDuas, setCommunityDuas] = useLocalStorage('community_duas_shared', []);
  const [likedDuas, setLikedDuas] = useLocalStorage('liked_duas', []);
  
  const allDuas = [...communityDuas, ...initialDuas];
  
  // Create a unique set of duas based on their ID or text to avoid duplicates
  const uniqueDuas = Array.from(
    new Map(allDuas.map(dua => [dua.id || dua.text, dua])).values()
  );

  // Sort by timestamp (newest first)
  const sortedDuas = uniqueDuas.sort((a, b) => {
    const timeA = a.timestamp || 0;
    const timeB = b.timestamp || 0;
    return timeB - timeA;
  });

  const handleLike = (duaId: string) => {
    const isLiked = likedDuas.includes(duaId);
    
    if (isLiked) {
      // Unlike
      setLikedDuas(likedDuas.filter(id => id !== duaId));
      setCommunityDuas(communityDuas.map(dua => 
        dua.id === duaId ? { ...dua, likes: (dua.likes || 0) - 1 } : dua
      ));
    } else {
      // Like
      setLikedDuas([...likedDuas, duaId]);
      setCommunityDuas(communityDuas.map(dua => 
        dua.id === duaId ? { ...dua, likes: (dua.likes || 0) + 1 } : dua
      ));
    }
  };

  const handleAmen = (duaId: string) => {
    setCommunityDuas(communityDuas.map(dua => 
      dua.id === duaId ? { ...dua, amens: (dua.amens || 0) + 1 } : dua
    ));
  };

  return (
    <div className="min-h-screen bg-hero-gradient pt-32 pb-20 px-4">
      <FloatingStars />
      
      <div className="container mx-auto max-w-3xl text-center animate-fade-in">
        <CrescentMoon className="w-16 h-16 text-gold mx-auto mb-4" />
        
        <h1 className="font-amiri text-4xl text-cream mb-2">مجتمع الدعاء</h1>
        <p className="text-cream/60 mb-6">
          أدعية يشاركها إخوة وأخوات لك. أمّن على دعائهم وشارك بدعاء لك.
        </p>
        
        <DecorativeDivider className="mb-8" />
        
        <div className="text-center mb-12">
          <Link href="/share">
            <Button className="bg-gold text-navy font-bold py-6 px-8 rounded-2xl text-lg hover:bg-gold-light shadow-lg shadow-gold/20 transform hover:scale-105 transition-transform">
              <Feather className="ml-3" />
              شارك بدعاءٍ ليؤمِّن عليه غيرُك
            </Button>
          </Link>
        </div>
        
        {sortedDuas.length === 0 ? (
          <div className="bg-navy/30 backdrop-blur-sm rounded-2xl p-12 border border-gold/20">
            <p className="text-cream/70 text-lg">
              لا توجد أدعية بعد. كن أول من يشارك دعاءً!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedDuas.map((dua) => (
              <CommunityDuaCard 
                key={dua.id} 
                dua={dua}
                isLiked={likedDuas.includes(dua.id)}
                onLike={() => handleLike(dua.id)}
                onAmen={() => handleAmen(dua.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
