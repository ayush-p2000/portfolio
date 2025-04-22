import {DataHeader} from "@/app/data-scientist/components/header-data-portfolio";
import HeroData from "@/app/data-scientist/components/hero-data";
import ResumeSection from "@/app/data-scientist/components/resume-section";
import ExperienceSection from "@/app/data-scientist/components/experience-data";
import ProjectsSection from "@/app/data-scientist/components/projects-data";

export default function Home() {
    return (
        <>
                    <DataHeader />
                    <HeroData />
                    <ResumeSection />
                    <ExperienceSection />
                    <ProjectsSection />
        </>
    )
}