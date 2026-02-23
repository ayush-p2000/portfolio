'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useAnimation, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { FiChevronDown, FiChevronUp, FiAward, FiExternalLink } from 'react-icons/fi'
import { IoMdPaperPlane } from 'react-icons/io'
import { FaDatabase, FaChartBar, FaBrain, FaCloud, FaPython } from 'react-icons/fa'
import { SiTableau, SiApacheairflow, SiScikitlearn, SiPandas, SiMysql } from 'react-icons/si'
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
    color: string;
}

interface Experience {
    company: string;
    position: string;
    period: string;
    location: string;
    description: string[];
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
                                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white dark:bg-neutral-800 p-2 shadow-inner border border-neutral-100 dark:border-neutral-700 flex items-center justify-center font-black text-2xl" style={{ color }}>
                                    {company.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl lg:text-2xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                                        {company}
                                    </h3>
                                    <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm lg:text-base">{position}</p>
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
                                <CgInfinity className="text-lg" /> SKILLS:
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {company === "Wipro Technologies" && (
                                    <>
                                        <SkillBadge icon={<FaPython />} text="Python" color={color} />
                                        <SkillBadge icon={<SiMysql />} text="SQL" color={color} />
                                        <SkillBadge icon={<CgInfinity />} text="CI/CD" color={color} />
                                    </>
                                )}
                                {company === "Onlei Technologies" && (
                                    <>
                                        <SkillBadge icon={<FaBrain />} text="Scikit-Learn" color={color} />
                                        <SkillBadge icon={<SiTableau />} text="Tableau" color={color} />
                                        <SkillBadge icon={<FaChartBar />} text="Power BI" color={color} />
                                        <SkillBadge icon={<SiApacheairflow />} text="Airflow" color={color} />
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

const FloatingSkill: React.FC<{ skill: string, icon: React.ReactNode, delay: number, x: [string, string], y: [string, string] }> = ({ skill, icon, delay, x, y }) => {
    return (
        <motion.div
            className="absolute pointer-events-auto bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md text-emerald-600 dark:text-emerald-400 rounded-full px-4 py-2 text-xs font-bold shadow-xl flex items-center gap-2 border border-white/20 dark:border-neutral-800/50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1.2, 1, 0.8],
                x: x,
                y: y,
            }}
            transition={{
                duration: 20,
                delay: delay,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "linear"
            }}
            whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
        >
            <span className="text-base">{icon}</span>
            {skill}
        </motion.div>
    );
}

export default function ExperienceSection() {
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
            company: "Wipro Technologies",
            position: "Systems Engineer",
            period: "07/2022 - 08/2023",
            location: "Coimbatore, India",
            description: [
                "Managed SQL databases (MSSQL and Oracle) on RedHat Linux systems, ensuring data integrity and high performance.",
                "Developed Python scripts for automating data extraction and transformation, improving efficiency by 35%.",
                "Resolved client issues via ServiceNow and improved ticket assignment processes.",
                "Implemented CI/CD pipelines and automated unit tests to enhance deployment reliability.",
                "Collaborated in Agile teams using Jira and Scrum, contributing to timely project delivery."
            ],
            color: "#3b82f6"
        },
        {
            company: "Onlei Technologies",
            position: "Data Science Intern",
            period: "12/2022 - 06/2023",
            location: "Noida, India",
            description: [
                "Developed automated ETL pipelines using Pandas, SQL, and Airflow, reducing data refresh times by 40%.",
                "Built dynamic dashboards with Power BI and Tableau, visualizing key performance indicators for improved decision-making.",
                "Implemented machine learning models using Scikit-learn for predictive analytics, achieving 85% accuracy in forecasting.",
                "Conducted data preprocessing, including data cleaning, feature engineering, and outlier detection, ensuring data quality.",
                "Deployed machine learning solutions using Streamlit Application via Tornado framework, enabling real-time predictions."
            ],
            color: "#10b981"
        },

    ];

    const floatingSkills: { name: string, icon: React.ReactNode, delay: number, x: [string, string], y: [string, string] }[] = [
        { name: "Python", icon: <FaPython />, x: ["-10vw", "10vw"], y: ["5vh", "40vh"], delay: 0 },
        { name: "SQL", icon: <SiMysql />, x: ["15vw", "-15vw"], y: ["20vh", "60vh"], delay: 2 },
        { name: "ML", icon: <FaBrain />, x: ["-20vw", "5vw"], y: ["30vh", "10vh"], delay: 4 },
        { name: "ETL", icon: <SiApacheairflow />, x: ["25vw", "0vw"], y: ["50vh", "20vh"], delay: 6 },
        { name: "Visualization", icon: <FaChartBar />, x: ["0vw", "-25vw"], y: ["15vh", "45vh"], delay: 8 },
        { name: "Pandas", icon: <SiPandas />, x: ["-5vw", "20vw"], y: ["40vh", "25vh"], delay: 10 },
        { name: "Clouds", icon: <FaCloud />, x: ["10vw", "-10vw"], y: ["25vh", "55vh"], delay: 12 },
    ];

    return (
        <section
            ref={containerRef}
            className="relative w-full pt-20 pb-24 scroll-mt-0"
            id="experience"
        >
            {/* Floating background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1] flex items-center justify-center">
                {floatingSkills.map((s, i) => (
                    <FloatingSkill key={i} skill={s.name} icon={s.icon} delay={s.delay} x={s.x} y={s.y} />
                ))}
            </div>

            <div className="container mx-auto px-6 relative">
                {/* Header Section */}
                <motion.div
                    className="flex flex-col items-center mb-24 md:mb-32"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-6">
                        <FiAward /> Professional Journey
                    </div>
                    <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-neutral-900 dark:text-white mb-6 tracking-tighter text-center">
                        Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 italic">Evolution</span>
                    </h2>
                    <p className="text-neutral-500 dark:text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto text-center leading-relaxed font-medium">
                        A narrative of data-driven problem solving, model architectural growth, and the pursuit of analytical excellence.
                    </p>
                </motion.div>

                <div className="relative max-w-6xl mx-auto">
                    <div className="relative">
                        {/* The Center Timeline Line */}
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-neutral-200 dark:bg-neutral-800 -translate-x-1/2">
                            <motion.div
                                className="absolute top-0 left-0 right-0 origin-top bg-gradient-to-b from-emerald-500 via-blue-500 to-transparent"
                                style={{ scaleY, height: '100%' }}
                            />
                            {/* Traveling Pulse */}
                            <motion.div
                                className="absolute top-0 left-[-4px] w-[10px] h-[100px] bg-gradient-to-b from-transparent via-emerald-400 to-transparent blur-[2px] opacity-70"
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
                                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
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
                                className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-white text-3xl shadow-xl">
                                <IoMdPaperPlane />
                            </div>
                        </div>

                        <h3 className="text-3xl font-bold dark:text-white mb-4 italic">The Next Data Challenge?</h3>
                        <p className="text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
                            I am actively seeking roles where I can build predictive systems and push the boundaries of AI & Data Science.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                            <Link href="/contact">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-10 py-6 text-lg font-bold shadow-2xl flex items-center gap-2">
                                        Hire Me <FiExternalLink className="text-sm" />
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