'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';

export default function SectionC_Projects() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Number of cards to drive the progress mapping
  const cardCount = 4;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newActive = Math.min(cardCount - 1, Math.floor(latest * cardCount));
    if (newActive !== activeIndex) {
      setActiveIndex(newActive);
    }
  });

  const generateCardTransforms = (index: number) => {
    const offset = index - activeIndex;
    
    if (offset === 0) {
      // Front active card
      return {
        transform: 'none',
        zIndex: 10,
        filter: 'none',
        opacity: 1
      };
    } else if (offset > 0) {
      // Cards queued to the right (future)
      const s = offset;
      return {
        transform: `translateX(${130 * s}px) scale(${1 - 0.18 * s}) perspective(800px) rotateY(-4deg)`,
        zIndex: 10 - s,
        filter: `blur(${Math.min(s * 3, 8)}px)`,
        opacity: s > 2 ? 0 : 0.55 - s * 0.1
      };
    } else {
      // Cards discarded to the left (past)
      const s = Math.abs(offset);
      return {
        transform: `translateX(${-130 * s}px) scale(${1 - 0.18 * s}) perspective(800px) rotateY(4deg)`,
        zIndex: 10 - s,
        filter: `blur(${Math.min(s * 3, 8)}px)`,
        opacity: s > 2 ? 0 : 0.55 - s * 0.1
      };
    }
  };

  const projects = [
    {
      num: "01",
      title: "Campus Runner",
      category: "Mobile · Campus Utility",
      desc: "A campus delivery and errand management app connecting students and streamlining on-campus logistics end-to-end.",
      stack: ["React Native", "Node.js", "Express"],
      links: [
        { label: "GitHub ↗", url: "https://github.com/jj-notacoder/campusrunner" },
        { label: "Live ↗", url: "https://campusrunner.vercel.app/" }
      ]
    },
    {
      num: "02",
      title: "Manara",
      category: "AI · Travel · Logistics",
      desc: "An intelligent travel planning and logistics optimization platform powered by AI — designed to streamline complex multi-leg journeys and resource allocation.",
      stack: ["Python", "AI/ML", "React"], 
      links: [
        { label: "GitHub ↗", url: "https://github.com/jj-notacoder/manara_" },
        { label: "Live ↗", url: "https://manara-client.vercel.app/" }
      ]
    },
    {
      num: "03",
      title: "WorkSync",
      category: "Productivity · SaaS",
      desc: "A collaborative workspace synchronization tool designed to bridge communication gaps across distributed and remote teams.",
      stack: ["JavaScript", "SQL", "Tailwind"],
      links: [
        { label: "GitHub ↗", url: "https://github.com/chason2007/worksync" },
        { label: "Live ↗", url: "https://worksync-8fdf.vercel.app/login" }
      ]
    },
    {
      num: "04",
      title: "IMFHI Website",
      category: "Full-Stack · Web Development",
      desc: "A fully responsive full-stack web platform for the IMFHI Church community — featuring event management, announcements, and congregation engagement tools.",
      stack: ["HTML/CSS", "JavaScript", "Firebase"],
      links: [
        { label: "GitHub ↗", url: "https://github.com/jj-notacoder/imfhi" },
        { label: "Live ↗", url: "https://imfhi.vercel.app/" }
      ]
    }
  ];

  return (
    <section className="section arsenal-section relative z-30" id="arsenal">
      
      {/* GLOBAL HEADING */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: '-60px' }}
        className="section-heading-wrapper w-full max-w-[1400px] mx-auto"
      >
        <h2 className="section-heading">The Arsenal</h2>
        <p className="section-sub">Projects built with intention.</p>
      </motion.div>
      
      {/* SCROLL DRIVER */}
      <div className="arsenal-scroll-driver" id="arsenalDriver" ref={targetRef}>
        
        {/* STICKY VIEWPORT */}
        <div className="arsenal-sticky">
          <div className="slider" id="projectSlider">
            
            {projects.map((proj, i) => {
              const styles = generateCardTransforms(i);
              
              return (
                <div 
                  key={i} 
                  className="item" 
                  data-index={i}
                  style={{
                    transform: styles.transform,
                    zIndex: styles.zIndex,
                    filter: styles.filter,
                    opacity: styles.opacity
                  }}
                >
                  <div className="card-num">{proj.num}</div>
                  <div className="card-title">{proj.title}</div>
                  <div className="card-category">{proj.category}</div>
                  <p className="card-desc">{proj.desc}</p>
                  
                  <div className="card-stack">
                    {proj.stack.map((t, idx) => (
                      <span key={idx} className="stack-pill">{t}</span>
                    ))}
                  </div>
                  
                  <div className="card-links">
                    {proj.links.map((link, idx) => (
                      <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="card-btn">{link.label}</a>
                    ))}
                  </div>
                </div>
              );
            })}

          </div>
          
          {/* Progress dots */}
          <div className="slider-dots">
            {[0, 1, 2, 3].map((dotIndex) => (
              <span 
                key={dotIndex} 
                className={`dot ${activeIndex === dotIndex ? 'active' : ''}`} 
                onClick={() => setActiveIndex(dotIndex)} // Allow clicking dots manually too
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
          
          {/* Card counter */}
          <div className="slider-counter">
            <span id="activeNum">0{activeIndex + 1}</span>
            <span className="opacity-50 mx-2 tracking-[0.1em]">/</span>
            <span>04</span>
          </div>

        </div>
      </div>

    </section>
  );
}
