import Cursor from "@/components/ui/cursor";
import {SoftwareHeader} from "@/app/software-engineering/components/header-software";
import HeroSoftware from "@/app/software-engineering/components/hero-software";
import ResumeSoftware from "@/app/software-engineering/components/resume-software";
import ExperienceSoftware from "@/app/software-engineering/components/software-experience";
import ProjectsSoftware from "@/app/software-engineering/components/software-projects";

export default function Home() {
    return (
        <>
            <Cursor/>
            <SoftwareHeader/>
            <HeroSoftware/>
            <ResumeSoftware/>
            <ExperienceSoftware/>
            <ProjectsSoftware/>
        </>

    );
}