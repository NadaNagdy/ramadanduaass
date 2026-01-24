"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { FloatingStars, CrescentMoon, DecorativeDivider } from '@/components/islamic-decorations';
import { Button } from '@/components/ui/button';
import CommunityDuaCard from '@/components/community-dua-card';
import { supabase } from '@/lib/supabase';
import { useSearchParams } from 'next/navigation';
import { Loader2, PlusCircle } from 'lucide-react';
import Link from 'next/link';

type CommunityDua = {
  id: number;
  text: string;
  author?: string;
  likes: number;
  created_at: string;
  isGolden?: boolean;
};

function CommunityContent() {
  const [duas, setDuas] = useState<CommunityDua[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const newDuaId = searchParams?.get('newDua');

  useEffect(() => {
    fetchDuas();
  }, []);

  const fetchDuas = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('community_duas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDuas(data || []);
    } catch (error) {
      console.error('Error fetching duas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLikeChange = async (id: number, currentLikes: number) => {
    try {
      const { error } = await supabase
        .from('community_duas')
        .update({ likes: currentLikes + 1 })
        .eq('id', id);

      if (error) throw error;

      setDuas(duas.map(dua => 
        dua.id === id ? { ...dua, likes: currentLikes + 1 } : dua
      ));
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  return (
    <>
      <div className="mb-12 text-center">
        <Link href="/add-community-dua">
          <Button
            size="lg"
            className="bg-gold hover:bg-gold-light text-navy font-cairo font-bold text-lg rounded-xl shadow-lg shadow-gold/20 transform hover:scale-105 transition-transform"
          >
            <PlusCircle className="ml-2 w-5 h-5" />
            شارك دعاءك
          </Button>
        </Link>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-12 h-12 text-gold animate-spin" />
        </div>
      )}

      {!isLoading && duas.length === 0 && (
        <div className="text-center py-20">
          <p className="text-cream/60 text-xl font-amiri mb-6">
            لا توجد أدعية بعد. كن أول من يشارك دعاءه! 🤲
          </p>
          <Link href="/add-community-dua">
            <Button
              variant="outline"
              className="text-gold border-gold/50 hover:bg-gold/10"
            >
              أضف أول دعاء
            </Button>
          </Link>
        </div>
      )}

      {!isLoading && duas.length > 0 && (
        <div className="space-y-6">
          {duas.map((dua) => (
            <CommunityDuaCard
              key={dua.id}
              dua={dua}
              onLikeChange={handleLikeChange}
              highlight={newDuaId ? dua.id === parseInt(newDuaId) : false}
            />
          ))}
        </div>
      )}

      {newDuaId && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gold text-navy px-6 py-3 rounded-full shadow-lg animate-bounce font-cairo font-bold z-50">
          ✅ تم نشر دعائك بنجاح!
        </div>
      )}
    </>
  );
}

export default function CommunityDuasPage() {
  return (
    <div className="min-h-screen bg-hero-gradient pt-32 pb-20 px-4">
      <FloatingStars />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block p-4 bg-gold/10 rounded-full mb-6 animate-float">
            <CrescentMoon className="w-12 h-12 text-gold" />
          </div>
          <h1 className="font-amiri text-4xl md:text-5xl font-bold text-gold mb-4">
            حائط الأدعية المجتمعي
          </h1>
          <p className="text-cream/70 text-lg font-cairo max-w-2xl mx-auto">
            أدعية مشتركة من قلوب المؤمنين - أمّن على دعاء أخيك يستجاب لك
          </p>
          <DecorativeDivider className="mt-8" />
        </div>

        <Suspense fallback={
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-gold animate-spin" />
          </div>
        }>
          <CommunityContent />
        </Suspense>
      </div>
    </div>
  );
}
