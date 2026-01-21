"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { FloatingStars, CrescentMoon, DecorativeDivider } from '@/components/islamic-decorations';

type CommunityDua = {
  id: number;
  text: string;
  author: string;
  likes: number;
  created_at: string;
};

export default function CommunityDuasPage() {
  const [duas, setDuas] = useState<CommunityDua[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDuas();
  }, []);

  async function loadDuas() {
    const { data, error } = await supabase
      .from('community_duas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading duas:', error);
    } else {
      setDuas(data || []);
    }
    
    setLoading(false);
  }

  async function handleLike(id: number, currentLikes: number) {
    const { error } = await supabase
      .from('community_duas')
      .update({ likes: currentLikes + 1 })
      .eq('id', id);

    if (!error) {
      loadDuas(); // إعادة التحميل
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <p className="text-cream text-2xl">جار التحميل...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero-gradient pt-32 pb-20 px-4">
      <FloatingStars />
      <div className="container mx-auto max-w-3xl">
        <CrescentMoon className="w-16 h-16 text-gold mx-auto mb-4" />
        <h1 className="font-amiri text-4xl text-cream text-center mb-2">
          مجتمع الدعاء
        </h1>
        <DecorativeDivider className="mb-12" />

        <div className="space-y-6">
          {duas.map((dua) => (
            <div
              key={dua.id}
              className="bg-card-gradient rounded-3xl p-6 border border-gold/20"
            >
              <p className="font-amiri text-xl text-cream leading-relaxed mb-4" dir="rtl">
                {dua.text}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-cream/60 text-sm">— {dua.author}</span>
                <button
                  onClick={() => handleLike(dua.id, dua.likes)}
                  className="text-gold hover:text-gold-light"
                >
                  ❤️ {dua.likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
