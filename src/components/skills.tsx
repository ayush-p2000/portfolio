"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    FaReact,
    FaNodeJs,
    FaPython,
    FaJava,
    FaDatabase,
    FaDocker,
    FaGitAlt,
    FaAws,
    FaPhp,
    FaHtml5,
    FaCss3Alt,
    FaChartBar,
    FaRobot,
    FaCode,
} from "react-icons/fa";
import {
    TbBrandCSharp,
} from "react-icons/tb";
import {
    SiTypescript,
    SiJavascript,
    SiNextdotjs,
    SiTailwindcss,
    SiMongodb,
    SiPostgresql,
    SiMysql,
    SiTensorflow,
    SiPytorch,
    SiScikitlearn,
    SiPandas,
    SiNumpy,
    SiOpencv,
    SiStreamlit,
    SiFigma,
    SiJira,
    SiTableau,
    SiJenkins,
    SiSonarqube,
    SiLinux,
    SiNvidia,
    SiGooglecloud,
    SiSocketdotio,
    SiDotnet,
} from "react-icons/si";

interface Iskill {
    name: string;
    icon: React.ReactNode;
    color: string;
}

interface SkillCategory {
    title: string;
    skills: Iskill[];
}

const skillCategories: SkillCategory[] = [
    {
        title: "Frontend Development",
        skills: [
            { name: "React", icon: <FaReact />, color: "#61DAFB" },
            { name: "Next.js", icon: <SiNextdotjs />, color: "#000000" },
            { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
            { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
            { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4" },
            { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26" },
            { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6" },
            { name: "Figma", icon: <SiFigma />, color: "#F24E1E" },
        ],
    },
    {
        title: "Backend & Systems",
        skills: [
            { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
            { name: "Python", icon: <FaPython />, color: "#3776AB" },
            { name: "Java", icon: <FaJava />, color: "#007396" },
            { name: "PHP", icon: <FaPhp />, color: "#777BB4" },
            { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
            { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
            { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
            { name: "Docker", icon: <FaDocker />, color: "#2496ED" },
            { name: "AWS", icon: <FaAws />, color: "#FF9900" },
            { name: "GCP", icon: <SiGooglecloud />, color: "#4285F4" },
            { name: "Socket.io", icon: <SiSocketdotio />, color: "#010101" },
            { name: "C#", icon: <TbBrandCSharp />, color: "#239120" },
            { name: ".NET", icon: <SiDotnet />, color: "#512BD4" },
        ],
    },
    {
        title: "AI & Data Science",
        skills: [
            { name: "TensorFlow", icon: <SiTensorflow />, color: "#FF6F00" },
            { name: "PyTorch", icon: <SiPytorch />, color: "#EE4C2C" },
            { name: "Scikit-Learn", icon: <SiScikitlearn />, color: "#F7931E" },
            { name: "Pandas", icon: <SiPandas />, color: "#150458" },
            { name: "NumPy", icon: <SiNumpy />, color: "#013243" },
            { name: "OpenCV", icon: <SiOpencv />, color: "#5C3EE8" },
            { name: "Streamlit", icon: <SiStreamlit />, color: "#FF4B4B" },
            { name: "Tableau", icon: <SiTableau />, color: "#E97627" },
            { name: "PowerBI", icon: <FaChartBar />, color: "#F2C811" },
            { name: "CUDA", icon: <SiNvidia />, color: "#76B900" },
        ],
    },
    {
        title: "Tools & Others",
        skills: [
            { name: "Git", icon: <FaGitAlt />, color: "#F05032" },
            { name: "Jira", icon: <SiJira />, color: "#0052CC" },
            { name: "Jenkins", icon: <SiJenkins />, color: "#D24939" },
            { name: "SonarQube", icon: <SiSonarqube />, color: "#4E9BCD" },
            { name: "Linux", icon: <SiLinux />, color: "#FCC624" },
            { name: "Antigravity", icon: <FaRobot />, color: "#8B5CF6" },
            { name: "Cursor", icon: <FaCode />, color: "#000000" },
            { name: "SQL", icon: <FaDatabase />, color: "#CC2927" },
        ],
    },
];

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section id="skills" className="min-h-screen flex flex-col justify-center pt-32 pb-24 bg-gray-50 dark:bg-black relative overflow-hidden scroll-mt-0">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-neutral-900 dark:text-white">
                        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Arsenal</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        A comprehensive toolkit enabling me to bridge the gap between software engineering and data science.
                    </p>
                </motion.div>

                <div ref={ref}>
                    {skillCategories.map((category, catIndex) => (
                        <div key={catIndex} className="mb-12 last:mb-0">
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: catIndex * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 border-l-4 border-blue-500 pl-4"
                            >
                                {category.title}
                            </motion.h3>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                            >
                                {category.skills.map((skill, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-3 hover:shadow-xl transition-all duration-300 group"
                                    >
                                        <div
                                            className="text-4xl transition-colors duration-300 group-hover:drop-shadow-lg"
                                            style={{ color: skill.color }}
                                        >
                                            {skill.icon}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                            {skill.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
