"use client";

import React, { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiSearch, FiLayout, FiDatabase, FiCpu, FiCode } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export type Project = {
    title: string;
    category: string;
    description: string;
    tags: string[];
    link?: string;
    github?: string;
    featured?: boolean;
    isDataScience?: boolean;
    isSoftwareEngineering?: boolean;
};

const projects: Project[] = [
    {
        title: 'YouTube Stats Service',
        category: 'Full Stack AI',
        description: 'An advanced analytics platform with sentiment analysis and predictive performance metrics for YouTube content creators. Features real-time data processing and interactive AI insights.',
        tags: ['Next.js', 'TypeScript', 'Redux', 'YouTube API', 'Tailwind CSS', 'AI'],
        github: 'https://github.com/ayush-p2000/youtube-stats-service',
        featured: true,
        isDataScience: true,
        isSoftwareEngineering: true,
    },
    {
        title: 'Semantic Tableaux Logic Solver',
        category: 'AI / Logic',
        description: "High-performance logic solver developed for Master's dissertation at University of Sheffield. Applies basic and advanced Semantic Tableaux in Propositional and Modal Logics with real-time visualization.",
        tags: ['Python', 'Streamlit', 'Logic', 'NetworkX', 'Matplotlib', 'AI'],
        github: 'https://github.com/ayush-p2000/semantic-tableaux',
        featured: true,
        isDataScience: true,
    },
    {
        title: 'Real-time Video Chat App',
        category: 'Communication',
        description: 'Interactive low-latency video communication platform featuring peer-to-peer streaming, messaging, and responsive UI.',
        tags: ['Node.js', 'Socket.io', 'WebRTC', 'Express', 'JavaScript', 'EJS'],
        github: 'https://github.com/ayush-p2000/realtime-video-chat-app',
        isSoftwareEngineering: true,
    },
    {
        title: 'ePanda Recycling System',
        category: 'Full Stack SaaS',
        description: 'SaaS platform for eWaste recycling with user/admin panels, payment integration (Stripe/PayPal), and comprehensive reporting toolkit.',
        tags: ['NodeJS', 'MongoDB', 'Express', 'OAuth', 'Stripe API', 'Testing'],
        github: 'https://github.com/ayush-p2000/COM6103-Team-Project',
        isSoftwareEngineering: true,
    },
    {
        title: 'Sentiment Analysis Engine',
        category: 'NLP',
        description: 'Highly accurate sentiment classifier trained on 1.6 million tweets using Logistic Regression, SVM, and Naive Bayes architectures.',
        tags: ['Python', 'NLP', 'Scikit-learn', 'VADER', 'NLTK', 'Visualization'],
        github: 'https://github.com/ayush-p2000/Sentiment-Analysis',
        isDataScience: true,
    },
    {
        title: 'Face Mask Detection',
        category: 'Computer Vision',
        description: 'Real-time object detection system using CNNs and OpenCV to identify mask-wearing compliance in live video feeds.',
        tags: ['Python', 'OpenCV', 'Keras', 'TensorFlow', 'Deep Learning'],
        github: 'https://github.com/ayush-p2000/Facemask-Detection-System',
        isDataScience: true,
    },
    {
        title: 'MNIST Digit Prediction',
        category: 'Deep Learning',
        description: 'CNN-based classifier for the MNIST dataset, demonstrating high-precision handwritten digit recognition.',
        tags: ['Python', 'CNN', 'TensorFlow', 'Jupyter Notebook', 'Deep Learning'],
        github: 'https://github.com/ayush-p2000/MNIST-prediction',
        isDataScience: true,
    },
    {
        title: 'Employee Management system',
        category: 'Enterprise App',
        description: 'Robust CRUD application with role-based access control, Google OAuth integration, and real-time analytics dashboard.',
        tags: ['Python', 'Streamlit', 'MySQL', 'Google OAuth', 'Analytics'],
        github: 'https://github.com/ayush-p2000/Employee-Management-System',
        isSoftwareEngineering: true,
    },
    {
        title: 'NLP Text Generator',
        category: 'NLP',
        description: 'Language modeling application using Java data structures to generate coherent text based on bigram and trigram analysis.',
        tags: ['Java', 'NLP', 'Data Structures', 'Probability', 'Swing GUI'],
        github: 'https://github.com/ayush-p2000/Generate-Text-using-Bigrams-or-Trigrams',
        isDataScience: true,
        isSoftwareEngineering: true,
    },
    {
        title: 'Eye Blink Detection',
        category: 'Computer Vision',
        description: 'Fatigue detection system using facial landmarks and Dlib to monitor blink patterns in real-time.',
        tags: ['Python', 'OpenCV', 'Dlib', 'Computer Vision', 'Fatigue Detection'],
        github: 'https://github.com/ayush-p2000/Eye-Blink-Detection',
        isDataScience: true,
    },
    {
        title: 'Library Management System',
        category: 'Backend Architecture',
        description: 'Scalable backend system for library operations, featuring book tracking, user management, and fine calculation logic.',
        tags: ['Python', 'MySQL', 'System Design', 'Backend Development'],
        github: 'https://github.com/ayush-p2000/Library-Management-System',
        isSoftwareEngineering: true,
    },
    {
        title: 'Data Analysis Web Tool',
        category: 'Data Engineering',
        description: 'One-click tool for automated dataset analysis, providing instant summarization and high-quality visualizations.',
        tags: ['TypeScript', 'Streamlit', 'Pandas', 'Plotly', 'Data Viz'],
        github: 'https://github.com/ayush-p2000/data-analysis-web',
        isDataScience: true,
    },
    {
        title: 'Plant Recognition System',
        category: 'Intelligent Web',
        description: 'A collaborative plant recognition platform featuring real-time messaging, SPARQL-based plant data retrieval, and interactive mapping.',
        tags: ['NodeJS', 'Express', 'MongoDB', 'Socket.io', 'SPARQL', 'EJS'],
        github: 'https://github.com/Intelligent-Web-PROJECT/Team-Project',
        isSoftwareEngineering: true,
    },
];

