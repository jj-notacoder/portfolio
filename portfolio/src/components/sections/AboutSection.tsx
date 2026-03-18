'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative w-full min-h-[100vh] flex items-center justify-center py-32 px-[8vw] z-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)]"
      >
        
        {/* Card 1 — Bio (Wide, Spans 8 cols) */}
        <motion.div 
          variants={itemVariants} 
          className="glass-card md:col-span-8 p-10 flex flex-col justify-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 opacity-10 blur-sm pointer-events-none transition-opacity duration-700 group-hover:opacity-20"
               style={{
                 backgroundImage: 'radial-gradient(circle at 100% 100%, var(--accent-cyan) 0%, transparent 50%)'
               }}
          />
          <h2 className="font-display text-[--accent-gold] text-sm tracking-[0.2em] uppercase mb-4">The Engineer</h2>
          <p className="text-[clamp(1.2rem,2vw,2rem)] leading-snug font-light text-[--text-primary]">
            Driven Computer Engineering student at Khalifa University,
            bridging the gap between hardware and software. Passionate about
            applying core engineering principles to solve real-world challenges
            across AI, cybersecurity, and embedded systems.
          </p>
        </motion.div>

        {/* Card 2 — Academics (Stacked Right, Spans 4 cols, row 1) */}
        <motion.div 
          variants={itemVariants} 
          className="glass-card md:col-span-4 p-8 flex flex-col justify-center gap-4"
        >
          <h2 className="font-display text-[--accent-cyan] text-sm tracking-[0.2em] uppercase mb-2">Academic Standing</h2>
          <ul className="text-[--text-muted] text-sm space-y-3 font-body">
            <li className="flex items-center gap-2"><span className="text-xl">🏆</span> President&apos;s List — Fall 2024</li>
            <li className="flex items-center gap-2"><span className="text-xl">🏆</span> President&apos;s List — Spring 2025</li>
            <li className="flex items-center gap-2 mt-4 pt-4 border-t border-[--glass-border]">
              <span className="w-1.5 h-1.5 rounded-full bg-[--accent-cyan]"></span>
              Expected Graduation: 2028
            </li>
            <li className="flex items-start gap-2 text-xs leading-relaxed opacity-60">
              Institution: Khalifa University of Science & Technology
            </li>
          </ul>
        </motion.div>

        {/* Card 3 — Tech Stack (Full Width Bottom, Row 2) */}
        <motion.div 
          variants={itemVariants} 
          className="glass-card md:col-span-12 p-8 flex flex-col gap-6"
        >
          <h2 className="font-display text-[--text-muted] text-sm tracking-[0.2em] uppercase">Arsenal</h2>
          <div className="flex flex-wrap gap-3">
            {[
              "Python", "Java", "SQL", "JavaScript", 
              "AI/ML Solutions", "Cybersecurity", "C/C++", "Linux"
            ].map((tech, i) => (
              <span 
                key={i} 
                className="glass-pill px-5 py-2 text-sm font-medium tracking-wide text-[--text-primary]"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
