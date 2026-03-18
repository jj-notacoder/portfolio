'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Overlay from './Overlay';

interface ScrollyCanvasProps {
  className?: string;
  frameCount?: number;
}

export default function ScrollyCanvas({ className, frameCount = 192 }: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Setup scroll tracking on the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress to a frame index (0 to frameCount - 1)
  const currentIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  useEffect(() => {
    // Optimized preloading with concurrent loading chunks
    const loadImages = async () => {
      let loaded = 0;
      const loadedImages: HTMLImageElement[] = new Array(frameCount);

      // Load in batches to not overwhelm the browser
      const batchSize = 10;
      
      for (let i = 0; i < frameCount; i += batchSize) {
        const batch = [];
        for (let j = 0; j < batchSize && i + j < frameCount; j++) {
          const index = i + j;
          batch.push(
            new Promise<void>((resolve) => {
              const img = new Image();
              const indexStr = index.toString().padStart(3, '0');
              img.src = `/frame_${indexStr}_delay-0.041s.png`;
              
              img.onload = () => {
                loadedImages[index] = img;
                loaded++;
                setLoadingProgress(Math.round((loaded / frameCount) * 100));
                resolve();
              };
              img.onerror = () => {
                // Ignore missing images and resolve anyway to prevent unhandled rejection blocks
                loaded++;
                setLoadingProgress(Math.round((loaded / frameCount) * 100));
                resolve();
              }
            })
          );
        }
        await Promise.all(batch);
      }

      setImages(loadedImages);
      setIsLoaded(true);
    };

    loadImages();
  }, [frameCount]);

  // Draw the actual image on the canvas
  const drawImage = (index: number) => {
    if (!images[index] || !canvasRef.current || !isLoaded) return;
    
    // Check if image is loaded
    if (!images[index].complete || images[index].naturalWidth === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI displays for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    
    // Check if size needs update
    if (canvas.width !== window.innerWidth * dpr || canvas.height !== window.innerHeight * dpr) {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      // Also update style sizes so it fits exactly
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }

    // Save state, scale, draw, restore state to prevent exponential scaling
    ctx.save();
    ctx.scale(dpr, dpr);

    // Object cover logic
    const img = images[index];
    const imageAspectRatio = img.width / img.height;
    const canvasAspectRatio = window.innerWidth / window.innerHeight;

    let renderableWidth, renderableHeight, xStart, yStart;

    if (imageAspectRatio < canvasAspectRatio) {
      // Canvas is wider than image (by aspect ratio) - scale width to fit, crop height
      renderableWidth = window.innerWidth;
      renderableHeight = window.innerWidth / imageAspectRatio;
      xStart = 0;
      yStart = (window.innerHeight - renderableHeight) / 2;
    } else {
      // Canvas is narrower than image - scale height to fit, crop width
      renderableHeight = window.innerHeight;
      renderableWidth = window.innerHeight * imageAspectRatio;
      xStart = (window.innerWidth - renderableWidth) / 2;
      yStart = 0;
    }

    // Clear and fill background
    ctx.fillStyle = '#121212';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    
    ctx.drawImage(img, xStart, yStart, renderableWidth, renderableHeight);
    ctx.restore();
  };

  // Listen to frame index changes and redraw
  useMotionValueEvent(currentIndex, "change", (latest) => {
    if (isLoaded) {
      const frameIndex = Math.floor(latest);
      requestAnimationFrame(() => drawImage(frameIndex));
    }
  });

  // Handle Initial Draw and Window Resizes
  useEffect(() => {
    if (!isLoaded) return;
    
    // Draw initial frame
    drawImage(0);

    const handleResize = () => {
      drawImage(Math.floor(currentIndex.get()));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={containerRef} className={cn("relative h-[500vh] w-full bg-[#121212]", className)}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#121212] z-50 transition-opacity duration-1000">
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-white transition-all duration-300 ease-out" 
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-white/50 text-sm font-mono tracking-widest uppercase">
              Loading High-Res Assets {loadingProgress}%
            </p>
          </div>
        )}
        
        <motion.canvas 
          ref={canvasRef} 
          className="w-full h-full block"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1 }}
        />
        
        {/* Vignette Overlay for a cinematic aesthetic */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(18,18,18,0.7)_100%)] z-10" />
        
        {/* Render text overlay synced to main scroll frame */}
        {isLoaded && <Overlay scrollYProgress={scrollYProgress} />}
      </div>
    </div>
  );
}
