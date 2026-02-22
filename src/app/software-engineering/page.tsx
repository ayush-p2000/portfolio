import Cursor from "@/components/ui/cursor";
import { SoftwareHeader } from "@/app/software-engineering/components/header-software";
import HeroSoftware from "@/app/software-engineering/components/hero-software";
import ResumeSoftware from "@/app/software-engineering/components/resume-software";
import ExperienceSoftware from "@/app/software-engineering/components/software-experience";
import ProjectsSoftware from "@/app/software-engineering/components/software-projects";

export default function Home() {
    return (
        <main className="relative min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-hidden">
            {/* Unified Page-wide Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(30,58,138,0.1),transparent_50%)]" />
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-400/10 dark:bg-blue-600/5 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute top-[40%] -right-[10%] w-[35%] h-[35%] bg-purple-400/10 dark:bg-purple-600/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-indigo-400/10 dark:bg-indigo-600/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '4s' }} />
            </div>

            <div className="relative z-10">
                <Cursor />
                <SoftwareHeader />
                <HeroSoftware />
                <div className="space-y-0">
                    <ResumeSoftware />
                    <ExperienceSoftware />
                    <ProjectsSoftware />
                </div>
            </div>
        </main>
    );
}