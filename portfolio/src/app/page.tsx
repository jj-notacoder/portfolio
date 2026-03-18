import ScrollyCanvas from "@/components/ScrollyCanvas";

// Phase 3 Sections
import SectionA_About from "@/components/sections/SectionA_About";
import SectionB_Experience from "@/components/sections/SectionB_Experience";
import SectionC_Projects from "@/components/sections/SectionC_Projects";
import SectionD_Impact from "@/components/sections/SectionD_Impact";
import SectionE_Contact from "@/components/sections/SectionE_Contact";

export default function Home() {
  return (
    <main className="bg-[#050508] min-h-screen selection:bg-[#4ECDC4]/30">
      {/* Phase 2: The Cinematic Video Scroll Zone (0-500vh) */}
      <ScrollyCanvas frameCount={192} />

      {/* Phase 3: Standard Scroll Sections */}
      <div className="relative z-30 bg-[#050508]">
        <SectionA_About />
        <SectionB_Experience />
        <SectionC_Projects />
        <SectionD_Impact />
        <SectionE_Contact />
      </div>
    </main>
  );
}