const FilterButton = ({ label, active, onClick, icon: Icon }: { label: string; active: boolean; onClick: () => void; icon: React.ElementType }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${active
            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
            : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
            }`}
    >
        <Icon size={16} className={active ? "text-white" : "text-blue-500"} />
        {label}
    </button>
);

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    const isFeatured = project.featured;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={`group relative h-full flex flex-col rounded-3xl overflow-hidden transition-all duration-500 ${isFeatured
                ? "md:col-span-2 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent border-2 border-blue-500/20"
                : "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl"
                }`}
        >
            {/* Background Decoration for Featured */}
            {isFeatured && (
                <div className="absolute top-0 right-0 p-8 text-blue-500/10 pointer-events-none group-hover:text-blue-500/20 transition-colors">
                    <FiLayout size={120} />
                </div>
            )}

            <div className="p-8 flex flex-col h-full z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${isFeatured
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                        }`}>
                        {project.category}
                    </div>
                    <div className="flex gap-3">
                        {project.github && (
                            <motion.a
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.9 }}
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200 dark:border-gray-700 transition-all"
                            >
                                <FiGithub size={20} />
                            </motion.a>
                        )}
                        {project.link && (
                            <motion.a
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.9 }}
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all"
                            >
                                <FiExternalLink size={20} />
                            </motion.a>
                        )}
                    </div>
                </div>

                <div className="flex-grow">
                    <h3 className={`font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${isFeatured ? "text-3xl lg:text-4xl" : "text-2xl"
                        }`}>
                        {project.title}
                        {isFeatured && <span className="text-blue-500 ml-2">✦</span>}
                    </h3>

                    <p className={`text-gray-600 dark:text-gray-400 leading-relaxed mb-8 ${isFeatured ? "text-lg lg:text-xl max-w-3xl" : "text-sm"}`}>
                        {project.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, i) => (
                        <span
                            key={i}
                            className={`text-[10px] md:text-xs font-medium px-3 py-1 rounded-lg border transition-colors ${isFeatured
                                ? "bg-white/50 dark:bg-white/5 border-blue-500/20 text-blue-700 dark:text-blue-300"
                                : "bg-gray-50 dark:bg-black/20 border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-500"
                                }`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Hover Indicator */}
            <motion.div
                initial={false}
                animate={{ width: "100%" }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
            />
        </motion.div>
    );
};

interface UnifiedProjectsProps {
    initialFilter?: "All" | "Data Science" | "Software Engineering";
    showFilters?: boolean;
}

export default function UnifiedProjects({ initialFilter = "All", showFilters = true }: UnifiedProjectsProps) {
    const [activeFilter, setActiveFilter] = useState(initialFilter);
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredProjects = useMemo(() => {
        if (activeFilter === "All") return projects;
        if (activeFilter === "Data Science") return projects.filter(p => p.isDataScience);
        if (activeFilter === "Software Engineering") return projects.filter(p => p.isSoftwareEngineering);
        return projects;
    }, [activeFilter]);

    return (
        <section id="projects" className="min-h-screen flex flex-col justify-center pt-32 pb-24 bg-white dark:bg-black relative overflow-hidden scroll-mt-0">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-gray-900 dark:text-white">
                            PROJECTS<span className="text-blue-600">.</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            A showcase of my recent work across complex frontend systems, AI implementations, and robust backends.
                        </p>
                    </motion.div>

                    {showFilters && (
                        <div className="flex flex-wrap gap-3">
                            <FilterButton
                                label="Everything"
                                active={activeFilter === "All"}
                                onClick={() => setActiveFilter("All")}
                                icon={FiLayout}
                            />
                            <FilterButton
                                label="Data Science"
                                active={activeFilter === "Data Science"}
                                onClick={() => setActiveFilter("Data Science")}
                                icon={FiDatabase}
                            />
                            <FilterButton
                                label="Software Engineering"
                                active={activeFilter === "Software Engineering"}
                                onClick={() => setActiveFilter("Software Engineering")}
                                icon={FiCode}
                            />
                        </div>
                    )}
                </div>

                <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={project.title}
                                project={project}
                                index={index}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mt-32 relative group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative overflow-hidden rounded-[3rem] border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl p-12 text-center">
                        <div className="max-w-xl mx-auto">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white mt-10">
                                Curious to see more?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-8">
                                My full open-source portfolio is available on GitHub, featuring couple of projects I've worked on.
                            </p>

                            <Button
                                size="lg"
                                className="h-14 px-8 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-blue-600 dark:hover:bg-blue-400 font-bold transition-all duration-300 shadow-xl shadow-blue-500/10"
                                onClick={() => window.open("https://github.com/ayush-p2000", "_blank")}
                            >
                                <FiGithub size={20} className="mr-3" />
                                Explore Full Archive
                                <FiExternalLink size={16} className="ml-3 opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Button>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/5 rounded-full blur-xl" />
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-500/5 rounded-full blur-xl" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
