'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useAnimation, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { IoMdPaperPlane } from 'react-icons/io'
import {
    FaReact, FaNodeJs, FaPython, FaPhp, FaJira, FaDatabase
} from 'react-icons/fa'
import {
    SiJavascript
} from 'react-icons/si'
// import { TbBrandStreamlit } from 'react-icons/tb'
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

const ExperienceItem: React.FC<ExperienceItemProps> = ({
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
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });
    const controls = useAnimation();
    const [isHovered, setIsHovered] = useState(false);

    // Certificate badges for select experiences
    const hasCertificate = index === 0 || index === 2;
    const certificateText = index === 0 ? "SQL Certified" : "React Expert";

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    const variants = {
        hidden: {
            opacity: 0,
            x: isRight ? 100 : -100
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.15,
                duration: 0.8
            }
        }
    };

    // Dynamic background gradient based on color
    const bgGradient = `linear-gradient(145deg, ${color}05, ${color}15)`;

    return (
        <div ref={ref} className={`flex w-full ${isRight ? 'justify-end' : 'justify-start'} mb-8`}>
            <motion.div
                className={`relative w-full md:w-5/6 lg:w-2/3 ${isRight ? 'md:ml-12' : 'md:mr-12'} bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-300 ${isActive ? 'ring-2 ring-offset-4 ring-offset-white dark:ring-offset-gray-900' : ''}`}
                style={{
                    borderColor: isActive || isHovered ? color : '',
                    boxShadow: isHovered ? `0 10px 25px -5px ${color}40` : '',
                    background: isActive ? bgGradient : ''
                }}
                initial="hidden"
                animate={controls}
                variants={variants}
                whileHover={{
                    y: -5,
                    boxShadow: `0 15px 30px -5px ${color}40`
                }}
                onClick={onClick}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                {/* Company logo */}
                <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg border-2"
                     style={{ borderColor: color }}>
                    {logo ? (
                        <Image
                            src={logo}
                            alt="Company logo"
                            width={40}
                            height={40}
                            className="rounded-full object-contain"
                        />
                    ) : (
                        <div className="text-2xl font-bold flex items-center justify-center w-full h-full rounded-full"
                             style={{ color }}>
                            {company.charAt(0)}
                        </div>
                    )}
                </div>

                {/* Certificate badge */}
                {hasCertificate && (
                    <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 text-xs font-bold shadow-lg rounded-full px-3 py-1 border-2 flex items-center gap-1"
                         style={{ borderColor: color, color }}>
                        {index === 2 && <FaReact className="mr-1" />}
                        {certificateText}
                    </div>
                )}

                <div className="flex flex-col">
                    <div className="flex justify-between items-start">
                        <div>
                            <motion.h3
                                className="text-2xl font-bold text-gray-800 dark:text-white mb-1"
                                animate={{ color: isHovered ? color : '' }}
                                transition={{ duration: 0.3 }}
                            >
                                {company}
                            </motion.h3>
                            <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">{position}</h4>
                            <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-400 mb-4 gap-2">
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {period}
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {location}
                                </div>
                            </div>
                        </div>
                        <motion.div
                            className="text-gray-400"
                            animate={{
                                rotate: isActive ? 180 : 0,
                                color: isActive ? color : ''
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {isActive ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
                        </motion.div>
                    </div>

                    <AnimatePresence>
                        {isActive && (
                            <motion.div
                                className="overflow-hidden"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{
                                    height: 'auto',
                                    opacity: 1,
                                    transition: {
                                        height: { duration: 0.4 },
                                        opacity: { duration: 0.2, delay: 0.2 }
                                    }
                                }}
                                exit={{
                                    height: 0,
                                    opacity: 0,
                                    transition: {
                                        height: { duration: 0.3 },
                                        opacity: { duration: 0.1 }
                                    }
                                }}
                            >
                                <div className="w-full h-1 my-4 relative overflow-hidden rounded-full"
                                     style={{ backgroundColor: `${color}20` }}>
                                    <div className="absolute top-0 left-0 h-full w-1/3 rounded-full"
                                         style={{ backgroundColor: color }} />
                                </div>

                                <ul className="space-y-3 pl-5">
                                    {description.map((item, idx) => (
                                        <motion.li
                                            key={idx}
                                            className="relative text-gray-700 dark:text-gray-300 mb-2 pl-5"
                                            initial={{ x: -10, opacity: 0 }}
                                            animate={{
                                                x: 0,
                                                opacity: 1,
                                                transition: {
                                                    delay: idx * 0.1,
                                                    type: "spring",
                                                    stiffness: 300
                                                }
                                            }}
                                            whileHover={{
                                                x: 5,
                                                transition: { type: "spring", stiffness: 200 }
                                            }}
                                        >
                                            <span className="absolute left-0 top-[0.6em] w-2 h-2 rounded-full"
                                                  style={{ backgroundColor: color }} />
                                            {item}
                                        </motion.li>
                                    ))}
                                </ul>

                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Key Skills Used:</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {index === 0 && (
                                            <>
                                                <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                                                     style={{ backgroundColor: `${color}20`, color }}>
                                                    <FaDatabase /> SQL
                                                </div>
                                                <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                                                     style={{ backgroundColor: `${color}20`, color }}>
                                                    <FaPython /> Python
                                                </div>
                                                <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                                                     style={{ backgroundColor: `${color}20`, color }}>
                                                    <CgInfinity /> CI/CD
                                                </div>
                                            </>
                                        )}
                                        {index === 1 && (
                                            <>
                                                <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                                                     style={{ backgroundColor: `${color}20`, color }}>
                                                    <FaPhp /> PHP
                                                </div>
                                                <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                                                     style={{ backgroundColor: `${color}20`, color }}>
                                                    <FaDatabase /> MySQL
                                                </div>
                                                <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                                                     style={{ backgroundColor: `${color}20`, color }}>
                                                    <SiJavascript /> JavaScript
                                                </div>
                                            </>
                                        )}
                                        {index === 2 && (
                                            <>
                                                <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                                                     style={{ backgroundColor: `${color}20`, color }}>
                                                    <FaReact /> React
                                                </div>
                                                <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                                                     style={{ backgroundColor: `${color}20`, color }}>
                                                    <SiJavascript /> JavaScript
                                                </div>
                                                <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                                                     style={{ backgroundColor: `${color}20`, color }}>
                                                    <FaNodeJs /> Node.js
                                                </div>
                                            </>
                                        )}
                                        {index === 3 && (
                                            <>
                                                <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                                                     style={{ backgroundColor: `${color}20`, color }}>
                                                    <FaJira /> Team Collaboration
                                                </div>
                                                <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                                                     style={{ backgroundColor: `${color}20`, color }}>
                                                    <IoMdPaperPlane /> Communication
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default function ExperienceSoftware() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const experiences: Experience[] = [
        {
            company: "Wipro Technologies",
            position: "Systems Engineer",
            period: "Feb 2023 - Aug 2023",
            location: "Coimbatore, India",
            description: [
                "Managed SQL databases (MSSQL and Oracle) on RedHat Linux systems, ensuring data integrity and high performance.",
                "Developed Python scripts for automating data extraction and transformation, improving efficiency by 35%.",
                "Resolved client issues via ServiceNow and improved ticket assignment processes.",
                "Implemented CI/CD pipelines and automated unit tests to enhance deployment reliability.",
                "Collaborated in Agile teams using Jira and Scrum, contributing to timely project delivery."
            ],
            color: "#3b82f6",
            logo: "/wipro.png"
        },
        {
            company: "TATA Robins Frasers Limited",
            position: "Web Developer Intern",
            period: "Jan 2022 - Mar 2022",
            location: "Jamshedpur, India",
            description: [
                "Assisted in web development using PHP, MySQL, HTML, and CSS for internal content management systems.",
                "Integrated WordPress and Drupal, enhancing the content publishing workflow.",
                "Provided cross-functional technical support, resolving front-end and back-end issues.",
                "Documented system changes and codebase enhancements for future scalability.",
                "Participated in Agile meetings and utilized Git for version control."
            ],
            color: "#10b981",
            logo: "/trf-logo.png"
        },
        {
            company: "LetsGrowMore",
            position: "Web Developer Intern",
            period: "Nov 2021 - Dec 2021",
            location: "Remote",
            description: [
                "Developed modular and reusable React components following best practices.",
                "Built interactive user interfaces and integrated REST APIs to fetch dynamic data.",
                "Implemented responsive layouts using CSS Flexbox and Grid for cross-device compatibility.",
                "Improved performance and usability of components with state management and lifecycle hooks.",
                "Collaborated with mentors and peers in weekly reviews, applying feedback to enhance UI consistency and accessibility."
            ],
            color: "#f59e0b",
            logo: "/lgm.jpg"
        },
        {
            company: "McDonald's",
            position: "Customer Care Assistant",
            period: "Dec 2023 - Present",
            location: "Sheffield, UK",
            description: [
                "Provided high-quality customer service in a fast-paced environment.",
                "Resolved complaints effectively, boosting customer satisfaction and retention.",
                "Maintained cleanliness and followed operational procedures across multiple roles.",
                "Collaborated with team members for efficient restaurant functioning.",
                "Onboarded and trained new employees on standard operating procedures."
            ],
            color: "#8b5cf6",
            logo: "/mcd.png"
        }
    ];

    const toggleExperience = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <section
            ref={ref}
            className="relative w-full min-h-screen overflow-hidden py-24"
            id="experience"
        >
            <motion.div
                className="absolute top-0 left-0 right-0 bottom-0 z-[-2] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:from-indigo-800 dark:via-purple-900 dark:to-blue-900"
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                    duration: 10,
                    ease: "linear",
                    repeat: Infinity,
                }}
            />
            <div className="container mx-auto px-6 relative">
                <motion.div
                    className="text-center mb-16"
                    style={{ opacity, scale, y }}
                >
                    <motion.h2
                        className="text-5xl md:text-6xl lg:text-7xl mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        Professional Journey
                    </motion.h2>
                    <motion.p
                        className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl py-5 mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        My career path with diverse experiences that shaped my skills
                    </motion.p>
                </motion.div>

                <div className="relative">
                    {/* Experience Items */}
                    <div className="space-y-6">
                        {experiences.map((exp, index) => (
                            <ExperienceItem
                                key={index}
                                company={exp.company}
                                position={exp.position}
                                period={exp.period}
                                location={exp.location}
                                description={exp.description}
                                index={index}
                                isRight={index % 2 === 0}
                                isActive={activeIndex === index}
                                onClick={() => toggleExperience(index)}
                                logo={exp.logo}
                                color={exp.color}
                            />
                        ))}
                    </div>

                    {/* Footer */}
                    <motion.div
                        className="flex flex-col items-center justify-center mt-16 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                    >
                        <div className="w-24 h-24 mb-6 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-4xl font-bold shadow-xl">
                            <FaReact />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Ready for New Challenges</h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                            Looking for opportunities to apply my diverse skill set and create impactful solutions
                        </p>
                        <Link href={'/contact'}>
                        <Button
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg cursor-pointer font-medium shadow-lg transition-all duration-300 flex items-center gap-2"
                        >

                            <span>Get in Touch</span>
                            <IoMdPaperPlane />

                        </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}