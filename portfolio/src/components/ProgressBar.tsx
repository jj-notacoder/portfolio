'use client';

import { useEffect, useState } from 'react';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      // Get the current scroll position
      const scrollY = window.scrollY;
      // Get the document height
      const docHeight = document.body.scrollHeight;
      // Get the viewport height
      const winHeight = window.innerHeight;
      
      // Calculate the progress percentage
      const scrollPercent = scrollY / (docHeight - winHeight);
      
      // Add a tiny buffer so it ensures 100% hits smoothly if they scroll past bounds slightly on Mac
      setProgress(Math.min(Math.max(scrollPercent * 100, 0), 100));
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    // Run once on mount to handle initial scroll position
    updateScroll();

    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[9999] pointer-events-none">
      <div 
        className="h-full relative transition-[width] duration-100 ease-linear"
        style={{ 
          width: `${progress}%`,
          background: 'linear-gradient(to right, var(--accent-gold), var(--accent-cyan))',
          boxShadow: '0 0 12px rgba(201, 168, 76, 0.8), 0 0 24px rgba(78, 205, 196, 0.4)'
        }}
      >
        {/* The Comet Flare Dot */}
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[6px] h-[6px] rounded-full bg-white"
          style={{
            boxShadow: '0 0 10px #fff, 0 0 20px var(--accent-cyan), 0 0 30px var(--accent-gold)'
          }}
        />
      </div>
    </div>
  );
}
