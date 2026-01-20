
"use client";

import React, { useState, useEffect } from 'react';
import { Heart, Volume2, VolumeX, Trash2, Plus } from 'lucide-react';

interface CommunityDua {
  id: string;
  text: string;
  author: string;
  category: string;
  likes: number;
  timestamp: number;
  isGolden?: boolean;
  amens?: number;
}

export default function CommunityDuasPage() {
  const [duas, setDuas] = useState<CommunityDua[]>([]);
  const [newDua, setNewDua] = useState({ text: '', author: '', category: 'myself' });
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const [likedDuas, setLikedDuas] = useState<Set<string>>(new Set());

  // Load duas from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('communityDuas');
    if (saved) {
      setDuas(JSON.parse(saved));
    }
    
    const savedLikes = localStorage.getItem('likedDuas');
    if (savedLikes) {
      setLikedDuas(new Set(JSON.parse(savedLikes)));
    }
  }, []);

  // Save duas to localStorage whenever they change
  useEffect(() => {
    if (duas.length > 0) {
      localStorage.setItem('communityDuas', JSON.stringify(duas));
    }
  }, [duas]);

  // Save likes to localStorage
  useEffect(() => {
    localStorage.setItem('likedDuas', JSON.stringify(Array.from(likedDuas)));
  }, [likedDuas]);

  const categories = [
    { id: 'myself', name: 'لنفسي', icon: '🤲' },
    { id: 'family', name: 'للأهل', icon: '👨‍👩‍👧‍👦' },
    { id: 'jannah', name: 'للجنة', icon: '🌸' },
    { id: 'healing', name: 'لجبر الخاطر', icon: '💚' },
    { id: 'country', name: 'للوطن', icon: '🏠' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDua.text.trim() || !newDua.author.trim()) return;

    const dua: CommunityDua = {
      id: Date.now().toString(),
      text: newDua.text.trim(),
      author: newDua.author.trim(),
      category: newDua.category,
      likes: 0,
      timestamp: Date.now(),
      amens: 0,
    };

    setDuas([dua, ...duas]);
    setNewDua({ text: '', author: '', category: 'myself' });
  };

  const handleLike = (id: string) => {
    const newLikedDuas = new Set(likedDuas);
    const isLiked = likedDuas.has(id);

    if (isLiked) {
      newLikedDuas.delete(id);
    } else {
      newLikedDuas.add(id);
    }

    setLikedDuas(newLikedDuas);
    setDuas(duas.map(dua => 
      dua.id === id 
        ? { ...dua, likes: isLiked ? dua.likes - 1 : dua.likes + 1 }
        : dua
    ));
  };

  const handleDelete = (id: string) => {
    if (confirm('هل تريد حذف هذا الدعاء؟')) {
      setDuas(duas.filter(dua => dua.id !== id));
    }
  };

  const speakText = (text: string, id: string) => {
    if (isSpeaking === id) {
      window.speechSynthesis.cancel();
      setIsSpeaking(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    
    utterance.onend = () => setIsSpeaking(null);
    utterance.onerror = () => setIsSpeaking(null);
    
    setIsSpeaking(id);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">أدعية المجتمع</h1>
          <p className="text-emerald-600">شارك دعاءك مع الآخرين</p>
        </div>

        {/* Add New Dua Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-emerald-200">
          <h2 className="text-2xl font-bold text-emerald-700 mb-4 text-right">إضافة دعاء جديد</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-right text-emerald-700 mb-2 font-semibold">الدعاء</label>
              <textarea
                value={newDua.text}
                onChange={(e) => setNewDua({ ...newDua, text: e.target.value })}
                className="w-full p-3 border-2 border-emerald-200 rounded-lg text-right resize-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                rows={4}
                placeholder="اكتب دعاءك هنا..."
                required
              />
            </div>
            
            <div>
              <label className="block text-right text-emerald-700 mb-2 font-semibold">اسمك</label>
              <input
                type="text"
                value={newDua.author}
                onChange={(e) => setNewDua({ ...newDua, author: e.target.value })}
                className="w-full p-3 border-2 border-emerald-200 rounded-lg text-right focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                placeholder="اسمك أو كنيتك"
                required
              />
            </div>

            <div>
              <label className="block text-right text-emerald-700 mb-2 font-semibold">التصنيف</label>
              <select
                value={newDua.category}
                onChange={(e) => setNewDua({ ...newDua, category: e.target.value })}
                className="w-full p-3 border-2 border-emerald-200 rounded-lg text-right focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              إضافة الدعاء
            </button>
          </form>
        </div>

        {/* Duas List */}
        <div className="space-y-4">
          {duas.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <p className="text-gray-500 text-lg">لا توجد أدعية بعد. كن أول من يشارك دعاءً!</p>
            </div>
          ) : (
            duas.map((dua) => {
              const category = categories.find(c => c.id === dua.category);
              const isLiked = likedDuas.has(dua.id);
              
              return (
                <div
                  key={dua.id}
                  className="bg-white rounded-2xl shadow-lg p-6 border-2 border-emerald-100 hover:border-emerald-300 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(dua.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="حذف"
                      >
                        <Trash2 size={20} />
                      </button>
                      <button
                        onClick={() => speakText(dua.text, dua.id)}
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title={isSpeaking === dua.id ? 'إيقاف' : 'استماع'}
                      >
                        {isSpeaking === dua.id ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </button>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                      {category?.icon} {category?.name}
                    </span>
                  </div>

                  <p className="text-xl text-gray-800 text-right leading-relaxed mb-4 font-arabic">
                    {dua.text}
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-emerald-100">
                    <button
                      onClick={() => handleLike(dua.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        isLiked 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-gray-100 text-gray-600 hover:bg-red-50'
                      }`}
                    >
                      <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                      <span className="font-bold">{dua.likes}</span>
                    </button>
                    
                    <div className="text-right">
                      <p className="text-emerald-700 font-semibold">{dua.author}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(dua.timestamp).toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
