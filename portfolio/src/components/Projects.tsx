import { cn } from "@/lib/utils";

const projects = [
  {
    id: 1,
    title: "Ethereal UI",
    description: "A comprehensive design system built with Radix and Tailwind CSS.",
    tags: ["React", "TypeScript", "Tailwind"],
    link: "#",
  },
  {
    id: 2,
    title: "Nova Engine",
    description: "High-performance WebGL rendering engine for creative coding.",
    tags: ["Three.js", "WebGL", "GLSL"],
    link: "#",
  },
  {
    id: 3,
    title: "Aura Dashboard",
    description: "Real-time analytics dashboard with fluid layout animations.",
    tags: ["Next.js", "Framer Motion", "tRPC"],
    link: "#",
  },
  {
    id: 4,
    title: "Zenith Store",
    description: "Headless e-commerce template with instantaneous page transitions.",
    tags: ["Shopify", "React", "Remix"],
    link: "#",
  },
];

export default function Projects() {
  return (
    <section className="relative z-30 min-h-screen bg-[#121212] py-24 px-8 md:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-white mb-4">Selected Work</h2>
          <p className="text-white/60 text-lg max-w-2xl">
            A diverse collection of digital products, experimental interfaces, and robust systems 
            crafted with precision and a deep appreciation for motion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project) => (
            <a 
              key={project.id}
              href={project.link}
              className={cn(
                "group relative overflow-hidden rounded-2xl p-8 transition-all duration-500",
                "bg-white/5 border border-white/10 backdrop-blur-md",
                "hover:bg-white-[0.07] hover:border-white/20 hover:shadow-[0_0_40px_-15px_rgba(255,255,255,0.1)]"
              )}
            >
              {/* Subtle hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-auto">
                  <h3 className="text-2xl font-semibold text-white mb-3 tracking-tight group-hover:text-blue-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-white/80 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
