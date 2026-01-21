"use client";

import { useEffect, useRef } from 'react';

interface ListeningAnimationProps {
  className?: string; // لتغيير الحجم أو أي ستايل خارجي
}

export default function ListeningAnimation({ className }: ListeningAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationInstance = useRef<any>(null);

  useEffect(() => {
    // تحميل Lottie من CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
    script.async = true;

    script.onload = () => {
      if (containerRef.current && window.lottie) {
        animationInstance.current = window.lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/animations/listening-animation.json',
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      // إزالة السكريبت
      document.body.removeChild(script);
      // إيقاف الأنيميشن وتدميره لتجنب تسريب الذاكرة
      if (animationInstance.current) {
        animationInstance.current.destroy();
      }
    };
  }, []);

  return <div ref={containerRef} className={`mx-auto ${className || "w-48 h-48"}`} />;
}

// TypeScript declaration
declare global {
  interface Window {
    lottie: any;
  }
}

