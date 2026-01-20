"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FloatingStars, CrescentMoon, DecorativeDivider } from '@/components/islamic-decorations';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Button } from '@/components/ui/button';
import { ArrowRight, Send } from 'lucide-react';
import Link from 'next/link';

export default function ShareDuaPage() {
  const router = useRouter();
  const [communityDuas, setCommunityDuas] = useLocalStorage('community_duas_shared', []);
  
  const [duaText, setDuaText] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('myself');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'myself', name: 'أدعية لنفسي', icon: '🤲' },
    { id: 'family', name: 'أدعية للأهل', icon: '👨‍👩‍👧‍👦' },
    { id: 'jannah', name: 'أدعية للجنة', icon: '🌸' },
    { id: 'laylat-al-qadr', name: 'ليلة القدر', icon: '🌙' },
    { id: 'prophets-duas', name: 'أدعية الأنبياء', icon: '📜' },
    { id: 'quranic-duas', name: 'أدعية قرآنية', icon: '📖' },
    { id: 'healing', name: 'أدعية لجبر الخاطر', icon: '💚' },
    { id: 'country', name: 'أدعية للوطن', icon: '🏠' },
  ];

  const handleSubmit = () => {
    if (!duaText.trim() || !author.trim()) {
      alert('الرجاء إدخال الدعاء والاسم');
      return;
    }

    setIsSubmitting(true);

    const newDua = {
      id: `dua_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      text: duaText.trim(),
      author: author.trim(),
      category: category,
      likes: 0,
      amens: 0,
      timestamp: Date.now(),
      isGolden: false,
    };

    // Add to community duas
    setCommunityDuas([newDua, ...communityDuas]);

    // Reset form
    setDuaText('');
    setAuthor('');
    setCategory('myself');
    setIsSubmitting(false);

    // Show success message
    alert('تم إضافة دعائك بنجاح! جزاك الله خيراً');
    
    // Redirect to community page
    router.push('/community-duas');
  };

  return (
    <div className="min-h-screen bg-hero-gradient pt-32 pb-20 px-4">
      <FloatingStars />
      
      <div className="container mx-auto max-w-2xl animate-fade-in">
        <div className="text-center mb-8">
          <CrescentMoon className="w-16 h-16 text-gold mx-auto mb-4" />
          <h1 className="font-amiri text-4xl text-cream mb-2">شارك دعاءك</h1>
          <p className="text-cream/60 mb-6">
            شارك بدعاء من قلبك ليؤمِّن عليه إخوانك و
