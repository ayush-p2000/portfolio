'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useAnimation, useInView, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiChevronDown, FiChevronUp } from 'react-icons/fi'

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
}

interface SkillTagProps {
    skill: string;
    delay: number;
    x: [string, string];
    y: [string, string];
}

interface Experience {
    company: string;
    position: string;
    period: string;
    location: string;
    description: string[];
    logo?: string;
    color?: string;
}

interface Skill {
    name: string;
    x: [string, string];
    y: [string, string];
    delay: number;
    icon?: string;
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
                                                           onClick
                                                       }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });
    const controls = useAnimation();
    const [isHovered, setIsHovered] = useState(false);

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

    const colors = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899"];
    const color = colors[index % colors.length];

    return (
        <div ref={ref} className={`flex w-full ${isRight ? 'justify-end' : 'justify-start'} mb-8`}>
            <motion.div
                className={`relative w-full md:w-5/6 lg:w-2/3 ${isRight ? 'md:ml-12' : 'md:mr-12'} bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-300 ${isActive ? 'ring-2 ring-offset-4 ring-offset-white dark:ring-offset-gray-900' : ''}`}
                style={{
                    borderColor: isActive || isHovered ? color : '',
                    boxShadow: isHovered ? `0 10px 25px -5px ${color}40` : ''
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
                {/* Timeline dot and line */}
                <motion.div
                    className={`absolute top-8 ${isRight ? 'left-0 md:-left-6' : 'right-0 md:-right-6'} transform ${isRight ? '-translate-x-1/2' : 'translate-x-1/2'} w-4 h-4 rounded-full z-10`}
                    style={{ backgroundColor: color }}
                    animate={{
                        scale: isActive ? [1, 1.2, 1] : 1,
                        boxShadow: isActive ? `0 0 0 6px ${color}40` : 'none'
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: isActive ? Infinity : 0,
                        repeatType: "reverse"
                    }}
                />
                <div className={`absolute top-8 ${isRight ? 'left-0' : 'right-0'} h-full w-px bg-gray-300 dark:bg-gray-600 ${isRight ? '-translate-x-1/2' : 'translate-x-1/2'} -z-10`} />

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
                            animate={{ rotate: isActive ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isActive ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
                        </motion.div>
                    </div>

                    <AnimatePresence>
                        {isActive && (
                            <motion.ul
                                className="space-y-3 pl-5 overflow-hidden"
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
                                        <motion.span
                                            className="absolute left-0 top-[0.6em] w-2 h-2 rounded-full"
                                            style={{ backgroundColor: color }}
                                        />
                                        {item}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

const SkillTag: React.FC<SkillTagProps> = ({ skill, delay, x, y }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="absolute pointer-events-auto bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300 rounded-full px-4 py-2 text-sm font-medium shadow-lg flex items-center gap-2 cursor-pointer border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
                opacity: [0, 1, 1, 0],
                scale: isHovered ? [1.2, 1.3] : [0.5, 1.2, 1, 0.8],
                x: x,
                y: y,
                rotate: isHovered ? [0, 5, -5, 0] : 0,
                boxShadow: isHovered ? `0 5px 15px rgba(59, 130, 246, 0.4)` : 'none'
            }}
            transition={{
                duration: 15,
                delay: delay,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "linear"
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileTap={{ scale: 0.9 }}
        >
            {skill}
            {isHovered && <FiExternalLink size={14} />}
        </motion.div>
    );
};

export default function ExperienceSection() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });



    useEffect(() => {
        // Only generate random values on client side
        particles.current = Array.from({ length: 30 }).map(() => ({
            x: Math.random() * 100 + 'vw',
            y: Math.random() * 100 + 'vh',
            size: Math.random() * 10 + 5 + 'px',
            opacity: Math.random() * 0.5 + 0.1
        }));
    }, []);

    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const particles = useRef<Array<{x: string, y: string, size: string, opacity: number}>>([]);

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
                "Deployed machine learning solutions using Streamlit Application via Tornado framework, enabling real-time predictions.",
                "Ensured compliance with GDPR and other data protection standards while managing sensitive client information."
            ],
            color: "#10b981"
        },
        {
            company: "McDonald's",
            position: "Customer Care Assistant",
            period: "12/2023 - Present",
            location: "Sheffield, South Yorkshire",
            description: [
                "Delivered excellent customer service, handling customer inquiries, orders, and complaints in a fast-paced environment.",
                "Worked closely with team members to ensure efficient operations and timely food preparation.",
                "Managed customer issues and resolved them effectively, enhancing overall customer satisfaction.",
                "Quickly adapted to different roles, from cashiering to maintaining cleanliness, ensuring a smooth customer experience.",
                "Communicated effectively with customers and colleagues to maintain a positive dining experience.",
                "Trained new team members on company standards and operational procedures."
            ],
            color: "#8b5cf6"
        }
    ];

    const skills: Skill[] = [
        { name: "Python", x: ["-10vw", "10vw"], y: ["5vh", "40vh"], delay: 0, icon: "🐍" },
        { name: "SQL", x: ["15vw", "-15vw"], y: ["20vh", "60vh"], delay: 2, icon: "🗃️" },
        { name: "Power BI", x: ["-20vw", "5vw"], y: ["30vh", "10vh"], delay: 4, icon: "📊" },
        { name: "ML", x: ["25vw", "0vw"], y: ["50vh", "20vh"], delay: 6, icon: "🧠" },
        { name: "ETL", x: ["0vw", "-25vw"], y: ["15vh", "45vh"], delay: 8, icon: "⛓️" },
        { name: "Tableau", x: ["-5vw", "20vw"], y: ["40vh", "25vh"], delay: 10, icon: "📈" },
        { name: "AWS", x: ["10vw", "-10vw"], y: ["25vh", "55vh"], delay: 12, icon: "☁️" },
        { name: "Pandas", x: ["-15vw", "15vw"], y: ["60vh", "30vh"], delay: 14, icon: "🐼" },
        { name: "Airflow", x: ["20vw", "-20vw"], y: ["35vh", "65vh"], delay: 16, icon: "🌀" }
    ];

    const toggleExperience = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section
            ref={ref}
            className="relative w-full min-h-screen overflow-hidden py-24"
            id="experience"
        >

            <div className="absolute items-center inset-0 overflow-hidden pointer-events-none">
                {skills.map((skill, index) => (
                    <SkillTag
                        key={index}
                        skill={`${skill.icon || ''} ${skill.name}`}
                        delay={skill.delay}
                        x={skill.x}
                        y={skill.y}
                    />
                ))}

                {particles.current.map((particle, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-blue-400/20 dark:bg-blue-200/10"
                        initial={{
                            x: particle.x,
                            y: particle.y,
                            width: particle.size,
                            height: particle.size,
                            opacity: particle.opacity
                        }}
                        animate={{
                            y: [0, Math.random() * 100 - 50],
                            x: [0, Math.random() * 100 - 50],
                            transition: {
                                duration: Math.random() * 20 + 10,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "linear"
                            }
                        }}
                    />
                ))}
            </div>
            {/* Animated background gradient */}
            <motion.div
                className="absolute top-0 left-0 right-0 bottom-0 z-[-2]"
                animate={{
                    background: [
                        'linear-gradient(45deg, #f3f4f6 0%, #e5e7eb 50%, #d1d5db 100%)',
                        'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 50%, #d1d5db 100%)',
                        'linear-gradient(225deg, #f3f4f6 0%, #e5e7eb 50%, #d1d5db 100%)',
                        'linear-gradient(315deg, #f3f4f6 0%, #e5e7eb 50%, #d1d5db 100%)',
                        'linear-gradient(45deg, #f3f4f6 0%, #e5e7eb 50%, #d1d5db 100%)'
                    ]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            <motion.div
                className="absolute top-0 left-0 right-0 bottom-0 z-[-2] dark:block hidden"
                animate={{
                    background: [
                        'linear-gradient(45deg, #1e3a8a 0%, #6b21a8 50%, #0c4a6e 100%)',
                        'linear-gradient(135deg, #1e3a8a 0%, #6b21a8 50%, #0c4a6e 100%)',
                        'linear-gradient(225deg, #1e3a8a 0%, #6b21a8 50%, #0c4a6e 100%)',
                        'linear-gradient(315deg, #1e3a8a 0%, #6b21a8 50%, #0c4a6e 100%)',
                        'linear-gradient(45deg, #1e3a8a 0%, #6b21a8 50%, #0c4a6e 100%)'
                    ]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />


            {/* Floating skill tags */}


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
                        className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        My career path with diverse experiences that shaped my skills
                    </motion.p>
                </motion.div>

                <div className="relative">
                    {/* Main vertical timeline line with animation */}
                    <motion.div
                        className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-x-1/2 hidden md:block"
                        initial={{ height: 0 }}
                        animate={{ height: '100%' }}
                        transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />

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
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}