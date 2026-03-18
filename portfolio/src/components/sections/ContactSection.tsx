'use client';

import { motion } from 'framer-motion';

export default function ContactSection() {
  const links = [
    { icon: "✉", label: "jesherku@gmail.com", url: "mailto:jesherku@gmail.com" },
    { icon: "📞", label: "+971 542 690 965", url: "tel:+971542690965" },
    { icon: "↗", label: "GitHub", url: "#" },
    { icon: "↗", label: "LinkedIn", url: "#" },
  ];

  return (
    <section className="relative w-full h-[100vh] flex flex-col justify-center items-center py-32 px-[8vw] z-10 text-center">
      
      {/* Massive heading */}
      <motion.h2 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-[clamp(4rem,8vw,10rem)] leading-[0.9] font-display font-black tracking-tight mb-16"
      >
        <span className="block text-shimmer mb-2">Let&apos;s Build</span>
        <span className="block text-[--text-muted]">Something</span>
        <span className="block text-[--accent-gold]">Extraordinary.</span>
      </motion.h2>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        className="w-48 h-px bg-[--glass-border] mb-16"
      />

      {/* Links */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 }}
        className="flex flex-wrap justify-center gap-4 md:gap-8 mb-auto"
      >
        {links.map((link, i) => (
          <a 
            key={i} 
            href={link.url}
            className="glass-pill flex items-center gap-3 px-6 py-3 rounded-full text-[--text-primary] text-sm tracking-widest font-display uppercase group"
          >
            <span className="text-[--accent-cyan] group-hover:text-[--accent-gold] transition-colors">{link.icon}</span>
            <span>{link.label}</span>
          </a>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-12 text-xs font-light text-[--text-muted] tracking-widest uppercase mt-32"
      >
        © 2026 Jesher Jebson · Crafted in Abu Dhabi, UAE
      </motion.div>

    </section>
  );
}
