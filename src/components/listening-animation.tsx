"use client";

import { useEffect, useRef } from 'react';

export default function ListeningAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // تحميل Lottie من CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
    script.async = true;
    
    script.onload = () => {
      if (containerRef.current && window.lottie) {
        window.lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/animations/listening-animation.json'
        });
      }
    };
    
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div ref={containerRef} className="w-48 h-48 mx-auto" />;
}

// TypeScript declaration
declare global {
  interface Window {
    lottie: any;
  }
}
