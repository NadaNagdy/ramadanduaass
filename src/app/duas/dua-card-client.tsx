'use client';

import React from 'react';

type Props = {
  title: string;
  dua: string;
};

export default function DuaCardClient({ title, dua }: Props) {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100 text-center" dir="rtl">
      <h1 className="text-3xl font-bold text-emerald-600 mb-6">{title}</h1>
      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="text-xl leading-relaxed text-gray-800 font-medium">
          {dua}
        </p>
      </div>
      
      <button 
        onClick={() => alert('تم نسخ الدعاء!')}
        className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition"
      >
        نسخ الدعاء
      </button>
    </div>
  );
}
