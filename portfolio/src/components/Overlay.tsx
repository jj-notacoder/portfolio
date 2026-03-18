'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  
  // Phase 2: Sparse, cinematic typographic narrative during the video scrub
  // 0% - 30%: Intro Frame (Massive H1, tagline)
  // 30% - 70%: Mid Frame (Atmospheric floating label)
  // 70% - 100%: Final Frame (Scroll to discover)

  const introOpacity = useTransform(scrollYProgress, [0, 0.25, 0.30], [1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.30], [0, -50]);

  const midOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.70], [0, 1, 1, 0]);

  // Handle Watermark Hide on Scroll (> 80px)
  const [hideWatermark, setHideWatermark] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setHideWatermark(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none w-full h-full">
      
      {/* 0-30% INTRO FRAME */}
      <motion.div 
        className="absolute inset-0 w-full h-full flex flex-col justify-center px-[8vw] select-none"
        style={{ opacity: introOpacity, y: introY }}
      >
        <div className="max-w-4xl">
          <div className="text-[--text-muted] tracking-[0.3em] text-xs uppercase mb-8 font-display flex items-center gap-4">
             <span className="text-[--accent-gold] text-[10px]">✦</span> PORTFOLIO · 2026
          </div>
          <h1 className="text-[clamp(4rem,11vw,12rem)] leading-[0.85] font-display font-black tracking-tight mb-8">
            <span className="block text-[--text-primary]">JESHER</span>
            <span className="block text-[--text-primary]">JEBSON</span>
          </h1>
          <div className="text-[--text-muted] text-[clamp(1rem,1.5vw,1.5rem)] font-light tracking-wide mb-6">
            BSc Computer Engineering · Khalifa University
          </div>
          <div className="h-10 overflow-hidden text-[--accent-cyan] font-display text-xl md:text-2xl mt-4">
            <motion.div
              animate={{ y: [0, -40, -40, -80, -80, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "linear" }}
              className="flex flex-col text-left gap-10"
            >
              <div>&quot;Hardware & Software Systems&quot;</div>
              <div>&quot;AI Solutions&quot;</div>
              <div>&quot;Cybersecurity&quot;</div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 30-70% MID FRAME ATMOSPHERE */}
      <motion.div 
        className="absolute bottom-24 right-12 md:right-32 flex flex-col items-end text-right"
        style={{ opacity: midOpacity }}
      >
        <span className="text-[--text-muted] font-display tracking-widest uppercase text-xs mb-4">
          Location
        </span>
        <span className="text-[--text-primary] text-lg md:text-xl font-light">
          Based in Abu Dhabi, UAE
        </span>
        <div className="w-16 h-px bg-[--accent-gold] mt-4 opacity-50" />
      </motion.div>

      {/* WATERMARK ARROW REPLACEMENT */}
      <div 
        className={`fixed bottom-[10vh] left-1/2 -translate-x-1/2 text-[0.7rem] uppercase tracking-[0.25em] font-body text-[rgba(240,237,230,0.4)] pointer-events-none transition-opacity duration-600 ${hideWatermark ? 'opacity-0' : 'animate-watermark-pulse'}`}
      >
        ↓ scroll to explore
      </div>

    </div>
  );
}
