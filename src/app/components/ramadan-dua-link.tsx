"use client";

import Link from 'next/link';
import React from 'react';

const RamadanDuaLink: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-6 text-center" aria-label="daily-duas-link">
      <Link href="/daily-duas" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold text-black font-semibold hover:bg-yellow-500 transition">
        مبارك الشهر الفضيل
        <span aria-hidden>➡️</span>
      </Link>
    </section>
  );
};

export default RamadanDuaLink;
