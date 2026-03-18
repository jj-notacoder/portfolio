'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

export default function SectionA_About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 120, 
      scale: 0.82, 
      rotateX: 18, 
      filter: 'blur(12px)' 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      rotateX: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center z-30 bg-[#050508]">
      
      {/* Top transition gradient wrapper — smooths the video-to-bg transition */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-transparent to-[#050508] pointer-events-none -translate-y-full" />

      {/* Global Section Heading */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: '-60px' }}
        className="section-heading-wrapper px-[6vw] lg:px-[10vw] max-w-[1400px] w-full mx-auto"
      >
        <h2 className="section-heading">About Me</h2>
      </motion.div>

      {/* 3-Column Card Layout Wrapper */}
      <motion.div 
        className="w-full max-w-[1100px] px-6 lg:px-0 mx-auto grid grid-cols-1 md:grid-cols-3 gap-[28px] pb-[120px]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px" }}
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        
        {/* CARD 1: BIO */}
        <InteractiveCard categoryClass="card-bio" variants={itemVariants}>
          <div className="card-label">WHO I AM</div>
          <p className="card-body">
            I&apos;m a Computer Engineering student at Khalifa University, driven by 
            the intersection of hardware and software. I build things that matter — 
            from AI-powered tools to cybersecurity systems — and I believe the best 
            engineers are those who understand the full stack, from silicon to the cloud.
          </p>
        </InteractiveCard>

        {/* CARD 2: ACADEMICS */}
        <InteractiveCard categoryClass="card-academic" variants={itemVariants}>
          <div className="card-label">ACADEMIC STANDING</div>
          <ul className="card-list">
            <li><span className="li-icon">🏆</span> President&apos;s List — Fall 2024</li>
            <li><span className="li-icon">🏆</span> President&apos;s List — Spring 2025</li>
            <li><span className="li-icon">📅</span> Expected Graduation: 2028</li>
            <li><span className="li-icon">🏛️</span> Khalifa University of Science & Technology</li>
          </ul>
        </InteractiveCard>

        {/* CARD 3: TECH STACK */}
        <InteractiveCard categoryClass="card-stack" variants={itemVariants}>
          <div className="card-label">CORE STACK</div>
          <div className="pill-grid">
            {["Python", "Java", "SQL", "JavaScript", "AI / ML", "Cybersecurity", "C / C++", "Linux"].map((tech) => (
              <span key={tech} className="pill">{tech}</span>
            ))}
          </div>
        </InteractiveCard>

      </motion.div>
    </section>
  );
}

// -------------------------------------------------------------
// InteractiveCard Component
// Extracts the vanilla JS mouse event tracking out of the main block
// -------------------------------------------------------------
function InteractiveCard({ categoryClass, children, variants }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const shine = shineRef.current;
    if (!card || !shine) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      
      // Normalized -1 to 1 position within card
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      
      // Tilt — max 14 degrees
      const rotateY =  x * 14;
      const rotateX = -y * 14;
      
      card.style.transform = `
        perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.04, 1.04, 1.04)
      `;
      
      // Move the internal light spot to follow cursor
      shine.style.background = `radial-gradient(
        circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%,
        rgba(255, 255, 255, 0.10) 0%,
        transparent 65%
      )`;
    };

    const handleMouseLeave = () => {
      card.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
      card.style.transition = 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)';
      shine.style.background = 'transparent';
    };

    const handleMouseEnter = () => {
      card.style.transition = 'transform 0.08s linear';
    };

    // Initial transition state
    card.style.transition = 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)';

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <motion.div 
      variants={variants}
      className={`card-container ${categoryClass} relative w-full h-full`}
    >
      <div 
        ref={cardRef} 
        className="w-full h-full relative z-10"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="card-backlight"></div>
        <div className="card-3d-wrapper">
          <div className="card-inner">
            <div ref={shineRef} className="card-shine" aria-hidden="true"></div>
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
