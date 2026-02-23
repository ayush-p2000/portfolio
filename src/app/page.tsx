"use client";

import Cursor from "@/components/ui/cursor";
import ParallaxHero from "@/components/hero-section";
import ProfessionalSummary from "@/components/professional-summary";
import Skills from "@/components/skills";
import { HeroHeader } from "@/components/hero8-header";
import Education from "@/components/education";
import UnifiedExperience from "@/components/unified-experience";
import UnifiedProjects from "@/components/unified-projects";

export default function Home() {
  return (
    <>
      <Cursor />
      <ParallaxHero />
      <ProfessionalSummary />
      <Skills />
      <Education />
      <UnifiedExperience />
      <UnifiedProjects />
    </>

  );
}
