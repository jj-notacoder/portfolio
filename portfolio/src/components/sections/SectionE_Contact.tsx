'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function SectionE_Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // ── 1. CONFIGURATION ──────────────────────────────────────
    const FRAME_START = 160;
    const FRAME_END   = 191;
    const FRAME_COUNT = FRAME_END - FRAME_START + 1; // 32 frames

    // Match exact path from ScrollyCanvas
    const getFramePath = (n: number) => {
      const indexStr = String(n).padStart(3, '0');
      return `/frame_${indexStr}_delay-0.041s.png`;
    };

    const contactSection = sectionRef.current;
    const canvasWrapper  = canvasWrapperRef.current;
    const canvas         = canvasRef.current;

    if (!contactSection || !canvasWrapper || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── 3. CANVAS RESIZE ──────────────────────────────────────
    let currentFrameIndex = 0;
    
    // Lerp globals
    let targetFrame = 0;
    let displayFrame = 0;
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width  = canvasWrapper.offsetWidth;
      canvas.height = canvasWrapper.offsetHeight;
      drawFrame(Math.round(displayFrame));
    };
    
    window.addEventListener('resize', resizeCanvas);

    // ── 4. DRAW FRAME (object-fit cover) ──────────────────────
    const drawFrame = (index: number) => {
      if (index < 0 || index >= frames.length) return;
      const img = frames[index];
      if (!img || !img.complete || !img.naturalWidth) return;

      const cW = canvas.width;
      const cH = canvas.height;
      const iW = img.naturalWidth;
      const iH = img.naturalHeight;

      const canvasAspect = cW / cH;
      const imgAspect    = iW / iH;

      let drawW, drawH, drawX, drawY;

      if (imgAspect > canvasAspect) {
        drawH = cH;
        drawW = drawH * imgAspect;
        drawX = (cW - drawW) / 2;
        drawY = 0;
      } else {
        drawW = cW;
        drawH = drawW / imgAspect;
        drawX = 0;
        drawY = (cH - drawH) / 2;
      }

      ctx.clearRect(0, 0, cW, cH);
      
      // Force dark background behind image to prevent flashes
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, cW, cH);
      
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    };

    // ── 5. SCROLL SCRUB ───────────────────────────────────────
    const scrubOutro = () => {
      const rect  = contactSection.getBoundingClientRect();
      const viewH = window.innerHeight;
      const secH  = contactSection.offsetHeight;

      const scrolled = viewH - rect.top;
      const total    = viewH + secH;
      const progress = Math.max(0, Math.min(1, scrolled / total));

      targetFrame = Math.min(
        FRAME_COUNT - 1,
        Math.floor(progress * FRAME_COUNT)
      );
    };

    // Lerp Engine for smooth cinematic feeling
    const renderLoop = () => {
      if (Math.abs(targetFrame - displayFrame) > 0.01) {
        displayFrame += (targetFrame - displayFrame) * 0.12;
        drawFrame(Math.round(displayFrame));
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    
    renderLoop();

    window.addEventListener('scroll', scrubOutro, { passive: true });

    // ── 6. PRELOAD 32 FRAMES ──────────────────────────────────
    const frames: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = FRAME_START; i <= FRAME_END; i++) {
      const img = new Image();
      img.src = getFramePath(i);

      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          resizeCanvas();
          drawFrame(0);
        }
        if (loadedCount === FRAME_COUNT) {
          scrubOutro();
        }
      };

      img.onerror = () => {
        console.warn(`[OutroSequence] Failed to load: ${getFramePath(i)}`);
        loadedCount++;
      };

      frames.push(img);
    }

    // ── 7. INTERSECTION OBSERVER ──────────────────────────────
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          canvasWrapper.classList.add('canvas-visible');
          observer.unobserve(contactSection);
        }
      });
    }, { threshold: 0.10 });

    observer.observe(contactSection);

    // Setup cleanup block
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', scrubOutro);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  const links = [
    { icon: "✉", label: "jesherku@gmail.com", url: "mailto:jesherku@gmail.com" },
    { icon: "📞", label: "+971 542 690 965", url: "tel:+971542690965" },
    { icon: "⌥", label: "GitHub ↗", url: "https://github.com/jj-notacoder" },
    { icon: "in", label: "LinkedIn ↗", url: "https://www.linkedin.com/in/jesherj/" },
  ];

  return (
    <section ref={sectionRef} className="contact-section">
      
      {/* CANVAS OUTRO BACKGROUND */}
      <div ref={canvasWrapperRef} className="contact-canvas-wrapper">
        <canvas ref={canvasRef} id="outroCanvas" className="contact-canvas"></canvas>
        <div className="contact-canvas-overlay"></div>
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="contact-content w-full h-full max-w-[1400px] mx-auto text-center">
        
        {/* Massive heading */}
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-[clamp(4rem,9vw,10rem)] leading-[0.9] font-display font-black tracking-tight mb-24 cursor-default"
        >
          <div className="text-[--text-muted]">Let&apos;s Build</div>
          <div className="text-[--text-muted]">Something</div>
          <div className="text-[--accent-gold] bg-clip-text relative inline-block">
            <span className="opacity-0">Extraordinary.</span>
            <span 
              className="absolute inset-0 text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(to right, #4ECDC4 0%, #C9A84C 50%, #F0EDE6 100%)',
                backgroundSize: '200% auto',
                animation: 'single-shimmer 2s ease-out forwards',
              }}
            >
              Extraordinary.
            </span>
          </div>
        </motion.h2>

        <style jsx global>{`
          @keyframes single-shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
        `}</style>

        {/* Animated Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          className="w-[200px] md:w-[400px] h-[2px] bg-gradient-to-r from-transparent via-[--accent-gold] to-transparent mb-16 origin-center"
        />

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 z-20"
        >
          {links.map((link, i) => (
            <a 
              key={i} 
              href={link.url}
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-pill flex items-center gap-4 px-8 py-4 rounded-full text-[--text-primary] text-xs md:text-sm tracking-widest font-display uppercase group transform transition-all hover:-translate-y-1 hover:border-[--accent-gold] hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]"
            >
              <span className="text-[--accent-cyan] group-hover:text-[--accent-gold] transition-colors">{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
          className="contact-footer uppercase"
        >
          © 2026 Jesher Jebson · Crafted in Abu Dhabi, UAE
        </motion.footer>

      </div>
    </section>
  );
}
