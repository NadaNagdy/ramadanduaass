"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Star, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Share2, 
  ExternalLink 
} from 'lucide-react';
import { Dua } from '@/lib/duas';
import { Button } from './ui/button';
import Link from 'next/link';

interface DuaOfTheDayProps {
  dua: Dua;
}

const DuaOfTheDay: React.FC<DuaOfTheDayProps> = ({ dua }) => {
  // حالات التحكم في الصوت
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  
  // حالات التحكم في النسخ والمشاركة
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSynth(window.speechSynthesis);
    }
  }, []);

  // وظيفة القراءة الصوتية
  const handleSpeak = () => {
    if (!synth) return;

    if (isPlaying) {
      synth.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(dua.dua);
    utterance.lang = 'ar-SA';

    const voices = synth.getVoices();
    const femaleVoice = voices.find(
      (voice) => 
        (voice.lang.includes('ar') && voice.name.toLowerCase().includes('female')) ||
        (voice.lang.includes('ar') && voice.name.toLowerCase().includes('zira')) ||
        (voice.lang.includes('ar') && voice.name.toLowerCase().includes('leila'))
    );

    if (femaleVoice) utterance.voice = femaleVoice;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    synth.speak(utterance);
  };

  // وظيفة النسخ
  const handleCopy = async () => {
    await navigator.clipboard.writeText(dua.dua);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // وظيفة المشاركة
  const handleShare = async () => {
    setSharing(true);
    try {
      const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
      
      if (navigator.share) {
        await navigator.share({
          title: dua.arabicTitle || 'دعاء اليوم',
          text: dua.dua,
          url: siteUrl,
        });
      } else {
        const shareText = `${dua.dua}\n\n🌐 ${siteUrl}`;
        await navigator.clipboard.writeText(shareText);
        alert('تم نسخ الدعاء مع رابط الموقع! يمكنك مشاركته الآن 📋');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setSharing(false);
    }
  };

  return (
    <section className="py-16 animate-fade-in container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-2 font-amiri">دعاء اليوم</h2>
        <p className="text-gold font-amiri text-lg">اليوم {dua.day} من رمضان</p>
      </div>

      <Card className="bg-card-gradient text-cream rounded-3xl shadow-2xl overflow-hidden border border-gold/20 backdrop-blur-md">
        <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-gold/10">
          <CardTitle className="flex items-center gap-3 text-2xl font-cairo text-gold">
            <Star className="w-7 h-7 text-gold animate-float" />
            {dua.arabicTitle || "دعاء مأثور"}
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSpeak}
              className="text-gold hover:bg-gold/10 rounded-full"
              title={isPlaying ? "إيقاف" : "استماع لصوت نسائي"}
            >
              {isPlaying ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-8 md:p-10">
          <p className="text-2xl md:text-3xl font-amiri leading-relaxed text-center mb-8 text-white/90">
            {dua.dua}
          </p>

          {/* التصنيفات */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {dua.category?.map((cat) => (
              <span
                key={cat}
                className="bg-gold/10 backdrop-blur-sm rounded-full px-4 py-1 text-sm text-gold border border-gold/20 font-cairo"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* أزرار التفاعل */}
          <div className="flex flex-col md:flex-row justify-center gap-4 pt-6 border-t border-gold/10">
            <Button
              onClick={handleCopy}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white rounded-full px-8 py-6 transition-all border border-white/10"
            >
              {copied ? (
                <><Check className="w-5 h-5 text-green-400" /> <span>تم النسخ</span></>
              ) : (
                <><Copy className="w-5 h-5" /> <span>نسخ الدعاء</span></>
              )}
            </Button>

            <Button
              onClick={handleShare}
              disabled={sharing}
              className="flex items-center gap-2 bg-gold text-black hover:bg-gold/80 rounded-full px-8 py-6 transition-all"
            >
              {sharing ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
              ) : (
                <><Share2 className="w-5 h-5" /> <span>مشاركة الدعاء</span></>
              )}
            </Button>
          </div>

          <div className="text-center mt-6">
            <Link href={`/daily-duas/${dua.day}`}>
              <Button variant="link" className="text-gold/60 hover:text-gold flex items-center gap-2 mx-auto">
                <ExternalLink className="w-4 h-4" />
                عرض التفاصيل والمصادر
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default DuaOfTheDay;
