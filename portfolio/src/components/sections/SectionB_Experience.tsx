'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

export default function SectionB_Experience() {
  const targetRef = useRef<HTMLDivElement>(null);

  // Sub-component specifically to resolve React Hooks in Callback Array Maps Rules
  const DotIndicator = ({ activeIndex, dotIndex }: { activeIndex: MotionValue<number>, dotIndex: number }) => {
    const width = useTransform(activeIndex, (val) => val === dotIndex ? 32 : 8);
    const backgroundColor = useTransform(activeIndex, (val) => val === dotIndex ? "var(--accent-gold)" : "var(--glass-border)");
    const boxShadow = useTransform(activeIndex, (val) => val === dotIndex ? "0 0 10px rgba(201,168,76,0.5)" : "none");

    return (
      <motion.div 
        className="h-2 rounded-full transition-all duration-300"
        style={{ width, backgroundColor, boxShadow }}
      />
    );
  };
  
  // The section is 300vh tall to allow scrolling space.
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to horizontal translation (from 0 to -200vw for 3 panels)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6666%"]);
  
  // Calculate which panel is currently active based on scroll (0, 1, or 2)
  const activeIndex = useTransform(scrollYProgress, (val) => {
    if (val < 0.33) return 0;
    if (val < 0.66) return 1;
    return 2;
  }) as MotionValue<number>;

  const activeDisplay = useTransform(activeIndex, (val) => `0${val + 1}`);

  const panels = [
    {
      num: "01",
      tag: "KHALIFA UNIVERSITY · AUG 2025 – DEC 2025",
      title: "Peer Mentor\nfor Freshmen",
      desc: "Guided incoming Computer Engineering students through their first semester at Khalifa University. Facilitated weekly check-ins, academic workshops, and peer study groups to ease the transition into university life.",
      skills: ["Mentorship", "Communication", "Leadership", "Education"]
    },
    {
      num: "02",
      tag: "EMIRCOM LLC · 2025 · 1-MONTH INTENSIVE",
      title: "Cybersecurity\n& AI Intern",
      desc: "Embedded within an enterprise environment, gaining hands-on exposure to cybersecurity infrastructure, threat analysis pipelines, and AI-driven security solutions at scale.",
      skills: ["Cybersecurity", "AI Solutions", "Enterprise Systems", "Analysis"]
    },
    {
      num: "03",
      tag: "ACHIEVEMENTS & COMPETITIONS",
      title: "Competitor\n& Innovator",
      desc: "Actively competing across innovation, security, and robotics challenges — pushing ideas into real prototypes.",
      isList: true,
      skills: ["🥇 Winner — EDGE Innovation Competition (2025)", "🛡️ KUCSC National CTF Participant", "🤖 KUEC Robothon Competitor"]
    }
  ];

  return (
    <section ref={targetRef} className="relative bg-[--bg-void] flex flex-col items-center">
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: '-60px' }}
        className="section-heading-wrapper px-[6vw] lg:px-[10vw] max-w-[1400px] w-full mx-auto"
      >
        <h2 className="section-heading">Experience</h2>
      </motion.div>

      {/* Driver Container */}
      <div className="w-full relative" style={{ height: "300vh" }}>
        {/* Sticky Inner Container */}
        <div className="sticky top-0 h-screen overflow-hidden flex items-center w-full">
        
        {/* Track */}
        <motion.div style={{ x }} className="flex w-[300vw] h-full items-center">
          
          {panels.map((panel, i) => (
            <div key={i} className="w-screen h-full flex flex-col justify-center px-[8vw] lg:px-[12vw] relative">
              
              {/* Massive faint background number */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-display font-black text-white/[0.02] pointer-events-none select-none z-0">
                {panel.num}
              </div>

              {/* Glowing left line */}
              <div className="absolute left-[4vw] lg:left-[8vw] top-1/3 bottom-1/3 w-[2px] bg-[--glass-border] z-10">
                <div className="w-full h-1/3 bg-[--accent-cyan] shadow-[0_0_15px_var(--accent-cyan)] rounded-full absolute top-1/3" />
              </div>

              {/* Panel Content (Centered, offset left slightly over the number) */}
              <div className="relative z-20 max-w-3xl ml-4 lg:ml-12 pl-6 lg:pl-10">
                <span className="font-display text-[--accent-gold] text-xs tracking-[0.2em] uppercase mb-8 block">
                  {panel.tag}
                </span>
                
                <h2 className="text-[clamp(3rem,6vw,6rem)] leading-[0.9] font-display font-bold text-[--text-primary] mb-10 whitespace-pre-wrap tracking-tight">
                  {panel.title}
                </h2>
                
                <p className="text-[clamp(1.1rem,1.5vw,1.5rem)] leading-[1.6] font-light text-[--text-muted] mb-12 max-w-2xl">
                  {panel.desc}
                </p>

                {panel.isList ? (
                   <ul className="space-y-4">
                     {panel.skills.map((skill, j) => (
                       <li key={j} className="text-lg text-[--text-primary] font-light tracking-wide flex items-center gap-4">
                         {skill}
                       </li>
                     ))}
                   </ul>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {panel.skills.map((skill, j) => (
                      <span key={j} className="text-sm font-display uppercase tracking-widest text-[--text-primary] border-b border-[--glass-border] pb-1 mr-4">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

        </motion.div>

        {/* Global sticky UI overlay for the horizontal scroller */}
        
        {/* Navigation Dots (Visual only for scroll indication based on activeIndex) */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-4 z-40">
          {[0,1,2].map((dotIndex) => (
            <DotIndicator key={dotIndex} activeIndex={activeIndex} dotIndex={dotIndex} />
          ))}
        </div>

        {/* Scroll Position Indicator */}
        <div className="absolute bottom-16 right-[8vw] z-40 text-[--text-muted] font-display text-sm tracking-[0.3em] font-light">
          <motion.span className="text-[--text-primary]">
            {activeDisplay}
          </motion.span> 
          <span className="opacity-50 mx-2">/</span> 
          03
        </div>

        </div>

      </div>
    </section>
  );
}
