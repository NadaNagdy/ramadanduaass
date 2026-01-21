"use client";

import { Player } from '@lottiefiles/react-lottie-player';

export default function ListeningAnimation() {
  return (
    <div className="w-48 h-48 mx-auto">
      <Player
        autoplay
        loop
        src="/animations/listening-animation.json"
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  );
}
