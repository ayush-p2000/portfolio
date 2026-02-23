import { DataHeader } from "@/app/data-scientist/components/header-data-portfolio";
import HeroData from "@/app/data-scientist/components/hero-data";
import ResumeSection from "@/app/data-scientist/components/resume-section";
import ExperienceSection from "@/app/data-scientist/components/experience-data";
import ProjectsSection from "@/app/data-scientist/components/projects-data";
import { SectionDivider } from "@/components/ui/section-divider";

export default function Home() {
    return (
        <main className="relative min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-500 overflow-hidden">
            <div className="relative z-10">
                <DataHeader />

                <section id="home" className="relative">
                    <HeroData />
                    <SectionDivider
                        type="curve"
                        color="fill-white/80 dark:fill-neutral-900/80"
                        backgroundColor="bg-transparent"
                        className="absolute bottom-0 z-10"
                    />
                </section>

                <section id="resume" className="relative bg-white/80 dark:bg-neutral-900/80 backdrop-blur-3xl pt-20">
                    <ResumeSection />
                    <SectionDivider
                        type="wave"
                        color="fill-neutral-50 dark:fill-neutral-900/50"
                        backgroundColor="bg-white/80 dark:bg-neutral-900/80"
                        className="absolute bottom-0 z-10"
                    />
                </section>

                <section id="experience" className="relative bg-neutral-50 dark:bg-neutral-900/50 py-20">
                    <ExperienceSection />
                    <SectionDivider
                        type="slant"
                        color="fill-white dark:fill-neutral-950"
                        backgroundColor="bg-neutral-50 dark:bg-neutral-900/50"
                        className="absolute bottom-0 z-10"
                    />
                </section>

                <section id="projects" className="relative bg-white dark:bg-neutral-950 py-20">
                    <ProjectsSection />
                </section>
            </div>
        </main>
    )
}