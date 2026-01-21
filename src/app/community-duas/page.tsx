"use client";

import React, { useEffect, useState } from 'react';
import { FloatingStars, CrescentMoon, DecorativeDivider } from '@/components/islamic-decorations';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Feather, Loader2, AlertCircle } from 'lucide-react';
import CommunityDuaCard from '@/components/community-dua-card';

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDuas();
  }, []);

  async function loadDuas() {
    try {
      // Check if Supabase is configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error('Supabase not configured. Please add environment variables.');
      }

      const { data, error } = await supabase
        .from('community_duas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Database error: ${error.message}`);
      }

      setDuas(data || []);
      setError(null);
    } catch (err) {
      console.error('Error loading duas:', err);
      setError(err instanceof Error ? err.message : 'حدث خطأ غير معروف');
    } finally {
      setLoading(false);
    }
  }

  async function handleLike(duaId: number, currentLikes: number) {
    try {
      const { error } = await supabase
        .from('community_duas')
        .update({ likes: currentLikes + 1 })
        .eq('id', duaId);

      if (!error) {
        setDuas(duas.map(d => 
          d.id === duaId ? { ...d, likes: currentLikes + 1 } : d
        ));
      }
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-hero-gradient pt-32 pb-20 px-4 flex items-center justify-center">
        <FloatingStars />
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-gold mx-auto mb-4 animate-spin" />
          <p className="text-cream text-xl font-amiri">جار التحميل...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-hero-gradient pt-32 pb-20 px-4 flex items-center justify-center">
        <FloatingStars />
        <div className="max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-amiri text-cream mb-4">حدث خطأ</h2>
          <p className="text-cream/70 mb-6 font-cairo">{error}</p>
          <Button 
            onClick={() => {
              setLoading(true);
              setError(null);
              loadDuas();
            }}
            className="bg-gold text-navy hover:bg-gold-light"
          >
            إعادة المحاولة
          </Button>
          <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-left">
            <p className="text-xs text-cream/50 font-mono">
              Debug Info:<br/>
              URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Set' : '✗ Missing'}<br/>
              Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Missing'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero-gradient pt-32 pb-20 px-4">
      <FloatingStars />
      
      <div className="container mx-auto max-w-3xl text-center animate-fade-in">
        <CrescentMoon className="w-16 h-16 text-gold mx-auto mb-4" />
        
        <h1 className="font-amiri text-4xl text-cream mb-2">مجتمع الدعاء</h1>
        
        <p className="text-cream/60 mb-6">
          أدعية يشاركها إخوة وأخوات لك. أمّن على دعائهم وشارك بدعاء من قلبك.
        </p>
        
        <DecorativeDivider className="mb-8" />
        
        <div className="text-center mb-12">
          <Link href="/share">
            <Button className="bg-gold text-navy font-bold py-6 px-10 rounded-2xl text-lg hover:bg-gold-light shadow-lg shadow-gold/20 transform hover:scale-105 transition-transform">
              <Feather className="ml-3" />
              شارك بدعاءٍ ليؤمِّن عليه غيرُك
            </Button>
          </Link>
        </div>
        
        {duas.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-cream/50 text-xl mb-6">
              لا توجد أدعية بعد. كن أول من يشارك! 🤲
            </p>
            <Link href="/share">
              <Button className="bg-gold/20 text-gold border border-gold/30 hover:bg-gold/30">
                شارك أول دعاء
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {duas.map((dua) => (
              <CommunityDuaCard 
                key={dua.id}
                dua={dua}
                onLikeChange={handleLike}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
