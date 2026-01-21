"use client";

import { useEffect, useRef } from "react";
import lottie from "lottie-web";

export default function ListeningAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animation: any;

    const loadAnimation = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/NadaNagdy/ramadanduaass/refs/heads/main/public/animations/listening-animation.json"
        );
        const animationData = await res.json();

        if (containerRef.current) {
          animation = lottie.loadAnimation({
            container: containerRef.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: animationData,
          });
        }
      } catch (error) {
        console.error("Failed to load animation:", error);
      }
    };

    loadAnimation();

    return () => {
      if (animation) animation.destroy();
    };
  }, []);

  return <div ref={containerRef} className="w-48 h-48 mx-auto" />;
}

