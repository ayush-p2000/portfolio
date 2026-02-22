'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useAnimation, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { IoMdPaperPlane } from 'react-icons/io'
import {
    FaReact, FaNodeJs, FaPhp, FaJira, FaDatabase, FaExternalLinkAlt, FaAward, FaChartPie
} from 'react-icons/fa'
import {
    SiJavascript, SiDotnet, SiTypescript, SiDocker, SiJenkins, SiMysql, SiPython, SiTableau, SiApacheairflow
} from 'react-icons/si'
import { CgInfinity } from 'react-icons/cg'
import Link from "next/link";

interface ExperienceItemProps {
    company: string;
    position: string;
    period: string;
    location: string;
    description: string[];
    index: number;
    isRight: boolean;
    isActive: boolean;
    onClick: () => void;
    logo?: string;
    color: string;
}

interface Experience {
    company: string;
    position: string;
    period: string;
    location: string;
    description: string[];
    logo?: string;
    color: string;
}

const ExperienceCard: React.FC<ExperienceItemProps> = ({
    company,
    position,
    period,
    location,
    description,
    index,
    isRight,
    isActive,
    onClick,
    logo,
    color
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = (mouseX / width - 0.5) * 200;
        const yPct = (mouseY / height - 0.5) * 200;
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <div className={`flex w-full items-center mb-16 md:mb-24 lg:mb-32 ${isRight ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Timeline Node - Desktop Only */}
            <div className="hidden md:flex flex-col items-center justify-center relative w-12 h-12 z-10">
                <motion.div
                    className="w-4 h-4 rounded-full z-20"
                    style={{ backgroundColor: color, boxShadow: `0 0 15px ${color}` }}
                    whileInView={{ scale: [0.8, 1.2, 1] }}
                    viewport={{ once: false }}
                />
                <motion.div
                    className="absolute inset-0 rounded-full opacity-30"
                    style={{ backgroundColor: color }}
                    animate={{ scale: [1, 2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>

            {/* Spacer for Staggered Layout */}
            <div className="hidden md:block w-1/2 px-8 lg:px-16" />

            {/* Card Content */}
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="w-full md:w-1/2 pl-12 pr-4 md:px-8 lg:px-12"
                style={{
                    perspective: 1000,
                }}
                initial={{ opacity: 0, x: isRight ? -50 : 50, rotateY: isRight ? -10 : 10 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.div
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className={`relative overflow-hidden rounded-[2.5rem] p-6 lg:p-10 border border-white/20 dark:border-neutral-800/50 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl shadow-2xl transition-all duration-300 group ${isActive ? 'ring-2 ring-offset-4 dark:ring-offset-black' : ''}`}
                    onClick={onClick}
                >
                    {/* Brand Dynamic Background */}
                    <div
                        className="absolute top-0 right-0 w-64 h-64 blur-3xl rounded-full opacity-10 pointer-events-none -mr-32 -mt-32"
                        style={{ backgroundColor: color }}
                    />

                    <div className="flex flex-col gap-6" style={{ transform: "translateZ(50px)" }}>
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white dark:bg-neutral-800 p-2 shadow-inner border border-neutral-100 dark:border-neutral-700 flex items-center justify-center">
                                    {logo ? (
                                        <Image src={logo} alt={company} width={48} height={48} className="object-contain" />
                                    ) : (
                                        <span className="text-2xl font-black" style={{ color }}>{company.charAt(0)}</span>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-xl lg:text-2xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                                        {company}
                                    </h3>
                                    <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm lg:text-base">{position}</p>
                                </div>
                            </div>
                            <div className="text-right hidden sm:block">
                                <div className="px-3 py-1 bg-neutral-100 dark:bg-white/5 rounded-full text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                                    {period}
                                </div>
                                <div className="text-[10px] mt-1 text-neutral-400 italic">{location}</div>
                            </div>
                        </div>

                        {/* Description List */}
                        <motion.div
                            className="space-y-4"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.15,
                                        delayChildren: 0.4
                                    }
                                }
                            }}
                        >
                            {description.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    className="flex gap-3 items-start text-sm lg:text-base text-neutral-600 dark:text-neutral-300"
                                    variants={{
                                        hidden: { opacity: 0, x: isRight ? 20 : -20 },
                                        visible: { opacity: 1, x: 0 }
                                    }}
                                >
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                                    <p className="leading-relaxed">{item}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Interactive Footer */}
                        <motion.div
                            className="pt-6 border-t border-neutral-200/50 dark:border-neutral-700/50 flex flex-wrap gap-3 items-center"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.08,
                                        delayChildren: 0.8
                                    }
                                }
                            }}
                        >
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mr-2">
                                <CgInfinity className="text-lg" /> STACK:
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {company === "Accenture" && (
                                    <>
                                        <SkillBadge icon={<SiDotnet />} text=".NET 8" color={color} />
                                        <SkillBadge icon={<FaReact />} text="React" color={color} />
                                        <SkillBadge icon={<SiTypescript />} text="TS" color={color} />
                                        <SkillBadge icon={<FaDatabase />} text="SQL" color={color} />
                                    </>
                                )}
                                {company === "Wipro Technologies" && (
                                    <>
                                        <SkillBadge icon={<SiPython />} text="Python" color={color} />
                                        <SkillBadge icon={<SiMysql />} text="MSSQL" color={color} />
                                        <SkillBadge icon={<SiDocker />} text="Docker" color={color} />
                                        <SkillBadge icon={<SiJenkins />} text="CI/CD" color={color} />
                                    </>
                                )}
                                {company === "Onlei Technologies" && (
                                    <>
                                        <SkillBadge icon={<SiPython />} text="ML" color={color} />
                                        <SkillBadge icon={<SiTableau />} text="Tableau" color={color} />
                                        <SkillBadge icon={<FaChartPie />} text="Power BI" color={color} />
                                        <SkillBadge icon={<SiApacheairflow />} text="Airflow" color={color} />
                                    </>
                                )}
                                {company === "LetsGrowMore" && (
                                    <>
                                        <SkillBadge icon={<FaReact />} text="React" color={color} />
                                        <SkillBadge icon={<SiJavascript />} text="JS" color={color} />
                                        <SkillBadge icon={<SiTypescript />} text="Web Vitals" color={color} />
                                    </>
                                )}
                                {company === "TATA Robins Fraser" && (
                                    <>
                                        <SkillBadge icon={<FaPhp />} text="PHP" color={color} />
                                        <SkillBadge icon={<SiMysql />} text="MySQL" color={color} />
                                        <SkillBadge icon={<CgInfinity />} text="Git" color={color} />
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

const SkillBadge: React.FC<{ icon: React.ReactNode, text: string, color: string }> = ({ icon, text, color }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, scale: 0.5, y: 10 },
            visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
        }}
        className="flex items-center gap-1.5 border border-neutral-200/50 dark:border-neutral-700/50 px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105"
        style={{ backgroundColor: `${color}05`, color: color }}
    >
        <span className="text-neutral-400">{icon}</span>
        {text}
    </motion.div>
);

export default function ExperienceSoftware() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const experiences: Experience[] = [
        {
            company: "Accenture",
            position: "Senior Software Engineer",
            period: "Aug 2025 - Present",
            location: "Kuala Lumpur, Malaysia (Hybrid)",
            description: [
                "Driving architectural modernization of mission-critical banking systems from .NET Framework to .NET 8.",
                "Reducing system latency by 45% through high-concurrency optimization and database refactoring.",
                "Pioneering automated CI/CD workflows that slashed deployment windows from 6 hours to 45 minutes.",
                "Mentoring a cross-functional team of 5 developers in React.js and TypeScript best practices."
            ],
            color: "#A100FF",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/2560px-Accenture.svg.png"
        },
        {
            company: "Wipro Technologies",
            position: "System Engineer",
            period: "Feb 2023 - Aug 2023",
            location: "Coimbatore, India",
            description: [
                "Orchestrated large-scale SQL database migrations across RedHat Linux environments with zero data loss.",
                "Automated complex financial reporting engines using Python, saving 200+ manual hours per month.",
                "Maintained 99.9% uptime for core banking backend services through proactive monitoring and performance tuning.",
                "Implemented enterprise-grade security protocols for data-at-rest and data-in-transit."
            ],
            color: "#3b82f6",
            logo: "/wipro.png"
        },
        {
            company: "Onlei Technologies",
            position: "Data Science Intern",
            period: "Dec 2022 - Jun 2023",
            location: "Remote",
            description: [
                "Quantified business growth by building predictive models with 85%+ accuracy for customer churn.",
                "Streamlined data processing with Apache Airflow pipelines, handling 5TB+ of monthly traffic.",
                "Visualized $2M+ in potential revenue leakage for stakeholders via custom Power BI interactive dashboards.",
                "Simplified complex data findings into actionable C-suite executive summaries."
            ],
            color: "#10b981",
            logo: "https://onleitechnologies.com/wp-content/uploads/2023/10/onlei-logo-for-dark-bg.png"
        },
        {
            company: "LetsGrowMore",
            position: "Web Developer",
            period: "Nov 2021 - Dec 2021",
            location: "Remote",
            description: [
                "Curated a specialized UI library in React, increasing frontend developer productivity by 25%.",
                "Delivered sub-1s load times via advanced web vitals optimization and code splitting.",
                "Implemented OAuth2 authentication flows for secure user data management.",
                "Iterated on user feedback Loops using A/B testing to refine UI/UX flows."
            ],
            color: "#ec4899",
            logo: "/lgm.jpg"
        },
        {
            company: "TATA Robins Fraser",
            position: "Web Developer Intern",
            period: "Jan 2021 - Mar 2021",
            location: "Jamshedpur, India",
            description: [
                "Modernized internal CMS portals using PHP and MySQL, improving content update speed by 60%.",
                "Bridged communication gaps between legacy systems and modern web APIs.",
                "Established Git-based version control workflows for a distributed team of interns.",
                "Assisted in the documentation of architectural decisions for future system scalability."
            ],
            color: "#f59e0b",
            logo: "/trf-logo.png"
        }
    ];

    const toggleExperience = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen pt-40 pb-24 scroll-mt-0 dark:bg-black/20"
            id="experience"
        >
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
                <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative">
                {/* Header Section */}
                <motion.div
                    className="flex flex-col items-center mb-24 md:mb-32"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-widest mb-6">
                        <FaAward /> Professional Journey
                    </div>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-neutral-900 dark:text-white mb-6 tracking-tight text-center">
                        Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 italic">Evolution</span>
                    </h2>
                    <p className="text-neutral-500 dark:text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto text-center leading-relaxed">
                        A narrative of complex problem solving, architectural growth, and the pursuit of engineering excellence.
                    </p>
                </motion.div>

                <div className="relative max-w-6xl mx-auto">
                    <div className="relative">
                        {/* The Center Timeline Line */}
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-neutral-200 dark:bg-neutral-800 -translate-x-1/2">
                            <motion.div
                                className="absolute top-0 left-0 right-0 origin-top bg-gradient-to-b from-blue-500 via-purple-500 to-transparent"
                                style={{ scaleY, height: '100%' }}
                            />
                            {/* Traveling Pulse */}
                            <motion.div
                                className="absolute top-0 left-[-4px] w-[10px] h-[100px] bg-gradient-to-b from-transparent via-blue-400 to-transparent blur-[2px] opacity-70"
                                style={{
                                    top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                                    height: 150
                                }}
                            />
                        </div>

                        {/* Timeline Experience Cards */}
                        <div className="relative space-y-12">
                            {experiences.map((exp, index) => (
                                <ExperienceCard
                                    key={index}
                                    {...exp}
                                    index={index}
                                    isRight={index % 2 !== 0}
                                    isActive={activeIndex === index}
                                    onClick={() => toggleExperience(index)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Closing Section */}
                    <motion.div
                        className="flex flex-col items-center justify-center mt-32 text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative mb-8">
                            <motion.div
                                className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl shadow-xl">
                                <IoMdPaperPlane />
                            </div>
                        </div>

                        <h3 className="text-3xl font-bold dark:text-white mb-4 italic">The Next Milestone?</h3>
                        <p className="text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
                            I am actively seeking roles where I can architect robust systems and push the boundaries of what's possible in software engineering.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                            <Link href="/contact">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 py-6 text-lg font-bold shadow-2xl flex items-center gap-2">
                                        Hire Me <FaExternalLinkAlt className="text-sm" />
                                    </Button>
                                </motion.div>
                            </Link>

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    variant="outline"
                                    className="rounded-full px-10 py-6 text-lg font-bold border-neutral-200 dark:border-neutral-800 shadow-lg cursor-pointer"
                                    onClick={() => {
                                        const el = document.getElementById('projects');
                                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    View Projects
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
