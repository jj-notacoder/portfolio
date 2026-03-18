'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function ImpactSection() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  // We only want the counter to animate when it comes into view.
  // We'll use a local state variable triggered by `onViewportEnter`
  const handleViewportEnter = () => {
    animate(count, 122, {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1] // Easing function for a nice snap-then-slow settle
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itemVariants: any = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const engagements = [
    "Wheelchair Basketball World Championships — POD Volunteer",
    "ADNOC Marathon Series — Event Volunteer",
    "Dubai Cares — Education & Outreach Initiative"
  ];

  return (
    <section className="relative w-full min-h-[100vh] flex flex-col justify-center py-32 px-[12vw] z-10">
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        onViewportEnter={handleViewportEnter}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-5xl"
      >
        <span className="font-display text-[--text-muted] text-xs tracking-[0.2em] uppercase">Beyond The Code</span>
        
        <h2 className="text-5xl md:text-7xl font-display font-bold text-[--text-primary] mt-6 mb-16 leading-[1.1] tracking-tight">
          Community Impact<br/>
          <span className="text-[--accent-cyan]">& Leadership</span>
        </h2>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-16 md:gap-32">
          
          {/* Animated Counter */}
          <div className="flex flex-col items-start min-w-[200px]">
            <div className="flex items-baseline text-[--accent-gold] font-display font-medium">
              <motion.span className="text-[clamp(6rem,12vw,12rem)] leading-none tracking-tighter">
                {rounded}
              </motion.span>
              <span className="text-5xl md:text-7xl ml-2">+</span>
            </div>
            <span className="text-[--text-muted] uppercase tracking-widest text-sm mt-4 font-display">
              Volunteering Hours
            </span>
          </div>

          {/* Engagement List */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 space-y-8 border-l border-[--glass-border] pl-8 md:pl-16"
          >
            {engagements.map((item, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="flex items-start gap-4 pb-8 border-b border-[--glass-border] last:border-0 last:pb-0"
              >
                <span className="text-[--accent-cyan] text-xl mt-1 leading-none font-light">↳</span>
                <span className="text-lg md:text-xl text-[--text-primary] font-light tracking-wide">
                  {item}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </motion.div>

    </section>
  );
}
