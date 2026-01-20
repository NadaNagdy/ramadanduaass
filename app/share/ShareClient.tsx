'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

export default function ShareClient() {
  const handleShare = () => {
    const shareUrl = window.location.href; // آمن هنا لأنه client-only
    console.log('Share URL:', shareUrl);
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">صفحة المشاركة</h1>
      <Button onClick={handleShare}>مشاركة الرابط</Button>
    </div>
  );
}
