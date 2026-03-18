'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function SectionD_Impact() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  const handleViewportEnter = () => {
    animate(count, 122, {
      duration: 2,
      ease: "easeOut"
    });
  };

  const engagements = [
    "Wheelchair Basketball World Championships — POD Volunteer",
    "ADNOC Marathon Series — Event Volunteer",
    "Dubai Cares — Education & Outreach Initiative"
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center bg-[#050508]">
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: '-60px' }}
        className="section-heading-wrapper px-[6vw] lg:px-[10vw] max-w-[1400px] w-full mx-auto"
      >
        <h2 className="section-heading">Volunteering</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        onViewportEnter={handleViewportEnter}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-4xl text-center flex flex-col items-center my-auto pb-32"
      >
        <span className="font-display text-[--text-muted] text-xs tracking-[0.2em] uppercase mb-8">
          Beyond The Code
        </span>
        
        {/* Animated Counter */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-baseline text-[--text-primary] font-display font-black">
            <motion.span className="text-[clamp(6rem,12vw,12rem)] leading-[0.85] tracking-tighter">
              {rounded}
            </motion.span>
            <span className="text-[clamp(3rem,6vw,6rem)] text-[--accent-cyan] ml-1">+</span>
          </div>
          <span className="text-[--text-muted] uppercase tracking-widest text-sm mt-6 font-display font-light">
            Volunteering Hours
          </span>
        </div>

        {/* Divider */}
        <div className="w-[80px] h-px bg-[--accent-gold] my-12" />

        {/* Engagement List */}
        <div className="flex flex-col gap-6 w-full items-center">
          {engagements.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 * i }}
              className="flex items-center gap-4 group"
            >
              <span className="text-[--accent-gold] text-xl font-light transform transition-transform group-hover:translate-x-1">↳</span>
              <span className="text-lg md:text-xl text-[--text-primary] font-light tracking-wide">
                {item}
              </span>
            </motion.div>
          ))}
        </div>

      </motion.div>

    </section>
  );
}
