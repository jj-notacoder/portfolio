'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

export default function LeadershipSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const timelineData = [
    {
      role: "Peer Mentor for Freshmen",
      org: "Khalifa University",
      period: "Aug 2025 — Dec 2025",
      desc: "Guiding and supporting incoming Computer Engineering students through their academic and social transition to university life. Facilitating weekly check-ins, workshops, and study groups.",
      type: "card"
    },
    {
      role: "Cybersecurity & AI Intern",
      org: "Emircom LLC",
      period: "1-Month Intensive (2025)",
      desc: "Hands-on exposure to enterprise cybersecurity infrastructure and AI-driven security solutions in a professional environment.",
      type: "card"
    },
    {
      role: "Competitor & Innovator",
      bullets: [
        "🥇 Winner — EDGE Innovation Competition (2025)",
        "🛡️ KUCSC National CTF Participant",
        "🤖 KUEC Robothon Competitor"
      ],
      type: "list"
    }
  ];

  return (
    <section className="relative w-full min-h-[100vh] flex items-center justify-center py-32 px-[8vw] z-10" ref={containerRef}>
      <div className="max-w-4xl w-full relative flex">
        
        {/* The SVG Glowing Timeline */}
        <div className="absolute left-0 top-0 bottom-0 w-8 flex justify-center mt-12 mb-12">
          <svg className="w-full h-full" preserveAspectRatio="none">
            {/* Background passive line */}
            <line 
              x1="50%" y1="0" 
              x2="50%" y2="100%" 
              stroke="var(--glass-border)" 
              strokeWidth="2" 
            />
            {/* Animated glowing active line */}
            <motion.line 
              x1="50%" y1="0" 
              x2="50%" y2="100%" 
              stroke="url(#timeline-grad)" 
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              style={{ filter: 'drop-shadow(0 0 8px var(--accent-cyan))' }}
            />
            <defs>
              <linearGradient id="timeline-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-cyan)" />
                <stop offset="100%" stopColor="var(--accent-gold)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Timeline Content Nodes */}
        <motion.div 
          className="ml-16 md:ml-24 flex flex-col gap-16 w-full pt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {timelineData.map((item, i) => (
            <motion.div key={i} variants={itemVariants} className="relative glass-card p-8 group">
              {/* Connector line and glowing dot */}
              <div className="absolute top-[50%] -translate-y-1/2 -left-16 md:-left-24 w-16 md:w-24 h-[2px] bg-[--glass-border]">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[--bg-void] border-2 border-[--accent-cyan] shadow-[0_0_10px_var(--accent-cyan)] transition-transform duration-300 group-hover:scale-150" />
              </div>

              {item.type === "card" ? (
                <>
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-4">
                    <h3 className="text-xl md:text-2xl font-display font-medium text-[--text-primary]">{item.role}</h3>
                    <span className="text-[--accent-gold] text-sm tracking-[0.1em]">{item.org}</span>
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[--text-muted] mb-4">{item.period}</div>
                  <p className="text-[--text-muted] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-xl md:text-2xl font-display font-medium text-[--accent-cyan] mb-6">{item.role}</h3>
                  <ul className="space-y-4">
                    {item.bullets?.map((bull, j) => (
                      <li key={j} className="text-[--text-muted] font-light tracking-wide">{bull}</li>
                    ))}
                  </ul>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
