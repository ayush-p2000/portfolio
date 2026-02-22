"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp, FiCalendar, FiMapPin, FiTerminal, FiCode, FiShoppingBag, FiCoffee, FiSearch, FiLayers, FiGlobe } from "react-icons/fi";
import Image from "next/image";

interface ExperienceItemProps {
    company: string;
    position: string;
    period: string;
    location: string;
    description: string[];
    logo?: string;
    color: string;
    index: number;
    isRight: boolean;
    isActive: boolean;
    onClick: () => void;
    icon: any;
    logoBg?: "light" | "dark" | "none";
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
    company,
    position,
    period,
    location,
    description,
    logo,
    color,
    index,
    isRight,
    isActive,
    onClick,
    icon: Icon,
    logoBg = "none"
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [isHovered, setIsHovered] = useState(false);

    const getLogoBgClass = () => {
        if (logoBg === "light") return "bg-white border-neutral-200";
        if (logoBg === "dark") return "bg-neutral-900 border-neutral-800";
        return "bg-white dark:bg-neutral-800 border-neutral-100 dark:border-neutral-800";
    };

    return (
        <div
            ref={ref}
            className={`flex w-full ${isRight ? "justify-end" : "justify-start"} mb-12 relative`}
        >
            {/* Timeline Connector on Mobile */}
            <div className={`md:hidden absolute top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-800 left-8 -z-10`} />

            <motion.div
                className={`relative w-full md:w-[46%] bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md rounded-[2.5rem] p-8 border border-neutral-100 dark:border-neutral-800 cursor-pointer transition-all duration-500 ${isActive ? "shadow-2xl z-20" : "shadow-sm hover:shadow-xl"
                    }`}
                style={{
                    borderColor: isActive || isHovered ? color : ""
                }}
                initial={{ opacity: 0, x: isRight ? 60 : -60 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRight ? 60 : -60 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                onClick={onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Accent Glow */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-[2.5rem] pointer-events-none"
                    style={{ background: `radial-gradient(circle at top right, ${color}20, transparent)` }}
                />

                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-5">
                        <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm shrink-0 transition-transform duration-500 ${getLogoBgClass()}`}
                            style={{ scale: isHovered || isActive ? 1.1 : 1 }}
                        >
                            {logo ? (
                                <Image
                                    src={logo}
                                    alt={company}
                                    width={44}
                                    height={44}
                                    className="rounded-xl object-contain p-1"
                                />
                            ) : (
                                <Icon size={24} style={{ color: color }} />
                            )}
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-neutral-900 dark:text-white leading-tight">
                                {company}
                            </h3>
                            <p className="text-sm font-bold uppercase tracking-wider" style={{ color: color }}>
                                {position}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-5 text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-6">
                    <div className="flex items-center gap-2">
                        <FiCalendar className="text-neutral-400" />
                        <span>{period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiMapPin className="text-neutral-400" />
                        <span>{location}</span>
                    </div>
                </div>

                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                            className="overflow-hidden"
                        >
                            <ul className="space-y-4 text-neutral-600 dark:text-neutral-300 py-4 border-t border-neutral-100 dark:border-neutral-800">
                                {description.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="relative pl-6 text-sm leading-relaxed"
                                    >
                                        <div className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0.5 }}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400"
                    >
                        <span>Click to expand</span>
                        <FiChevronDown />
                    </motion.div>
                )}
            </motion.div>

            {/* Center Node for Desktop */}
            <div className="hidden md:flex absolute left-1/2 top-10 transform -translate-x-1/2 z-10 items-center justify-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                    className="w-5 h-5 rounded-full border-4 border-white dark:border-neutral-950 shadow-xl"
                    style={{ backgroundColor: color }}
                />
            </div>
        </div>
    );
};

interface ExperienceData {
    company: string;
    position: string;
    period: string;
    location: string;
    description: string[];
    logo?: string;
    color: string;
    icon: any;
    logoBg?: "light" | "dark" | "none";
}

const UnifiedExperience = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const experiences: ExperienceData[] = [
        {
            company: "Accenture",
            position: "Senior Software Engineer",
            period: "Aug 2025 - Present",
            location: "Kuala Lumpur, Malaysia (Hybrid)",
            icon: FiTerminal,
            description: [
                "Led the critical upgrade of client's core software from .NET Framework 4.5 to .NET 8, utilizing C#, ASP.NET MVC, and SQL Server to modernize legacy financial systems and enhance performance by 40%.",
                "Architecting migration strategies using Visual Studio, Jenkins CI/CD pipelines, and Bitbucket Git version control, ensuring zero-downtime deployment of mission-critical banking applications.",
                "Refactoring enterprise codebases with TypeScript, React.js, and LINQ optimization techniques while implementing Agile methodologies.",
                "Conducting thorough code reviews using SonarQube for quality assurance.",
                "Managing project workflows through Jira for sprint planning, task tracking, and team coordination.",
                "Collaborating with cross-functional teams to integrate cloud technologies, RESTful APIs, and modern JavaScript frameworks."
            ],
            color: "#A100FF",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/2560px-Accenture.svg.png",
            logoBg: "light"
        },
        {
            company: "Lidl GB",
            position: "Store Assistant",
            period: "May 2025 - Aug 2025",
            location: "Sheffield, UK",
            icon: FiShoppingBag,
            description: [
                "Delivered exceptional customer service in a high-volume retail environment.",
                "Maintained store standards and efficiency with a focus on high-performance operational metrics."
            ],
            color: "#0050AA",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Lidl-Logo.svg/2048px-Lidl-Logo.svg.png",
            logoBg: "light"
        },
        {
            company: "McDonald's",
            position: "Customer Care Assistant",
            period: "Dec 2023 - Jul 2025",
            location: "Sheffield, UK",
            icon: FiCoffee,
            description: [
                "Provided high-quality customer service in a fast-paced environment.",
                "Resolved complaints effectively, boosting customer satisfaction and retention.",
                "Maintained cleanliness and followed operational procedures across multiple roles.",
                "Collaborated with team members for efficient restaurant functioning and trained new staff."
            ],
            color: "#FFC72C",
            logo: "/mcd.png",
            logoBg: "light"
        },
        {
            company: "Wipro Technologies",
            position: "System Engineer",
            period: "Feb 2023 - Aug 2023",
            location: "Coimbatore, India",
            icon: FiCode,
            description: [
                "Managed SQL databases (MSSQL and Oracle) on Red Hat Linux systems, ensuring data integrity and high performance.",
                "Developed Python scripts for automating data extraction and transformation, improving efficiency by 35%.",
                "Resolved client issues via ServiceNow and improved ticket assignment processes.",
                "Implemented CI/CD pipelines and automated unit tests to enhance deployment reliability."
            ],
            color: "#3b82f6",
            logo: "/wipro.png",
            logoBg: "light"
        },
        {
            company: "Onlei Technologies",
            position: "Data Science Intern",
            period: "Dec 2022 - Jun 2023",
            location: "Remote",
            icon: FiSearch,
            description: [
                "Data Engineering and Analysis using Pandas and SQL.",
                "Machine Learning Model Training for predictive analytics.",
                "Data Visualization with Power BI and Business report development.",
                "Full Stack Application Development for Data Science Models."
            ],
            color: "#10b981",
            logo: "https://onleitechnologies.com/wp-content/uploads/2023/10/onlei-logo-for-dark-bg.png",
            logoBg: "none"
        },
        {
            company: "LetsGrowMore",
            position: "Web Developer",
            period: "Nov 2021 - Dec 2021",
            location: "Remote",
            icon: FiLayers,
            description: [
                "Developed modular and reusable React components following best practices.",
                "Built interactive user interfaces and integrated REST APIs to fetch dynamic data.",
                "Implemented responsive layouts using CSS Flexbox and Grid."
            ],
            color: "#ec4899",
            logo: "/lgm.jpg",
            logoBg: "light"
        },
        {
            company: "TATA Robins Fraser",
            position: "Web Developer",
            period: "Jan 2021 - Mar 2021",
            location: "Jamshedpur, India",
            icon: FiGlobe,
            description: [
                "Assisted in web development using PHP, MySQL, HTML, and CSS for internal content management systems.",
                "Implemented Agile methodologies and Scrum practices."
            ],
            color: "#f59e0b",
            logo: "https://trf.co.in/wp-content/uploads/2022/01/trf-logo.png",
            logoBg: "dark"
        }
    ];

    const toggleExperience = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="experience" className="min-h-screen flex flex-col justify-center pt-32 pb-24 bg-white dark:bg-neutral-950 relative overflow-hidden scroll-mt-0">
            <div className="container mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-neutral-900 dark:text-white">
                        Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Journey</span>
                    </h2>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        A timeline of my evolution across technical engineering, data intelligence, and professional growth.
                    </p>
                </motion.div>

                <div ref={ref} className="relative">
                    {/* Central Line for Desktop */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800 transform -translate-x-1/2" />
                    <motion.div
                        className="hidden md:block absolute left-1/2 top-0 w-px bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-x-1/2 origin-top"
                        style={{ height: "100%", scaleY }}
                    />

                    <div className="space-y-4">
                        {experiences.map((exp, index) => (
                            <ExperienceItem
                                key={index}
                                index={index}
                                {...exp}
                                isRight={index % 2 !== 0}
                                isActive={activeIndex === index}
                                onClick={() => toggleExperience(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UnifiedExperience;
