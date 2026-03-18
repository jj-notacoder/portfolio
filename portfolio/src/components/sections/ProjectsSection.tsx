'use client';

import { motion, Variants } from 'framer-motion';
// We'll use simple text/emoji for icons to avoid extra dependencies if not requested, but the prompt asked for "Icon + text"

export default function ProjectsSection() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const projects = [
    {
      num: "01",
      name: "MANARA",
      cat: "AI Travel & Logistics System",
      desc: "An intelligent travel planning and logistics optimization platform powered by AI, designed to streamline complex multi-leg journeys and resource allocation.",
      stack: ["Python", "AI/ML", "React"],
      links: [{ label: "GitHub ↗", url: "#" }]
    },
    {
      num: "02",
      name: "CAMPUS RUNNER",
      cat: "Mobile · Campus Utility",
      desc: "A campus delivery and errand management application built to connect students and streamline on-campus logistics.",
      stack: ["React Native", "Node.js", "MongoDB"],
      links: [{ label: "GitHub ↗", url: "#" }]
    },
    {
      num: "03",
      name: "WORKSYNC",
      cat: "Productivity · SaaS",
      desc: "A collaborative workspace synchronization tool designed to bridge communication gaps across distributed teams.",
      stack: ["JavaScript", "SQL", "Express"],
      links: [{ label: "GitHub ↗", url: "#" }]
    },
    {
      num: "04",
      name: "IMFHI WEBSITE",
      cat: "Full-Stack Web Development",
      desc: "A fully responsive, full-stack web platform developed for the IMFHI Church community — featuring event management, announcements, and congregation engagement tools.",
      stack: ["HTML", "CSS", "JS", "Firebase"],
      links: [{ label: "GitHub ↗", url: "#" }, { label: "Live ↗", url: "#" }]
    }
  ];

  return (
    <section className="relative w-full min-h-[100vh] flex flex-col justify-center py-32 px-[8vw] z-10">
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16"
      >
        <span className="font-display text-[--accent-cyan] text-sm tracking-[0.2em] uppercase">The Arsenal</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-[--text-primary] mt-4">Selected Works.</h2>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full group/grid"
      >
        {projects.map((proj, i) => (
          <motion.div 
            key={i} 
            variants={itemVariants}
            className="group/card relative rounded-[20px] transition-all duration-500 hover:scale-[1.02] hover:z-20"
          >
            {/* The sibling dimming effect */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/grid:opacity-100 group-hover/card:!opacity-0 transition-opacity duration-300 pointer-events-none z-30 rounded-[20px]" />
            
            {/* Conic Gradient Glow Wrapper */}
            <div className="conic-border-glow h-full">
              <div className="glass-card relative h-full p-10 flex flex-col justify-between overflow-hidden z-10">
                
                {/* Number & Category */}
                <div className="flex justify-between items-start mb-12">
                  <span className="font-display text-4xl font-light text-[--glass-border]">{proj.num}</span>
                  <span className="text-xs uppercase tracking-widest text-[--accent-gold]">{proj.cat}</span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-display text-3xl font-bold text-[--text-primary] tracking-tight mb-4 group-hover/card:text-[--accent-cyan] transition-colors">
                    {proj.name}
                  </h3>
                  <p className="text-[--text-muted] font-light leading-relaxed mb-8">
                    {proj.desc}
                  </p>
                  
                  {/* Stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {proj.stack.map((tech, j) => (
                      <span key={j} className="text-xs font-mono text-[--text-muted] px-3 py-1 bg-white/5 rounded-full border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    {proj.links.map((link, j) => (
                      <a 
                        key={j} 
                        href={link.url}
                        className="text-sm font-display tracking-widest uppercase text-[--text-primary] hover:text-[--accent-gold] transition-colors border-b border-transparent hover:border-[--accent-gold] pb-1"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
