import { Suspense } from 'react';
import SharedDuaContent from './SharedDuaContent';

export const dynamic = 'force-dynamic';

export default function SharedDuaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gold font-amiri text-xl">جاري التحميل...</p>
        </div>
      </div>
    }>
      <SharedDuaContent />
    </Suspense>
  );
}
