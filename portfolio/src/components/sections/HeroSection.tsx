'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const TAGLINES = [
  "Hardware-Software Systems",
  "AI Solutions",
  "Cybersecurity"
];

export default function HeroSection() {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[100vh] flex flex-col justify-center px-[8vw] z-10 select-none">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.15 }}
        className="max-w-4xl"
      >
        {/* Eyebrow */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          className="flex items-center gap-4 text-[--accent-gold] tracking-[0.2em] text-sm uppercase mb-8 font-display"
        >
          <span className="text-xs">✦</span>
          <span>Portfolio 2026</span>
        </motion.div>

        {/* H1 Massive Shimmer */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 }
          }}
          className="text-[clamp(4rem,10vw,12rem)] leading-[0.85] font-display font-bold tracking-tight mb-8"
        >
          <div className="text-shimmer mb-1">JESHER</div>
          <div className="text-shimmer">JEBSON</div>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          className="text-[--text-muted] text-[clamp(1rem,1.5vw,1.5rem)] leading-relaxed mb-6 border-l-2 border-[--glass-border] pl-6"
        >
          <p>Sophomore · BSc Computer Engineering</p>
          <p>Khalifa University, Abu Dhabi</p>
        </motion.div>

        {/* Animated Cycling Tagline */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          className="h-[40px] overflow-hidden"
        >
          <motion.div
            key={taglineIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "anticipate" }}
            className="text-[--text-primary] font-display text-xl md:text-2xl"
          >
            &quot;{TAGLINES[taglineIndex]}&quot;
          </motion.div>
        </motion.div>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-[8vw] flex flex-col items-center gap-3 text-[--text-muted] text-sm tracking-widest uppercase origin-left font-display"
      >
        <span className="[writing-mode:vertical-lr] rotate-180">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-[--text-muted] to-transparent"
        />
      </motion.div>
    </section>
  );
}
